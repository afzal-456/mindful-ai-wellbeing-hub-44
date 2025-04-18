
import React from "react";
import { TrendingUp } from "lucide-react";

const WhySection = () => {
  return (
    <section className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-wellness-dark">
              Why Mental Health Needs Innovation
            </h2>
            <p className="text-gray-700 mb-6">
              Stigma, cost & distance create real barriers.
            </p>
          </div>
          
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-3 text-wellness-primary">60% of those in need don't get help.</h3>
            <p className="text-gray-700">
              Stigma, cost & distance create real barriers.
            </p>
          </div>
          
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium text-wellness-primary">$17.5B</h3>
              <TrendingUp className="text-wellness-primary w-8 h-8" />
            </div>
            <p className="text-gray-700">
              by 2030 - The growing market for mental health solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
