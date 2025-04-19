import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
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

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" enableSystem>
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
              <Route path="/therapy" element={<Therapy />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/relaxation-audio" element={<RelaxationAudio />} />
              <Route path="/mental-games" element={<MentalGames />} />
              <Route path="/self-help-resources" element={<SelfHelpResources />} />
              <Route path="/mood-tracking" element={<MoodTracking />} />
              <Route path="/free-trial" element={<FreeTrial />} />
              <Route path="/ai-therapist" element={<AiTherapist />} />
              <Route path="/live-sessions" element={<LiveSessions />} />
              <Route path="/support-groups" element={<SupportGroups />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

export default App;
