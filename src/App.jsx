import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogEditor from "./pages/Admin/BlogEditor";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import OfferLettersAdmin from "./pages/Admin/OfferLettersAdmin";
import EmailManagement from "./pages/Admin/EmailManagement";

import ServicesAdmin from "./pages/Admin/ServicesAdmin";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import CareersAdmin from "./pages/Admin/CareersAdmin";
import BlogsAdmin from "./pages/Admin/BlogsAdmin";
import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Performance from "./pages/Performance";
import Seo from "./pages/Seo";
import PaidAds from "./pages/PaidAds";
import WebDevelopment from "./pages/WebDevelopment";
import MobileApps from "./pages/MobileApps";
import SocialMedia from "./pages/SocialMedia";
import Contact from "./pages/Contact";
import Career from "./pages/Careers";
import JobApply from "./pages/JobApply.jsx";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Blogs from "./pages/Blogs.jsx";
import BlogArticle from "./pages/BlogArticle";

function App() {
  return (
    <BrowserRouter>
      
      

      <Routes>
        <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/seo" element={<Seo />} />
      <Route path="/paid-ads" element={<PaidAds />} />
      <Route path="/web-development" element={<WebDevelopment />} />
      <Route path="/mobile-apps" element={<MobileApps />} />
      <Route path="/social-media" element={<SocialMedia />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogArticle />} />
      
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/job-apply" element={<JobApply />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Route>

         {/* Admin */}
        {/* Admin */}
<Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="blogs" element={<BlogsAdmin />} />
  <Route path="blogs/new" element={<BlogEditor />} />
  <Route path="blogs/edit/:id" element={<BlogEditor />} />

  {/* Services */}
  <Route path="services" element={<ServicesAdmin />} />

  {/* Careers */}
<Route path="careers" element={<CareersAdmin />} />
{/* Internship Offer Letter Generator */}
  <Route path="offer-letters" element={<OfferLettersAdmin />} />


<Route
  path="email-management"
  element={<EmailManagement />}
/>


</Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;