
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@mindfulai.com" && password === "admin123") {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Welcome back, Admin!");
        navigate("/admin");  // Changed to /admin for clarity
      } else if (email && password.length >= 6) {
        localStorage.setItem("userType", "user");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        toast.success("Login successful!");
        navigate("/user-dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wellness-light to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border border-border animate-fade-in">
          <div className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-wellness-primary" />
            <h2 className="mt-6 text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-wellness-primary hover:bg-wellness-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
