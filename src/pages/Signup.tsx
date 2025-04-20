
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate user registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userType", "user");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      toast.success("Account created successfully!");
      navigate("/user-dashboard");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wellness-light to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border border-border animate-fade-in">
          <div className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-wellness-primary" />
            <h2 className="mt-6 text-3xl font-bold text-foreground">Create an account</h2>
            <p className="mt-2 text-sm text-muted-foreground">Join our community today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
