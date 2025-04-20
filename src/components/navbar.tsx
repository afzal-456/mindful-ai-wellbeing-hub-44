
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 px-6 md:px-10 lg:px-20 flex items-center justify-between shadow-sm relative z-50 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-semibold text-wellness-dark flex items-center">
          <span className="text-wellness-primary mr-2">Mindful</span>AI
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-wellness-dark" />
        ) : (
          <Menu className="h-6 w-6 text-wellness-dark" />
        )}
      </button>
      
      {/* Mobile menu */}
      <div className={`
        absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg md:hidden
        transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/therapy" className="text-foreground hover:text-primary transition-colors">Therapy</Link>
          <Link to="/tools" className="text-foreground hover:text-primary transition-colors">Tools</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          <Link to="/login">
            <Button variant="ghost" className="w-full text-foreground hover:text-primary">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="w-full bg-wellness-primary hover:bg-wellness-dark text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
        <Link to="/therapy" className="text-foreground hover:text-primary transition-colors">Therapy</Link>
        <Link to="/tools" className="text-foreground hover:text-primary transition-colors">Tools</Link>
        <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
        <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
        <ThemeToggle />
        <Link to="/login">
          <Button variant="ghost" className="text-foreground hover:text-primary">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
