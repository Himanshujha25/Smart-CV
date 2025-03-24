import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle, LayoutTemplate } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {handleGoogleSignIn} from "../utils/GoogleAuth";


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans  ">
      <Navbar />

      <main className="flex-1 ">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-xl space-y-6">
            <motion.h1
              className="text-5xl font-bold leading-tight"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Build Your Professional Resume in Minutes!
            </motion.h1>
            <p className="text-lg">
              AI-powered resume maker with modern templates, auto-generated summaries, and one-click downloads. Perfect for freshers and professionals.
            </p>
            <motion.button
            
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGoogleSignIn(navigate)}
              className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-full shadow-lg flex items-center gap-3"
            >
              Get Started <ArrowRight />
            </motion.button>
          </div>

          <motion.img
            src="https://img.freepik.com/free-vector/job-hunting-concept-illustration_114360-4765.jpg"
            alt="AI Resume"
            className="w-full max-w-lg rounded-2xl shadow-2xl mt-10 md:mt-0"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </section>

        {/* Features Section */}
        <section className="py-20 px-8 bg-gray-100 text-gray-900" id="features">
          <motion.h2 
            className="text-4xl font-bold text-center mb-14 text-indigo-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Features You'll Love
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle size={40} className="text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">AI Summaries</h3>
              <p>Generate job-specific professional summaries instantly with our AI engine.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <LayoutTemplate size={40} className="text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Modern Templates</h3>
              <p>Pick from a wide range of sleek, HR-approved resume templates.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <Download size={40} className="text-indigo-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Instant PDF Download</h3>
              <p>One-click download for your ready-to-use professional PDF resume.</p>
            </motion.div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-8 bg-gray-100 text-gray-900 " id="howitworks">
          <motion.h2 
            className="text-4xl font-bold text-center mb-14 text-indigo-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            How It Works
          </motion.h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-800">
            <motion.div 
              className="p-8 bg-gray-100 rounded-3xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Step 1</h3>
              <p>Enter your basic information, education, and experience.</p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gray-100 rounded-3xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Step 2</h3>
              <p>Choose your favorite template and let AI generate your summary.</p>
            </motion.div>

            <motion.div 
              className="p-8 bg-gray-100 rounded-3xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Step 3</h3>
              <p>Preview and download your resume instantly in high-quality PDF format.</p>
            </motion.div>
          </div>
          
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 text-white text-center">
  <motion.h2 
    className="text-4xl font-bold mb-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    Ready to Elevate Your Professional Journey?
  </motion.h2>
  
  <p className="text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
    Empower your career with an AI-driven, professionally designed resume that highlights your strengths and lands you your dream job.
  </p>

  <motion.button
    whileHover={{ scale: 1.1 }}
    onClick={() => navigate('/signin')}
    className="bg-white text-indigo-800 font-semibold text-xl px-14 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-4 mx-auto"
  >
    Create My Resume Now <ArrowRight />
  </motion.button>
</section>


      </main>

      <Footer />
    </div>
  );
}
