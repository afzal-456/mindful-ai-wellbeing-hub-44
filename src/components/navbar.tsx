
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 md:px-10 lg:px-20 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-wellness-dark flex items-center">
          <span className="text-wellness-primary mr-2">Mindful</span>AI
        </Link>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-foreground hover:text-primary transition-colors">
          Home
        </Link>
        <Link to="/therapy" className="text-foreground hover:text-primary transition-colors">
          Therapy
        </Link>
        <Link to="/tools" className="text-foreground hover:text-primary transition-colors">
          Tools
        </Link>
        <Link to="/about" className="text-foreground hover:text-primary transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
          Contact
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Link to="/login">
          <Button variant="ghost" className="text-foreground hover:text-primary">
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
