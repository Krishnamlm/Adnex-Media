export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // =====================================================
    // CONTACT API
    // =====================================================

    if (url.pathname === "/api/contact") {
      // --------------------------------
      // OPTIONS
      // --------------------------------

      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(),
        });
      }

      // --------------------------------
      // ONLY POST ALLOWED
      // --------------------------------

      if (request.method !== "POST") {
        return json(
          {
            success: false,
            message: "Method not allowed.",
          },
          405
        );
      }

      try {
        console.log("========== CONTACT FORM START ==========");

        // =====================================================
        // 1. CHECK ENVIRONMENT VARIABLES
        // =====================================================

        if (!env.TURNSTILE_SECRET_KEY) {
          console.error(
            "TURNSTILE_SECRET_KEY is missing."
          );

          return json(
            {
              success: false,
              message: "Server configuration error.",
            },
            500
          );
        }

        if (!env.BREVO_API_KEY) {
          console.error(
            "BREVO_API_KEY is missing."
          );

          return json(
            {
              success: false,
              message: "Server configuration error.",
            },
            500
          );
        }

        if (!env.BREVO_SENDER_EMAIL) {
          console.error(
            "BREVO_SENDER_EMAIL is missing."
          );

          return json(
            {
              success: false,
              message: "Server configuration error.",
            },
            500
          );
        }

        if (!env.CONTACT_RECEIVER_EMAIL) {
          console.error(
            "CONTACT_RECEIVER_EMAIL is missing."
          );

          return json(
            {
              success: false,
              message: "Server configuration error.",
            },
            500
          );
        }

        // =====================================================
        // 2. READ REQUEST BODY
        // =====================================================

        let body;

        try {
          body = await request.json();
        } catch {
          return json(
            {
              success: false,
              message: "Invalid request.",
            },
            400
          );
        }

        const {
          name = "",
          firstName = "",
          lastName = "",
          email = "",
          phone = "",
          company = "",
          country = "",
          service = "",
          budget = "",
          inquiryType = "",
          message = "",
          turnstileToken = "",
        } = body;

        // =====================================================
        // 3. BASIC VALIDATION
        // =====================================================

        if (!firstName.trim()) {
          return json(
            {
              success: false,
              message: "First name is required.",
            },
            400
          );
        }

        if (!email.trim()) {
          return json(
            {
              success: false,
              message: "Email is required.",
            },
            400
          );
        }

        if (!phone.trim()) {
          return json(
            {
              success: false,
              message: "Phone number is required.",
            },
            400
          );
        }

        if (!company.trim()) {
          return json(
            {
              success: false,
              message:
                "Company / Brand is required.",
            },
            400
          );
        }

        if (!message.trim()) {
          return json(
            {
              success: false,
              message: "Message is required.",
            },
            400
          );
        }

        // =====================================================
        // 4. CHECK TURNSTILE TOKEN
        // =====================================================

        if (
          typeof turnstileToken !== "string" ||
          !turnstileToken.trim()
        ) {
          console.log(
            "TURNSTILE TOKEN MISSING"
          );

          return json(
            {
              success: false,
              message:
                "Please complete the security verification.",
            },
            403
          );
        }

        if (turnstileToken.length > 2048) {
          console.log(
            "TURNSTILE TOKEN TOO LONG"
          );

          return json(
            {
              success: false,
              message:
                "Security verification failed.",
            },
            403
          );
        }

        // =====================================================
        // 5. VERIFY TURNSTILE
        // =====================================================

        console.log(
          "Verifying Turnstile..."
        );

        const turnstileData = new FormData();

        turnstileData.append(
          "secret",
          env.TURNSTILE_SECRET_KEY
        );

        turnstileData.append(
          "response",
          turnstileToken
        );

        const clientIP =
          request.headers.get(
            "CF-Connecting-IP"
          );

        if (clientIP) {
          turnstileData.append(
            "remoteip",
            clientIP
          );
        }

        const controller =
          new AbortController();

        const timeout = setTimeout(() => {
          controller.abort();
        }, 10000);

        let turnstileResponse;

        try {
          turnstileResponse =
            await fetch(
              "https://challenges.cloudflare.com/turnstile/v0/siteverify",
              {
                method: "POST",
                body: turnstileData,
                signal: controller.signal,
              }
            );
        } finally {
          clearTimeout(timeout);
        }

        if (!turnstileResponse.ok) {
          console.error(
            "Turnstile API error:",
            turnstileResponse.status
          );

          return json(
            {
              success: false,
              message:
                "Security verification is temporarily unavailable.",
            },
            503
          );
        }

        const turnstileResult =
          await turnstileResponse.json();

        console.log(
          "TURNSTILE SUCCESS:",
          turnstileResult.success
        );

        // =====================================================
        // 6. BLOCK FAILED TURNSTILE
        // =====================================================

        if (!turnstileResult.success) {
          console.log(
            "TURNSTILE VERIFICATION FAILED"
          );

          return json(
            {
              success: false,
              message:
                "Security verification failed. Please try again.",
            },
            403
          );
        }

        console.log(
          "Turnstile verification SUCCESS."
        );

        // =====================================================
        // 7. CREATE EMAIL
        // =====================================================

        const fullName =
          name ||
          `${firstName} ${lastName}`.trim();

        const safe = (value) =>
          String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        const brevoPayload = {
          sender: {
            name: "Adnex Media",
            email:
              env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email:
                env.CONTACT_RECEIVER_EMAIL,
              name: "Adnex Media",
            },
          ],

          replyTo: {
            email: email.trim(),
            name: fullName,
          },

          subject:
            `New Contact Form - ${
              inquiryType ||
              "General Inquiry"
            }`,

          htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">

              <h2>
                New Contact Form Submission
              </h2>

              <hr />

              <p>
                <strong>Name:</strong>
                ${safe(fullName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${safe(email)}
              </p>

              <p>
                <strong>Phone:</strong>
                ${safe(phone)}
              </p>

              <p>
                <strong>Company / Brand:</strong>
                ${safe(company)}
              </p>

              <p>
                <strong>Country:</strong>
                ${safe(country)}
              </p>

              <p>
                <strong>Service:</strong>
                ${safe(service)}
              </p>

              <p>
                <strong>Budget:</strong>
                ${safe(budget)}
              </p>

              <p>
                <strong>Inquiry Type:</strong>
                ${safe(inquiryType)}
              </p>

              <h3>Message</h3>

              <p>
                ${safe(message).replace(/\n/g, "<br />")}
              </p>

              <hr />

              <p style="font-size: 12px; color: #777;">
                This enquiry was submitted through
                the Adnex Media website.
              </p>

            </div>
          `,
        };

        // =====================================================
        // 8. SEND EMAIL THROUGH BREVO
        // =====================================================

        console.log(
          "Sending email through Brevo..."
        );

        const brevoResponse =
          await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
              method: "POST",

              headers: {
                accept:
                  "application/json",

                "api-key":
                  env.BREVO_API_KEY,

                "content-type":
                  "application/json",
              },

              body: JSON.stringify(
                brevoPayload
              ),
            }
          );

        let brevoResult;

        try {
          brevoResult =
            await brevoResponse.json();
        } catch {
          brevoResult = {};
        }

        console.log(
          "BREVO STATUS:",
          brevoResponse.status
        );

        // =====================================================
        // 9. CHECK BREVO
        // =====================================================

        if (!brevoResponse.ok) {
          console.error(
            "Brevo email failed:",
            JSON.stringify(
              brevoResult
            )
          );

          return json(
            {
              success: false,
              message:
                "Your message could not be sent right now. Please try again later.",
            },
            502
          );
        }

        console.log(
          "========== CONTACT FORM SUCCESS =========="
        );

        return json(
          {
            success: true,
            message:
              "Your message has been sent successfully.",
          },
          200
        );

      } catch (error) {
        console.error(
          "========== CONTACT API ERROR =========="
        );

        console.error(error);

        return json(
          {
            success: false,
            message:
              "Something went wrong. Please try again later.",
          },
          500
        );
      }
    }

    // =====================================================
    // SERVE FRONTEND
    // =====================================================

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response(
      "ASSETS binding is missing.",
      {
        status: 500,
      }
    );
  },
};


// =====================================================
// JSON HELPER
// =====================================================

function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        ...corsHeaders(),
        "Content-Type":
          "application/json",
      },
    }
  );
}


// =====================================================
// CORS
// =====================================================

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",

    "Access-Control-Allow-Methods":
      "POST, OPTIONS",

    "Access-Control-Allow-Headers":
      "Content-Type",
  };
}