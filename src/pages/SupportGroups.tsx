
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

const SupportGroups = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-wellness-dark">
              Support Groups
            </h1>
            <ThemeToggle />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Anxiety Support",
                members: "15 members",
                schedule: "Every Monday",
                time: "7:00 PM - 8:30 PM",
                link: "/support-groups/anxiety"
              },
              {
                name: "Depression Recovery",
                members: "12 members",
                schedule: "Every Wednesday",
                time: "6:00 PM - 7:30 PM",
                link: "/support-groups/depression"
              },
              {
                name: "Mindfulness Practice",
                members: "20 members",
                schedule: "Every Friday",
                time: "5:00 PM - 6:30 PM",
                link: "/support-groups/mindfulness"
              },
            ].map((group, index) => (
              <Link key={index} to={group.link} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 h-full transition-transform hover:scale-105 hover:shadow-lg cursor-pointer dark:bg-gray-800 dark:text-gray-200">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-wellness-light rounded-full mx-auto flex items-center justify-center mb-4 dark:bg-gray-700">
                      <Heart className="h-8 w-8 text-wellness-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-wellness-dark dark:text-wellness-light">{group.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{group.members}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{group.schedule}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{group.time}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white" asChild>
                    <span>Join Group</span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportGroups;
