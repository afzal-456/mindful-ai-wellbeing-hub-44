
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Download } from "lucide-react";

const SelfHelpResources = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-wellness-dark">Self-Help Resources</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <BookOpen className="h-8 w-8 text-wellness-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Stress Management Guide</h3>
                  <p className="text-gray-600 mb-4">Learn effective techniques to manage daily stress and anxiety.</p>
                  <Button className="bg-wellness-primary hover:bg-wellness-dark">Read Now</Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <Video className="h-8 w-8 text-wellness-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mindfulness Videos</h3>
                  <p className="text-gray-600 mb-4">Guided meditation and mindfulness practice videos.</p>
                  <Button className="bg-wellness-primary hover:bg-wellness-dark">Watch Now</Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <FileText className="h-8 w-8 text-wellness-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Self-Assessment Tools</h3>
                  <p className="text-gray-600 mb-4">Evaluate your mental well-being with our assessment tools.</p>
                  <Button className="bg-wellness-primary hover:bg-wellness-dark">Start Assessment</Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4">
                <Download className="h-8 w-8 text-wellness-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Downloadable Worksheets</h3>
                  <p className="text-gray-600 mb-4">Practice exercises and worksheets for personal growth.</p>
                  <Button className="bg-wellness-primary hover:bg-wellness-dark">Download</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelfHelpResources;
