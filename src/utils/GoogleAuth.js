import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

export const handleGoogleSignIn = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User:", result.user);
    alert(`Welcome ${result.user.displayName}`);
    console.log("Profile Pic URL:", result.user.photoURL);

    // Navigate to dashboard or wherever you want
    navigate("/dashboard", {
      state: {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      },
    });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In Failed!");
  }
};
