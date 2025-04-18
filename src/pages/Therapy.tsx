
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Users } from "lucide-react";

const Therapy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-wellness">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
              Therapy & Support Options
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose the type of support that works best for your needs
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mx-auto bg-wellness-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-wellness-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4 text-wellness-dark">AI Therapist</h2>
                <p className="text-gray-600 mb-6">
                  Chat with our AI therapist anytime for immediate support, coping strategies, and emotional guidance.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white w-full">
                  Start Chatting
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mx-auto bg-wellness-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-wellness-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4 text-wellness-dark">Live Sessions</h2>
                <p className="text-gray-600 mb-6">
                  Book one-on-one video sessions with licensed therapists specialized in various mental health areas.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white w-full">
                  Book Session
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mx-auto bg-wellness-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-wellness-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4 text-wellness-dark">Support Groups</h2>
                <p className="text-gray-600 mb-6">
                  Join moderated community groups to connect with others facing similar challenges.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white w-full">
                  Browse Groups
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Therapy;
