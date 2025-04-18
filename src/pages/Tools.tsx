
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Music, Gamepad2, BookOpen, Activity } from "lucide-react";

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-wellness">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
              Self-Care Tools & Resources
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our collection of mental wellness tools designed to support your emotional health
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-wellness-light rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Music className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-wellness-dark">Relaxation Audio</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Curated music and guided meditations tuned to healing frequencies like 432 Hz for relaxation and 528 Hz for emotional balance.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
                  Explore Audio Library
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-wellness-light rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Gamepad2 className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-wellness-dark">Mental Games</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Interactive games and activities designed to reduce stress, improve focus, and build positive coping strategies.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
                  Play Games
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-wellness-light rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-wellness-dark">Self-Help Resources</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Articles, guides, and exercises from mental health experts to help you understand and manage your emotional well-being.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
                  Browse Resources
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-wellness-light rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Activity className="h-6 w-6 text-wellness-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-wellness-dark">Mood Tracking</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Track your emotional patterns over time with our easy-to-use mood journal and get insights to better understand your mental health.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
                  Start Tracking
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

export default Tools;
