
import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 md:px-10 lg:px-20 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <a href="/" className="text-xl font-semibold text-wellness-dark flex items-center">
          <span className="text-wellness-primary mr-2">Mindful</span>AI
        </a>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Home
        </a>
        <a href="/therapy" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Therapy
        </a>
        <a href="/tools" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Tools
        </a>
        <a href="/about" className="text-wellness-text hover:text-wellness-primary transition-colors">
          About
        </a>
        <a href="/contact" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Contact
        </a>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="/login">
          <Button variant="ghost" className="text-wellness-primary hover:text-wellness-dark hover:bg-wellness-light">
            Login
          </Button>
        </a>
        <a href="/signup">
          <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
            Sign Up
          </Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
