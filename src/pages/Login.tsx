import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LogIn } from "lucide-react";
import { signInWithGoogle } from "@/lib/googleSignIn";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {




  const navigate = useNavigate();

  // Define the list of allowed admin emails for Google login
  // Convert all admin emails to lowercase to ensure case-insensitive comparison
  const adminGoogleEmails = [
    'aaashu.1666@gmail.com',
  ].map(email => email.toLowerCase()); // IMPORTANT: Convert to lowercase here


  

  const handleGoogleLogin = async () => {
    const userData = await signInWithGoogle();
    if (userData) {
      const userEmail = userData.email;
      const normalizedUserEmail = userEmail.toLowerCase(); // Normalize the incoming email to lowercase


      // Check if the normalized logged-in Google email is in the adminGoogleEmails list
      if (adminGoogleEmails.includes(normalizedUserEmail)) {
        console.log("Admin email matched! Setting userType to 'admin'.");
        localStorage.setItem("userType", "admin"); // Set to admin
        toast.success(`Welcome Admin, ${userData.name}!`);
        navigate("/admin");
      } else {
        console.log("Not an admin email. Setting userType to 'user'.");
        localStorage.setItem("userType", "user"); // Default to user
        toast.success(`Welcome ${userData.name}`);
        navigate("/user-dashboard");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userEmail); // Store the original email
      localStorage.setItem("userName", userData.name);
    } else {
      console.error("Google sign-in failed."); // Log failure
      toast.error("Google sign-in failed");
    }
  };

  const db = getFirestore();
const auth = getAuth();



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const allowedUsersRef = collection(db, "allowedUsers");
    const q = query(allowedUsersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setIsLoading(false);
      toast.error("This email is not authorized to log in.");
      return;
    }

    await signInWithEmailAndPassword(auth, email, password);

    // ✅ Email verification check here
    if (!auth.currentUser?.emailVerified) {
      await auth.signOut();
      setIsLoading(false);
      toast.error("Please verify your email before logging in.");
      return;
    }

    const isAdmin = email === "admin@mindfulai.com";
    localStorage.setItem("userType", isAdmin ? "admin" : "user");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    toast.success(`Welcome back, ${isAdmin ? "Admin" : "User"}!`);
    navigate(isAdmin ? "/admin" : "/user-dashboard");
  } catch (error: any) {
    setIsLoading(false);
    toast.error("Login failed: " + error.message);
  } finally {
    setIsLoading(false);
  }
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
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Sign in with Google
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