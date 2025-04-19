
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Download } from "lucide-react";
import StressManagement from "@/components/resources/StressManagement";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SelfHelpResources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Self-Help Resources</h1>
          
          <Tabs defaultValue="stress" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-4 mb-8">
              <TabsTrigger value="stress" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Stress Management
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Mindfulness Videos
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Self-Assessment
              </TabsTrigger>
              <TabsTrigger value="worksheets" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Worksheets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stress">
              <StressManagement />
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Introduction to Mindfulness", duration: "5:30" },
                  { title: "Guided Meditation for Beginners", duration: "10:15" },
                  { title: "Breathing Exercises", duration: "7:45" },
                  { title: "Mindful Movement", duration: "15:20" }
                ].map((video, index) => (
                  <Card key={index} className="p-6">
                    <div className="aspect-video bg-gray-100 mb-4 rounded-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-wellness-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                    <p className="text-gray-600">Duration: {video.duration}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assessment">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Mental Wellness Assessment</h2>
                <p className="text-gray-700 mb-6">
                  Take our comprehensive self-assessment to better understand your mental well-being.
                  This assessment covers areas including stress, anxiety, mood, and sleep patterns.
                </p>
                <Button className="bg-wellness-primary hover:bg-wellness-dark">
                  Start Assessment
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="worksheets">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Daily Mood Tracker",
                  "Thought Record Sheet",
                  "Stress Management Plan",
                  "Goal Setting Worksheet",
                  "Sleep Diary",
                  "Gratitude Journal"
                ].map((worksheet, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{worksheet}</h3>
                    <p className="text-gray-600 mb-4">PDF format worksheet for personal use</p>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelfHelpResources;
