import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ActionHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    if (mode === "verifyEmail") {
      navigate(`/verify-email${window.location.search}`);
    } else if (mode === "resetPassword") {
      navigate(`/reset-password${window.location.search}`);
    } else {
      navigate("/"); // fallback or 404
    }
  }, [navigate]);

  return null; // or loading spinner
}
