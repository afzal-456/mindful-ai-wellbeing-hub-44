
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

const LiveSessions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-wellness-dark">
            Live Therapy Sessions
          </h1>
          
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
                
                <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white">
                  Schedule Session
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
