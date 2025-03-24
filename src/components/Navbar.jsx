import { motion } from "framer-motion";
import { Briefcase, FileText, Info, Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo & Brand */}
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="https://img.icons8.com/fluency/48/000000/artificial-intelligence.png" 
          alt="AI Logo" 
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-bold text-indigo-700">SmartCV AI</h1>
      </motion.div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-gray-700 text-lg font-medium">
        <a href="#features" className="hover:text-indigo-700 flex items-center gap-2">
          <FileText size={20} /> Features
        </a>
        <a href="#howitworks" className="hover:text-indigo-700 flex items-center gap-2">
          <Briefcase size={20} /> How it Works
        </a>
        <a href="#contact" className="hover:text-indigo-700 flex items-center gap-2">
          <Phone size={20} /> Contact
        </a>
      </nav>

      {/* CTA Button */}
      <a href="/signin">
  <motion.button 
    whileHover={{ scale: 1.1 }}
    className="bg-indigo-700 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-800 transition-all"
  >
    Sign up
  </motion.button>
</a>

    </header>
  );
}
