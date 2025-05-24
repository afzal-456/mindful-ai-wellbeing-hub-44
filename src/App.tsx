
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Therapy from "./pages/Therapy";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AiTherapist from "./pages/AiTherapist";
import MoodTracking from "./pages/MoodTracking";
import RelaxationAudio from "./pages/RelaxationAudio";
import SupportGroups from "./pages/SupportGroups";
import LiveSessions from "./pages/LiveSessions";
import MentalGames from "./pages/MentalGames";
import SelfHelpResources from "./pages/SelfHelpResources";
import FreePlan from "./pages/FreePlan";
import PremiumPlan from "./pages/PremiumPlan";
import InstitutionalPlan from "./pages/InstitutionalPlan";
import FreeTrial from "./pages/FreeTrial";
import PaymentMethods from "./pages/PaymentMethods";
import CardPayment from "./pages/CardPayment";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Support Groups Pages
import AnxietySupport from "./pages/support-groups/AnxietySupport";
import DepressionRecovery from "./pages/support-groups/DepressionRecovery";
import MindfulnessPractice from "./pages/support-groups/MindfulnessPractice";
import AnxietyCommunity from "./pages/support-groups/AnxietyCommunity";
import DepressionCommunity from "./pages/support-groups/DepressionCommunity";
import MindfulnessCommunity from "./pages/support-groups/MindfulnessCommunity";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/therapy" element={<Therapy />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Tool Pages */}
              <Route path="/ai-therapist" element={<AiTherapist />} />
              <Route path="/mood-tracking" element={<MoodTracking />} />
              <Route path="/relaxation-audio" element={<RelaxationAudio />} />
              <Route path="/support-groups" element={<SupportGroups />} />
              <Route path="/live-sessions" element={<LiveSessions />} />
              <Route path="/mental-games" element={<MentalGames />} />
              <Route path="/self-help" element={<SelfHelpResources />} />
              
              {/* Support Groups */}
              <Route path="/support-groups/anxiety" element={<AnxietySupport />} />
              <Route path="/support-groups/depression" element={<DepressionRecovery />} />
              <Route path="/support-groups/mindfulness" element={<MindfulnessPractice />} />
              <Route path="/support-groups/anxiety-community" element={<AnxietyCommunity />} />
              <Route path="/support-groups/depression-community" element={<DepressionCommunity />} />
              <Route path="/support-groups/mindfulness-community" element={<MindfulnessCommunity />} />
              
              {/* Pricing Plans */}
              <Route path="/pricing/free" element={<FreePlan />} />
              <Route path="/pricing/premium" element={<PremiumPlan />} />
              <Route path="/pricing/institutional" element={<InstitutionalPlan />} />
              <Route path="/free-trial" element={<FreeTrial />} />
              
              {/* Payment Routes */}
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/payment/card" element={<CardPayment />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
