import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRobot } from "react-icons/fa";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      console.log("Registered User:", formData);
      alert("Registration Successful!");
      navigate("/dashboard",{
        state: {
          name: formData.name,
          email: formData.email,
          photo: null,
        } }); 
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      alert(`Welcome ${result.user.displayName}`);
      console.log("Profile Pic URL:", result.user.photoURL); // ✅ Ye hai image link
    navigate("/dashboard", {
      state: {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      } })
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Content Wrapper */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full space-y-6">

          {/* SmartCV AI Logo */}
          <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500">Your AI Powered Resume Builder</p>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            />
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            />
            <input
              type={formData.showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={toggleShowPassword}
                checked={formData.showPassword}
              />
              <span className="text-gray-700">Show Password</span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 transition"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg shadow-sm transition duration-300"
          >
            <FcGoogle className="text-2xl mr-3" /> Continue with Google
          </button>

        </div>
      </div>

      {/* Footer Always at Bottom */}
      <Footer />
    </div>
  );
}
