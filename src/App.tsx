import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Faculty from "./pages/Faculty";
import Research from "./pages/Research";
import Events from "./pages/Events";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import BOSandBOE from "./pages/BOSandBOE";
import Activities from "./pages/Activities";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyProfile from "./pages/FacultyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/research" element={<Research />} />
              <Route path="/events" element={<Events />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:type" element={<ResourceDetail />} />
              <Route path="/bos-boe" element={<BOSandBOE />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin" element={<FacultyLogin />} />
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/:id" element={<FacultyProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
