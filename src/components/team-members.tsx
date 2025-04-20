
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
};

const TeamMembers = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "Dr. Johnson is a board-certified psychiatrist with over 15 years of experience in cognitive behavioral therapy and mindfulness-based interventions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/drsarahjohnson",
        email: "sarah@mindfulai.com"
      }
    },
    {
      id: 2,
      name: "Mark Williams",
      role: "Head of AI Development",
      bio: "Mark leads our AI team, combining his expertise in machine learning with a passion for mental health to create empathetic, effective therapeutic algorithms.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/markwilliams",
        twitter: "https://twitter.com/markwilliamsai",
        email: "mark@mindfulai.com"
      }
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      role: "Clinical Research Director",
      bio: "Dr. Chen oversees our clinical research initiatives, ensuring all our therapeutic approaches are evidence-based and continuously improving.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/emilychen",
        twitter: "https://twitter.com/dremilychen",
        email: "emily@mindfulai.com"
      }
    },
    {
      id: 4,
      name: "James Rodriguez",
      role: "User Experience Director",
      bio: "James ensures our platform is accessible, engaging, and intuitive for all users, regardless of their technical background or mental health needs.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/jamesrodriguez",
        twitter: "https://twitter.com/jamesuxdesign",
        email: "james@mindfulai.com"
      }
    },
    {
      id: 5,
      name: "Dr. Michael Wong",
      role: "Meditation & Mindfulness Lead",
      bio: "Dr. Wong brings 20 years of meditation practice and research to our team, developing programs that help users cultivate mindfulness in daily life.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/michaelwong",
        twitter: "https://twitter.com/drmichaelwong",
        email: "michael@mindfulai.com"
      }
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Chief Operating Officer",
      bio: "Lisa oversees our day-to-day operations, ensuring we deliver consistent, high-quality mental health support to all our users worldwide.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      social: {
        linkedin: "https://linkedin.com/in/lisathompson",
        twitter: "https://twitter.com/lisathompsonco",
        email: "lisa@mindfulai.com"
      }
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team of experts combines clinical expertise, technological innovation,
            and compassionate care to provide you with the best mental wellness support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={member.id} className="overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="aspect-w-1 aspect-h-1 bg-wellness-light">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-full h-64"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-wellness-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-wellness-primary" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-muted-foreground hover:text-wellness-primary" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-wellness-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
