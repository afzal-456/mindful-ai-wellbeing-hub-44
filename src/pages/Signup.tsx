import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserPlus, Lock, Eye, EyeOff } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { signInWithGoogle } from "@/lib/googleSignIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateBMI } from "@/lib/calculate-bmi";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signupSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select your gender"),
  age: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  primaryGoal: z.string().optional(),
  communicationMethod: z.string().optional(),
  reminderTime: z.string().optional(),
  consentScreening: z.boolean().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and privacy policy"),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [profileImage, setProfileImage] = useState("");
  const [bmi, setBmi] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();


  
const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore();

  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;

    const allowedUsersRef = collection(db, "allowedUsers");
    const q = query(allowedUsersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existing = snapshot.docs[0].data();
      if (existing.provider !== "google") {
        alert("This email is already registered with a different method.");
        await auth.signOut();
        return;
      }
    } else {
      // New Google user — allow
      await setDoc(doc(db, "allowedUsers", result.user.uid), {
        email,
        provider: "google",
        createdAt: new Date()
      });
    }

    // redirect to dashboard
  } catch (error) {
    alert("Google login failed: " + error.message);
  }
};

  const handleSignup = async (data: SignupFormData) => {
  const auth = getAuth();
  const db = getFirestore();
  const { email, password } = data;

  // Check if email already exists in allowedUsers
  const allowedUsersRef = collection(db, "allowedUsers");
  const q = query(allowedUsersRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    alert("This email is already registered with another account.");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Store user email in allowedUsers
    await setDoc(doc(db, "allowedUsers", uid), {
      email,
      provider: "password",
      createdAt: new Date(),
    });

    // Store full profile in a separate 'users' collection
    await setDoc(doc(db, "users", uid), {
      ...data,
      profileImage,
      bmi,
      createdAt: new Date(),
    });

    // Proceed
    localStorage.setItem("userType", "premium");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userAge", data.age || "");
    localStorage.setItem("userGender", data.gender);
    localStorage.setItem("userWeight", data.weight || "");
    localStorage.setItem("userHeight", data.height || "");
    localStorage.setItem("userBMI", bmi);
    localStorage.setItem("userProfileImage", profileImage);

    toast.success("Account created successfully!");
    navigate("/user-dashboard");
  } catch (error: any) {
    alert("Signup error: " + error.message);
  }

  console.log("Creating user in Firebase Auth...");
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const uid = userCredential.user.uid;
console.log("Firebase Auth UID:", uid);

console.log("Adding to allowedUsers...");
await setDoc(doc(db, "allowedUsers", uid), {
  email,
  provider: "password",
  createdAt: new Date(),
});
console.log("allowedUsers entry created.");

console.log("Adding to users collection...");
await setDoc(doc(db, "users", uid), {
  ...data,
  profileImage,
  bmi,
  createdAt: new Date(),
});
console.log("users entry created.");
};



  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
      age: "",
      weight: "",
      height: "",
      primaryGoal: "",
      communicationMethod: "email",
      reminderTime: "",
      consentScreening: false,
      agreeTerms: false,
      newsletter: false,
    },
  });

  const calculateUserBMI = (weight: string, height: string) => {
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

  const handleNextStep = async () => {
    const isValid = await form.trigger(['name', 'email', 'password', 'confirmPassword', 'dateOfBirth', 'gender', 'agreeTerms']);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
  if (step === 1) {
    handleNextStep();
    return;
  }

  setIsLoading(true);
  if (data.weight && data.height) {
    calculateUserBMI(data.weight, data.height);
  }

  await handleSignup(data);  // <-- Must be called here
  setIsLoading(false);
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-wellness-light to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border border-border animate-fade-in">
          <div className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-wellness-primary" />
            <h2 className="mt-6 text-3xl font-bold text-foreground">Create an account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join our community today - Step {step} of 2
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {step === 1 ? (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password (min. 6 characters)" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-muted-foreground">
                          Your password is encrypted and secure
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>{" "}
                            *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-2 border-primary">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback className="text-lg">{form.watch("name")?.charAt(0)}</AvatarFallback>
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

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Age" min="1" max="120" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Weight in kg" 
                            min="1" 
                            max="500" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (form.watch("height")) {
                                calculateUserBMI(e.target.value, form.watch("height"));
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Height in cm" 
                            min="1" 
                            max="300" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              if (form.watch("weight")) {
                                calculateUserBMI(form.watch("weight"), e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {bmi && (
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium">Your BMI: <span className="font-bold">{bmi}</span></p>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="primaryGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Goal (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="What's your main wellness goal?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manage-anxiety">Manage anxiety</SelectItem>
                            <SelectItem value="improve-sleep">Improve sleep</SelectItem>
                            <SelectItem value="track-mood">Track mood</SelectItem>
                            <SelectItem value="build-resilience">Build resilience</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="communicationMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred Communication Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="email" />
                              <Label htmlFor="email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="push" id="push" />
                              <Label htmlFor="push">Push Notification</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="none" id="none" />
                              <Label htmlFor="none">None</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reminderTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Check-in Reminder Time (Optional)</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll send you a gentle reminder to check in on your wellness
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentScreening"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I consent to mental health screening tools
                          </FormLabel>
                          <FormDescription className="text-xs">
                            This helps us provide personalized recommendations
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            Subscribe to Wellness Tips Newsletter
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Get weekly tips and insights delivered to your inbox
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
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
                    : "Create Account"}~
              </Button>
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Sign up with Google
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
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
