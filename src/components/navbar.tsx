
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 md:px-10 lg:px-20 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-wellness-dark flex items-center">
          <span className="text-wellness-primary mr-2">Mindful</span>AI
        </Link>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Home
        </Link>
        <Link to="/therapy" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Therapy
        </Link>
        <Link to="/tools" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Tools
        </Link>
        <Link to="/about" className="text-wellness-text hover:text-wellness-primary transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-wellness-text hover:text-wellness-primary transition-colors">
          Contact
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button variant="ghost" className="text-wellness-primary hover:text-wellness-dark hover:bg-wellness-light">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
