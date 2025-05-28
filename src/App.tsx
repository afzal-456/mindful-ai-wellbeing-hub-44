import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import Therapy from "./pages/Therapy";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import RelaxationAudio from "./pages/RelaxationAudio";
import MentalGames from "./pages/MentalGames";
import SelfHelpResources from "./pages/SelfHelpResources";
import MoodTracking from "./pages/MoodTracking";
import FreeTrial from "./pages/FreeTrial";
import AiTherapist from "./pages/AiTherapist";
import LiveSessions from "./pages/LiveSessions";
import SupportGroups from "./pages/SupportGroups";
import FreePlan from "./pages/FreePlan";
import PremiumPlan from "./pages/PremiumPlan";
import InstitutionalPlan from "./pages/InstitutionalPlan";
import AnxietySupport from "./pages/support-groups/AnxietySupport";
import DepressionRecovery from "./pages/support-groups/DepressionRecovery";
import MindfulnessPractice from "./pages/support-groups/MindfulnessPractice";
import AnxietyCommunity from "./pages/support-groups/AnxietyCommunity";
import DepressionCommunity from "./pages/support-groups/DepressionCommunity";
import MindfulnessCommunity from "./pages/support-groups/MindfulnessCommunity";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentMethods from "./pages/PaymentMethods";
import CardPayment from "./pages/CardPayment";
import InternetBankingPayment from "./pages/InternetBankingPayment";
import GooglePayPayment from "./pages/GooglePayPayment";
import PhonePePayment from "./pages/PhonePePayment";
import OTPVerification from "./pages/OTPVerification";
import PaymentFailed from "./pages/PaymentFailed";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />


            {/* Payment Routes */}
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/payment/card" element={<CardPayment />} />
            <Route path="/payment/internet-banking" element={<InternetBankingPayment />} />
            <Route path="/payment/google-pay" element={<GooglePayPayment />} />
            <Route path="/payment/phonepe" element={<PhonePePayment />} />
            <Route path="/payment/otp" element={<OTPVerification />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />

            {/* Protected Routes */}
            <Route path="/user-dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            {/* Admin-only route */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}> {/* Add adminOnly prop here */}
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/therapy" element={
              <ProtectedRoute>
                <Therapy />
              </ProtectedRoute>
            } />
            <Route path="/tools" element={
              <ProtectedRoute>
                <Tools />
              </ProtectedRoute>
            } />
            <Route path="/relaxation-audio" element={
              <ProtectedRoute>
                <RelaxationAudio />
              </ProtectedRoute>
            } />
            <Route path="/mental-games" element={
              <ProtectedRoute>
                <MentalGames />
              </ProtectedRoute>
            } />
            <Route path="/self-help-resources" element={
              <ProtectedRoute>
                <SelfHelpResources />
              </ProtectedRoute>
            } />
            <Route path="/mood-tracking" element={
              <ProtectedRoute>
                <MoodTracking />
              </ProtectedRoute>
            } />
            <Route path="/free-trial" element={
              <ProtectedRoute>
                <FreeTrial />
              </ProtectedRoute>
            } />
            <Route path="/ai-therapist" element={
              <ProtectedRoute>
                <AiTherapist />
              </ProtectedRoute>
            } />
            <Route path="/live-sessions" element={
              <ProtectedRoute>
                <LiveSessions />
              </ProtectedRoute>
            } />
            <Route path="/support-groups" element={
              <ProtectedRoute>
                <SupportGroups />
              </ProtectedRoute>
            } />
            <Route path="/pricing/free" element={
              <ProtectedRoute>
                <FreePlan />
              </ProtectedRoute>
            } />
            <Route path="/pricing/premium" element={
              <ProtectedRoute>
                <PremiumPlan />
              </ProtectedRoute>
            } />
            <Route path="/pricing/institutional" element={
              <ProtectedRoute>
                <InstitutionalPlan />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/anxiety" element={
              <ProtectedRoute>
                <AnxietySupport />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/depression" element={
              <ProtectedRoute>
                <DepressionRecovery />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/mindfulness" element={
              <ProtectedRoute>
                <MindfulnessPractice />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/anxiety/community" element={
              <ProtectedRoute>
                <AnxietyCommunity />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/depression/community" element={
              <ProtectedRoute>
                <DepressionCommunity />
              </ProtectedRoute>
            } />
            <Route path="/support-groups/mindfulness/community" element={
              <ProtectedRoute>
                <MindfulnessCommunity />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;