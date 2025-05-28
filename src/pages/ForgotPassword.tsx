import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  const handlePasswordReset = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const allowedUsersRef = collection(db, "allowedUsers");
    const q = query(allowedUsersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      toast.error("This email is not registered.");
      return;
    }

    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent.");
  } catch (error: any) {
    toast.error("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-wellness-light to-background">
        <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset your password</h2>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-wellness-primary hover:bg-wellness-dark text-white"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
