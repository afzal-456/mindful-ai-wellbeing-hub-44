
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserPlus } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateBMI } from "@/lib/calculate-bmi";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bmi, setBmi] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const calculateUserBMI = () => {
    if (weight && height) {
      const bmiValue = calculateBMI(parseFloat(weight), parseFloat(height));
      setBmi(bmiValue.toFixed(1));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    setIsLoading(true);
    
    // Calculate BMI before saving
    calculateUserBMI();
    
    // Simulate user registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userType", "premium"); // Setting all users as premium
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userAge", age);
      localStorage.setItem("userGender", gender);
      localStorage.setItem("userWeight", weight);
      localStorage.setItem("userHeight", height);
      localStorage.setItem("userBMI", bmi);
      localStorage.setItem("userProfileImage", profileImage);
      
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
            {step === 1 ? (
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
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-2 border-primary">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="profile-image" 
                      className="absolute bottom-0 right-0 bg-primary rounded-full p-1 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender" className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Weight in kg"
                    min="1"
                    max="500"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (height) calculateUserBMI();
                    }}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Height in cm"
                    min="1"
                    max="300"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      if (weight) calculateUserBMI();
                    }}
                    className="mt-1"
                  />
                </div>
                
                {bmi && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Your BMI: <span className="font-bold">{bmi}</span></p>
                  </div>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-wellness-primary hover:bg-wellness-dark text-white"
              disabled={isLoading}
            >
              {isLoading 
                ? "Creating account..." 
                : step === 1 
                  ? "Continue" 
                  : "Create account"}
            </Button>
            
            {step === 2 && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            )}
            
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
