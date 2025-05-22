
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check login status when component mounts or route changes
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const userTypeValue = localStorage.getItem("userType");
    
    setIsLoggedIn(loginStatus);
    setUserType(userTypeValue);
    
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/login");
  };
  
  const getDashboardLink = () => {
    if (userType === "admin") {
      return "/admin";  // Changed from /admin-dashboard to /admin
    }
    return "/user-dashboard";
  };

  const getDashboardText = () => {
    if (userType === "admin") {
      return "Admin Panel";  // More descriptive text for admin users
    }
    return "Dashboard";
  };

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
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
          {!isLoggedIn || userType !== "admin" ? (
            <>
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/therapy" className="text-foreground hover:text-primary transition-colors">Therapy</Link>
              <Link to="/tools" className="text-foreground hover:text-primary transition-colors">Tools</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
            </>
          ) : null}
          
          {isLoggedIn ? (
            <>
              <Link to={getDashboardLink()} className="text-foreground hover:text-primary transition-colors flex items-center">
                <User className="mr-2 h-4 w-4" />
                {getDashboardText()}
              </Link>
              <Button 
                variant="ghost" 
                className="justify-start w-full text-foreground hover:text-primary"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      
      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6">
        {!isLoggedIn || userType !== "admin" ? (
          <>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/therapy" className="text-foreground hover:text-primary transition-colors">Therapy</Link>
            <Link to="/tools" className="text-foreground hover:text-primary transition-colors">Tools</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </>
        ) : null}
        
        {isLoggedIn ? (
          <>
            <Link to={getDashboardLink()}>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <User className="mr-2 h-4 w-4" />
                {getDashboardText()}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="text-foreground hover:text-primary"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-wellness-primary hover:bg-wellness-dark text-white">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
