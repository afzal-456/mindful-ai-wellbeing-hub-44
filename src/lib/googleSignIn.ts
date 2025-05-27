import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      name: user.displayName || "Unknown User",
      email: user.email || "no-email@example.com",
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};
