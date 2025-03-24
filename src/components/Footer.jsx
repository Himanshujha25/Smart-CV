import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">SmartCV AI</h2>
          <p className="text-gray-400 text-md leading-relaxed">
            Build a powerful, professional resume in minutes with AI-powered templates designed to land your dream job.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-md">
            <li><a href="#features" className="hover:text-indigo-400 transition">Features</a></li>
            <li><a href="#pricing" className="hover:text-indigo-400 transition">Pricing</a></li>
            <li><a href="#about" className="hover:text-indigo-400 transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-indigo-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect with Us</h3>
          <div className="flex justify-center md:justify-start gap-5 text-gray-400 text-xl">
            <a href="#" className="hover:text-indigo-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-indigo-500"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-500"><Linkedin size={20} /></a>
            <a href="mailto:support@smartcv.com" className="hover:text-indigo-500"><Mail size={20} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 SmartCV AI. All rights reserved.</p>
        <p className="mt-2 text-indigo-400 text-sm">Designed & Developed by <span className="text-white">Himanshu</span> ❤️</p>
      </div>
    </footer>
  );
}
