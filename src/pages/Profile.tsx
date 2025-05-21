
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateBMI, getBMICategory } from "@/lib/calculate-bmi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { UserRound, GenderMale, GenderFemale, Weight, Height, Edit } from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bmi, setBmi] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    const userName = localStorage.getItem("userName") || "";
    const userEmail = localStorage.getItem("userEmail") || "";
    const userAge = localStorage.getItem("userAge") || "";
    const userGender = localStorage.getItem("userGender") || "";
    const userWeight = localStorage.getItem("userWeight") || "";
    const userHeight = localStorage.getItem("userHeight") || "";
    const userBMI = localStorage.getItem("userBMI") || "";
    const userProfileImage = localStorage.getItem("userProfileImage") || "";

    setName(userName);
    setEmail(userEmail);
    setAge(userAge);
    setGender(userGender);
    setWeight(userWeight);
    setHeight(userHeight);
    setBmi(userBMI);
    setProfileImage(userProfileImage);

    // Calculate BMI category
    if (userBMI) {
      setBmiCategory(getBMICategory(parseFloat(userBMI)));
    }
  }, [navigate]);

  const calculateUserBMI = () => {
    if (weight && height) {
      const bmiValue = calculateBMI(parseFloat(weight), parseFloat(height));
      const bmiString = bmiValue.toFixed(1);
      setBmi(bmiString);
      setBmiCategory(getBMICategory(bmiValue));
      return bmiString;
    }
    return "";
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

  const handleSave = () => {
    setIsLoading(true);
    
    // Calculate BMI before saving
    const newBmi = calculateUserBMI();
    
    // Simulate saving to backend
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userAge", age);
      localStorage.setItem("userGender", gender);
      localStorage.setItem("userWeight", weight);
      localStorage.setItem("userHeight", height);
      localStorage.setItem("userBMI", newBmi || bmi);
      localStorage.setItem("userProfileImage", profileImage);
      
      setIsLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const getGenderIcon = () => {
    if (gender === "male") return <GenderMale className="text-blue-500" />;
    if (gender === "female") return <GenderFemale className="text-pink-500" />;
    return <UserRound />;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-wellness-light to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card rounded-xl shadow-lg border border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground">Your Profile</CardTitle>
              <CardDescription className="text-muted-foreground">View and manage your personal information</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="w-32 h-32 border-4 border-primary">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label 
                      htmlFor="profile-image" 
                      className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                
                {!isEditing ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-muted-foreground">{email}</p>
                  </div>
                ) : (
                  <div className="space-y-4 w-full max-w-sm">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border border-border">
                    <UserRound className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="text-lg font-semibold">{age} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border border-border">
                    {getGenderIcon()}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p className="text-lg font-semibold capitalize">{gender || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border border-border">
                    <Weight className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Weight</p>
                      <p className="text-lg font-semibold">{weight} kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border border-border">
                    <Height className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Height</p>
                      <p className="text-lg font-semibold">{height} cm</p>
                    </div>
                  </div>
                  
                  {bmi && (
                    <div className="md:col-span-2 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">BMI (Body Mass Index)</p>
                          <p className="text-2xl font-bold">{bmi}</p>
                          <p className="text-sm text-muted-foreground">Category: <span className="font-medium">{bmiCategory}</span></p>
                        </div>
                        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xl font-bold text-primary-foreground">{bmi}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
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
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">BMI:</p>
                          <p className="text-xl font-bold">{bmi}</p>
                          <p className="text-sm">Category: {bmiCategory}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-wellness-primary hover:bg-wellness-dark text-white"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-wellness-primary hover:bg-wellness-dark text-white"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
