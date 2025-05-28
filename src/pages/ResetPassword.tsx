import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const oobCode = searchParams.get("oobCode");
  const auth = getAuth();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!oobCode) {
      toast.error("Invalid or missing password reset code.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error("Reset failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-wellness-light to-background">
        <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
          <form onSubmit={handleReset} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-wellness-primary hover:bg-wellness-dark text-white"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Confirm New Password"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
