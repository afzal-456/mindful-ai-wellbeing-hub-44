
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Meh, Frown, Calendar } from "lucide-react";

const data = [
  { date: 'Mon', mood: 7 },
  { date: 'Tue', mood: 5 },
  { date: 'Wed', mood: 8 },
  { date: 'Thu', mood: 6 },
  { date: 'Fri', mood: 9 },
  { date: 'Sat', mood: 7 },
  { date: 'Sun', mood: 8 },
];

const MoodTracking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Mood Tracking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Your Mood History</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Log Today's Mood</h3>
                <div className="flex justify-around mb-6">
                  <Button variant="ghost" className="flex flex-col items-center">
                    <Smile className="h-8 w-8 text-green-500" />
                    <span>Good</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center">
                    <Meh className="h-8 w-8 text-yellow-500" />
                    <span>Okay</span>
                  </Button>
                  <Button variant="ghost" className="flex flex-col items-center">
                    <Frown className="h-8 w-8 text-red-500" />
                    <span>Bad</span>
                  </Button>
                </div>
                <Button className="w-full bg-wellness-primary hover:bg-wellness-dark">
                  <Calendar className="mr-2 h-4 w-4" /> Log Mood
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

export default MoodTracking;
