// src/pages/VerifyEmail.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, applyActionCode } from "firebase/auth";
import { toast } from "sonner";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const ranOnce = useRef(false);          // <-- guard

  useEffect(() => {
    if (ranOnce.current) return;          // skip on the second StrictMode mount
    ranOnce.current = true;

    const auth = getAuth();
    const params = new URLSearchParams(window.location.search);
    const oobCode = params.get("oobCode");

    if (!oobCode) {
      toast.error("Invalid verification link.");
      return;
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        toast.success("Email verified successfully! You can now log in.");
        navigate("/login");
      })
      .catch((err) => {
        // If the link was already used, treat it as success for UX
        if (err.code === "auth/invalid-action-code") {
          toast.success("Email is already verified. Please log in.");
          navigate("/login");
        } else {
          toast.error("Verification failed: " + err.message);
        }
      });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl">Verifying your email…</h1>
    </div>
  );
}
