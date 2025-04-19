
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";

const AiTherapist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-wellness-primary text-white flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">AI Therapist Chat</h2>
            </div>
            
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p>Hello! I'm your AI therapist. How are you feeling today?</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-wellness-primary text-white rounded-lg p-3 max-w-[80%]">
                  <p>I'm feeling a bit anxious about work...</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p>I understand. Let's talk about what's causing your anxiety. Can you tell me more about your work situation?</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-grow" />
                <Button className="bg-wellness-primary hover:bg-wellness-dark">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiTherapist;
