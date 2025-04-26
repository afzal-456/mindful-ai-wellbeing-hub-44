
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newMessage = {
      id: Date.now().toString(),
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      date: new Date().toLocaleDateString()
    };

    const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    
    const updatedMessages = [...existingMessages, newMessage];
    
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    
    event.currentTarget.reset();
    
    toast.success("Message sent successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-wellness">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-wellness-dark">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6 text-wellness-dark">Get In Touch</h2>
                <p className="text-gray-700 mb-8">
                  Whether you have questions about our services, need technical support, or want to explore partnership opportunities, our team is here to help.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-wellness-light rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-wellness-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-wellness-dark">Email</h3>
                      <p className="text-gray-600">support@mindfulai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wellness-light rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-wellness-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-wellness-dark">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-wellness-light rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-wellness-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-wellness-dark">Office</h3>
                      <p className="text-gray-600">
                        123 Innovation Hub<br />
                        Koramangala, Bangalore 560034<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-wellness-dark">Send Us a Message</h2>
                  
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </Label>
                        <Input id="name" name="name" placeholder="John Doe" className="w-full" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" className="w-full" required />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </Label>
                      <Input id="subject" name="subject" placeholder="How can we help you?" className="w-full" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Please provide details about your inquiry..." 
                        className="w-full min-h-[150px]" 
                        required
                      />
                    </div>
                    
                    <Button className="bg-wellness-primary hover:bg-wellness-dark text-white px-8">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
