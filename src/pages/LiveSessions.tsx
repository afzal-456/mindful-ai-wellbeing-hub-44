
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LiveSessions = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [hasFreeSessionUsed, setHasFreeSessionUsed] = useState<boolean>(false);

  useEffect(() => {
    // Get user data from localStorage
    const userTypeValue = localStorage.getItem("userType");
    const freeSessionUsed = localStorage.getItem("freeSessionUsed") === "true";
    
    setUserType(userTypeValue);
    setHasFreeSessionUsed(freeSessionUsed);
  }, []);

  const handleBookSession = () => {
    // Check user type and free session usage
    if (userType === "premium" && !hasFreeSessionUsed) {
      // Premium user's first free session
      localStorage.setItem("freeSessionUsed", "true");
      setHasFreeSessionUsed(true);
      toast.success("Your free session has been booked!");
      // In a real app, this would also update the database
    } else {
      // Free user or Premium user who has used their free session
      // Redirect to payment page
      navigate("/pricing/premium?session=true");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-wellness-dark">
            Live Therapy Sessions
          </h1>
          
          <div className="mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="mb-2 font-medium">Session Pricing:</p>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">• Standard rate: $50 per hour (₹3,750 per hour)</li>
                <li className="mb-1">• Premium users: First session free, then standard rate applies</li>
                <li>• All payments are secure and confidential</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Anxiety & Depression",
                availability: "Mon, Wed, Fri",
                time: "9:00 AM - 5:00 PM",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Relationship Counseling",
                availability: "Tue, Thu",
                time: "10:00 AM - 6:00 PM",
              },
              {
                name: "Dr. Emily Parker",
                specialty: "Stress Management",
                availability: "Mon, Thu, Fri",
                time: "11:00 AM - 7:00 PM",
              },
            ].map((therapist, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-wellness-light rounded-full mx-auto flex items-center justify-center mb-4">
                    <Video className="h-8 w-8 text-wellness-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-wellness-dark">{therapist.name}</h2>
                  <p className="text-gray-600">{therapist.specialty}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{therapist.availability}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{therapist.time}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-wellness-primary hover:bg-wellness-dark text-white"
                  onClick={handleBookSession}
                >
                  {userType === "premium" && !hasFreeSessionUsed 
                    ? "Schedule Free Session" 
                    : "Schedule Session"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveSessions;
