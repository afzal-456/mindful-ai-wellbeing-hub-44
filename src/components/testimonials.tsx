
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ravi K.",
      role: "Student",
      avatar: "RK",
      quote: "The AI therapist helped me manage exam stress when I couldn't afford regular therapy. The personalized techniques really worked for me."
    },
    {
      name: "Priya S.",
      role: "Working Professional",
      avatar: "PS",
      quote: "I was struggling with work burnout and the 24/7 chat support was a lifesaver. The relaxation tools helped me sleep better after just a week."
    },
    {
      name: "Ajay M.",
      role: "Parent",
      avatar: "AM",
      quote: "As a single parent, I found it hard to make time for my mental health. The platform's flexible approach fits perfectly with my busy schedule."
    }
  ];

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20 bg-wellness-light">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-wellness-dark">
          Testimonials
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear from people who have transformed their mental wellbeing with us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-4 bg-wellness-primary text-white">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <h4 className="font-semibold text-wellness-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
