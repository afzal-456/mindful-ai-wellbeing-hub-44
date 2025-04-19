
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const StressManagement = () => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Stress</h2>
          <p className="text-gray-700 mb-4">
            Stress is your body's natural response to pressure. While some stress can be beneficial,
            chronic stress can impact both physical and mental health.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Common Stress Triggers</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Work or school pressure</li>
            <li>Financial concerns</li>
            <li>Relationship issues</li>
            <li>Major life changes</li>
            <li>Health problems</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Stress Management Techniques</h3>
          <div className="grid gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Deep Breathing</h4>
              <p className="text-gray-700">Practice the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.</p>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Progressive Muscle Relaxation</h4>
              <p className="text-gray-700">Tense and then relax each muscle group, starting from your toes and moving up to your head.</p>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Mindfulness Meditation</h4>
              <p className="text-gray-700">Focus on the present moment, acknowledging thoughts without judgment.</p>
            </Card>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default StressManagement;
