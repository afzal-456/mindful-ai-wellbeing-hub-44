
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const MindfulnessPractice = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/support-groups")}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Support Groups
            </Button>
            <ThemeToggle />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">Mindfulness Practice Group</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Learn and practice mindfulness techniques in a guided group setting.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 dark:bg-gray-800 dark:text-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Next Session Details</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Every Friday, 5:00 PM - 6:30 PM</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-5 w-5 mr-2" />
                    <span>20 members (10 spots available)</span>
                  </div>
                </div>
                <Button 
                  className="w-full md:w-auto bg-wellness-primary hover:bg-wellness-dark text-white"
                  asChild
                >
                  <Link to="/support-groups/mindfulness/community">Join Group Session</Link>
                </Button>
              </div>

              <div className="w-full md:w-1/3 bg-wellness-light p-6 rounded-lg dark:bg-gray-700">
                <h3 className="font-semibold mb-3">What to Expect</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Guided meditation</li>
                  <li>• Breathing exercises</li>
                  <li>• Present moment awareness</li>
                  <li>• Stress reduction techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MindfulnessPractice;
