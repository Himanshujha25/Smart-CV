import { h1 } from "framer-motion/client";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaRobot, FaGraduationCap, FaFileAlt, FaSignOutAlt, FaCode, FaSun, FaBriefcase } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("personal");
  const [darkMode, setDarkMode] = useState(false);
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", address: "" });
  const [qualification, setQualification] = useState({ degree: "", university: "", year: "" });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [profession, setProfession] = useState({ jobTitle: "", experience: "", background: "" });
  const [downloadLink, setDownloadLink] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, photo } = location.state || {};
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem("userPhoto") || photo || "");

  useEffect(() => {
    if (photo && !localStorage.getItem("userPhoto")) {
      setUserPhoto(photo);
      localStorage.setItem("userPhoto", photo);
    }
  }, [photo]);

  const handleGenerateCV = async () => {
    const formData = {
      personal,
      qualification,
      summary,
      skills,
      profession,
    };
  
    const isValid = Object.values(formData).every((section) => {
      if (typeof section === "object") {
        return Object.values(section).every((field) => field.trim() !== "");
      } else {
        return section.trim() !== "";
      }
    });
  
    if (!isValid) {
      alert("Please fill in all the fields.");
      return;
    }
  
    const confirmGenerate = window.confirm("Do you want to generate your CV?");
    if (!confirmGenerate) return;
  
    alert("Generating CV...");
  
    try {
      const response = await fetch('https://smart-cv-s3xx.onrender.com/generate-resume', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      ;
  
      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);
  
        // ✅ Alert Successful Generation
        alert("Your resume has been generated successfully!");
  
        // ✅ Optional: Download Link Provide
        if (data.downloadLink) {
          const downloadConfirm = window.confirm("Do you want to download the resume?");
          if (downloadConfirm) {
            window.open(data.downloadLink, "_blank");
          }
        }
      } else {
        alert("Failed to generate resume. Try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Try again later.");
    }
  };
  


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserPhoto(imageUrl);
      localStorage.setItem("userPhoto", imageUrl);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userPhoto");
      navigate("/");
    }
  };




  const renderContent = () => {

    const contentMap = {

      personal: (
        <>
          <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 ">Your AI Powered Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
          <form className="space-y-4 personal" >
            <input
              type="text"
              placeholder="Full Name"
              value={personal.name}
              onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
            <input
              type="email"
              placeholder="Email"
              value={personal.email}
              onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={personal.phone}
              onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
            <textarea
              placeholder="Address"
              value={personal.address}
              onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            ></textarea>
          </form>
          <button onClick={() => setActiveTab("qualification")} className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg">
            Next
          </button>
        </>
      ),
      qualification: (
        <>
        <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 ">Your AI Powered Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6">Qualifications</h2>
          <form className="space-y-4 qualification" >
            <input
              type="text"
              placeholder="Degree"
              value={qualification.degree}
              onChange={(e) => setQualification({ ...qualification, degree: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
            <input
              type="text"
              placeholder="University/College"
              value={qualification.university}
              onChange={(e) => setQualification({ ...qualification, university: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
            <input
              type="text"
              placeholder="Year of Passing"
              value={qualification.year}
              onChange={(e) => setQualification({ ...qualification, year: e.target.value })}
              className="w-full p-4 border rounded-lg shadow"
            />
          </form>
          <button
            onClick={() => setActiveTab("personal")}
            className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg mr-4"
          >
            previous
          </button>

          <button onClick={() => setActiveTab("summary")} className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg">
            Next
          </button>

        </>
      ),
      summary: (
        <>
        <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 ">Your AI Powered Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6">Professional Summary</h2>
          <textarea
            placeholder="Write your summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-4 border rounded-lg shadow h-48"
          ></textarea>

          <button
            onClick={() => setActiveTab("qualification")}
            className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg mr-4"
          >
            previous
          </button>

          <button onClick={() => setActiveTab("skills")} className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg" >
            Next
          </button>

        </>
      ),
      skills: (
        <>
        <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 ">Your AI Powered Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <textarea
            placeholder="List your skills separated by commas (e.g., HTML, CSS, JavaScript)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-4 border rounded-lg shadow h-48"
          ></textarea>

          <button
            onClick={() => setActiveTab("summary")}
            className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg mr-4"
          >
            previous
          </button>

          <button
            onClick={() => setActiveTab("profession")}
            className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg"
          >
            Next
          </button>


        </>
      ),
      profession: (
        <>
        <div className="flex items-center justify-center gap-2">
            <FaRobot className="text-purple-600 text-4xl" />
            <h1 className="text-3xl font-extrabold">
              <span className="text-black">Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 ">Your AI Powered Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6">Profession Details</h2>
          <input
            type="text"
            placeholder="Job Title"
            value={profession.jobTitle}
            onChange={(e) => setProfession({ ...profession, jobTitle: e.target.value })}
            className="w-full p-4 border rounded-lg shadow mb-4"
          />
          <input
            type="text"
            placeholder="Years of Experience"
            value={profession.experience}
            onChange={(e) => setProfession({ ...profession, experience: e.target.value })}
            className="w-full p-4 border rounded-lg shadow mb-4"
          />
          <textarea
            placeholder="Professional Background"
            value={profession.background}
            onChange={(e) => setProfession({ ...profession, background: e.target.value })}
            className="w-full p-4 border rounded-lg shadow h-48"
          ></textarea>

          <button
            onClick={() => setActiveTab("skills")}
            className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg mr-4"
          >
            previous
          </button>

          <button
            onClick={handleGenerateCV}
            className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg"
          >
            Generate CV
          </button>


        </>
      ),
    };

    return contentMap[activeTab] || null;
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-6  ">
        <div className="flex items-center gap-4 ">
          <img src={userPhoto} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p>{email}</p>
            <div className="mt-1">
              <label
                htmlFor="photo-upload"
                className="bg-yellow-500 text-white text-sm text-center rounded-md w-40 p-2 cursor-pointer hover:bg-yellow-600 transition duration-300 mt-4"
              >
                Upload profile
              </label>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

          </div>
        </div>
        <div className="flex gap-4">

          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
            <FaSignOutAlt /> Logout
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg">
            <FaSun /> {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Render Tabs */}
      {renderContent()}
      <footer className="text-center text-base mt-20 opacity-80">
        Made with ❤️ by Himanshu
      </footer>

    </div>
  );
}


