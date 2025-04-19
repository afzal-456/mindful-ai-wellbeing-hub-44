
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const AiTherapist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/ZSmymuEf6OwIp_-G_sC0Z"
              width="100%"
              height="700"
              frameBorder="0"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiTherapist;
