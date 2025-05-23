import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { calculateBMI, getBMICategory } from "@/lib/calculate-bmi";
import { User, UserRound, Weight, Calendar, ArrowLeft, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
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
    
    if (userBMI) {
      setBmiCategory(getBMICategory(parseFloat(userBMI)));
    }
  }, []);

  const calculateUserBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
        const bmiValue = calculateBMI(weightNum, heightNum);
        const formattedBMI = bmiValue.toFixed(1);
        setBmi(formattedBMI);
        setBmiCategory(getBMICategory(bmiValue));
        return formattedBMI;
      }
    }
    return "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Calculate BMI first
    const newBmi = calculateUserBMI();
    
    // Save to localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userAge", age);
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userWeight", weight);
    localStorage.setItem("userHeight", height);
    localStorage.setItem("userBMI", newBmi || bmi);
    localStorage.setItem("userProfileImage", profileImage);
    
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow py-12 px-6 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={handleGoBack} 
            className="mb-6 flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Card className="shadow-lg dark:bg-gray-800 dark:text-gray-100">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-2xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label 
                        htmlFor="profile-image" 
                        className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </label>
                    )}
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center">
                        <UserRound className="mr-2 h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="age" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="gender" className="flex items-center">
                        {gender === 'male' ? (
                          <UserRound className="mr-2 h-4 w-4" />
                        ) : gender === 'female' ? (
                          <UserRound className="mr-2 h-4 w-4" />
                        ) : (
                          <UserRound className="mr-2 h-4 w-4" />
                        )}
                        Gender
                      </Label>
                      <Select
                        value={gender}
                        onValueChange={setGender}
                        disabled={!isEditing}
                      >
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
                      <Label htmlFor="weight" className="flex items-center">
                        <Weight className="mr-2 h-4 w-4" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => {
                          setWeight(e.target.value);
                          if (isEditing && height) calculateUserBMI();
                        }}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="height" className="flex items-center">
                        <Ruler className="mr-2 h-4 w-4" />
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => {
                          setHeight(e.target.value);
                          if (isEditing && weight) calculateUserBMI();
                        }}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                {bmi && (
                  <div className="p-4 bg-muted rounded-md dark:bg-gray-700">
                    <p className="text-sm font-medium">
                      Your BMI: <span className="font-bold">{bmi}</span>
                      {bmiCategory && (
                        <span className="ml-2">({bmiCategory})</span>
                      )}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
