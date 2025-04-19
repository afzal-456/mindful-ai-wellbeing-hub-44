
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const team = [
    { name: "Moieen Rasheed Mir", role: "Frontend Developer ", avatar: "MRM" },
    { name: "Mohammed Saqlain", role: "Ml Developer", avatar: "SQ" },
    { name: "Mohammed Afzal", role: "Backend Developer", avatar: "MA" },
    { name: "Milan Saini", role: "Ai Chatbot", avatar: "MS" },
    { name: "Mayank Nager", role: "Web Designer", avatar: "MN" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-wellness">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
              About MindfulAI
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Our mission is to make mental healthcare accessible, affordable, and stigma-free for everyone
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-wellness-dark">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  MindfulAI was born from a simple yet powerful realization: mental healthcare should be available to everyone, regardless of their location, financial situation, or busy schedule.
                </p>
                <p className="text-gray-700 mb-4">
                  Founded in 2023 by a team of mental health professionals, AI experts, and individuals who personally experienced the gaps in traditional mental healthcare, we set out to create a solution that combines the latest in artificial intelligence with evidence-based therapeutic approaches.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to offer a comprehensive platform that has helped thousands of people across India and beyond to better understand, manage, and improve their mental wellbeing through technology-enabled care.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-6 text-wellness-dark">Our Values</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-wellness-primary">Accessibility</h3>
                    <p className="text-gray-700">
                      We believe everyone deserves quality mental health support, regardless of location or socioeconomic status.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-wellness-primary">Evidence-Based Approach</h3>
                    <p className="text-gray-700">
                      Our AI and tools are built on scientific research and therapeutic best practices.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-wellness-primary">Privacy & Trust</h3>
                    <p className="text-gray-700">
                      Your personal information and conversations are protected with the highest security standards.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-wellness-primary">Continuous Improvement</h3>
                    <p className="text-gray-700">
                      We constantly refine our AI and services based on user feedback and new research.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-wellness-dark">Meet Our Team</h2>
            <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
              A diverse group of experts passionate about mental health innovation
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <Avatar className="w-24 h-24 mb-4 mx-auto bg-wellness-primary text-white">
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-wellness-dark">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
