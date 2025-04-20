import { useState, useEffect } from "react";
import { 
  FaUser, 
  FaRobot, 
  FaGraduationCap, 
  FaFileAlt, 
  FaSignOutAlt, 
  FaCode, 
  FaSun, 
  FaMoon,
  FaBriefcase, 
  FaArrowRight, 
  FaArrowLeft,
  FaDownload,
  FaCloudUploadAlt,
  FaSave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCog,
  FaImage
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Enhanced Dashboard Component for SmartCV AI
 * Features improved UI, animations, better typography and user experience
 */
export default function EnhancedDashboard() {
  // State Management
  const [activeTab, setActiveTab] = useState("personal");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  
  // Form Data
  const [personal, setPersonal] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    address: "",
    linkedin: "",
    website: ""
  });
  
  const [qualification, setQualification] = useState({ 
    degree: "", 
    university: "", 
    year: "",
    additionalCourses: ""
  });
  
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  
  const [profession, setProfession] = useState({ 
    jobTitle: "", 
    experience: "", 
    background: "",
    achievements: ""
  });
  
  // Resume templates
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const templates = [
    { id: "modern", name: "Modern", color: "indigo" },
    { id: "classic", name: "Classic", color: "blue" },
    { id: "creative", name: "Creative", color: "purple" },
    { id: "minimal", name: "Minimal", color: "gray" }
  ];
  
  // Navigation and User Data
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, photo } = location.state || {};
  const [userPhoto, setUserPhoto] = useState(
    localStorage.getItem("userPhoto") || photo || ""
  );

  // Load user photo from location state if available
  useEffect(() => {
    if (photo && !localStorage.getItem("userPhoto")) {
      setUserPhoto(photo);
      localStorage.setItem("userPhoto", photo);
    }
    
    // Load saved form data if available
    const savedData = localStorage.getItem("cvFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.personal) setPersonal(parsedData.personal);
        if (parsedData.qualification) setQualification(parsedData.qualification);
        if (parsedData.summary) setSummary(parsedData.summary);
        if (parsedData.skills) setSkills(parsedData.skills);
        if (parsedData.profession) setProfession(parsedData.profession);
        if (parsedData.template) setSelectedTemplate(parsedData.template);
      } catch (err) {
        console.error("Error parsing saved data:", err);
      }
    }
    
    // Set dark mode based on system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, [photo]);
  
  // Auto-save form data
  useEffect(() => {
    if (!autoSave) return;
    
    const saveTimer = setTimeout(() => {
      const formData = {
        personal,
        qualification,
        summary,
        skills,
        profession,
        template: selectedTemplate
      };
      
      localStorage.setItem("cvFormData", JSON.stringify(formData));
      setLastSaved(new Date());
    }, 2000);
    
    return () => clearTimeout(saveTimer);
  }, [personal, qualification, summary, skills, profession, selectedTemplate, autoSave]);

  /**
   * Validates form data before submission
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate personal details
    if (!personal.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    
    if (!personal.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(personal.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!personal.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }
    
    if (!personal.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    // Validate qualification
    if (!qualification.degree.trim()) {
      errors.degree = "Degree is required";
      isValid = false;
    }
    
    if (!qualification.university.trim()) {
      errors.university = "University/College is required";
      isValid = false;
    }
    
    if (!qualification.year.trim()) {
      errors.year = "Year is required";
      isValid = false;
    }

    // Validate summary, skills and profession
    if (!summary.trim()) {
      errors.summary = "Summary is required";
      isValid = false;
    }
    
    if (!skills.trim()) {
      errors.skills = "Skills are required";
      isValid = false;
    }
    
    if (!profession.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
      isValid = false;
    }
    
    if (!profession.experience.trim()) {
      errors.experience = "Experience is required";
      isValid = false;
    }
    
    if (!profession.background.trim()) {
      errors.background = "Professional background is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  /**
   * Handles CV generation and API submission
   */
  const handleGenerateCV = async () => {
    if (!validateForm()) {
      // Find the first tab with errors and navigate to it
      for (const key in formErrors) {
        if (Object.keys(personal).includes(key)) {
          setActiveTab("personal");
          break;
        } else if (Object.keys(qualification).includes(key)) {
          setActiveTab("qualification");
          break;
        } else if (key === "summary") {
          setActiveTab("summary");
          break;
        } else if (key === "skills") {
          setActiveTab("skills");
          break;
        } else if (Object.keys(profession).includes(key)) {
          setActiveTab("profession");
          break;
        }
      }
      return;
    }

    setIsLoading(true);

    const formData = {
      personal,
      qualification,
      summary,
      skills,
      profession,
      template: selectedTemplate
    };

    try {
      const response = await fetch('https://smart-cv-s3xx.onrender.com/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Handle download link
        if (data.downloadLink) {
          // Automatically trigger download after a short delay
          setTimeout(() => {
            window.open(data.downloadLink, "_blank");
          }, 1500);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to generate resume: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error. Please check your internet and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user photo upload
   */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Maximum size is 5MB.");
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      setUserPhoto(imageUrl);
      localStorage.setItem("userPhoto", imageUrl);
      setShowPhotoModal(false);
    }
  };

  /**
   * Handles user logout
   */
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout? Your data is saved locally.");
    if (confirmLogout) {
      localStorage.removeItem("userPhoto");
      navigate("/");
    }
  };

  /**
   * Input field component with error handling
   */
  const FormInput = ({ type, placeholder, value, onChange, error, className }) => (
    <div className="mb-4 w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 border rounded-lg shadow-sm transition duration-300 focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"} 
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
          font-inter text-base ${className || ""}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <FaExclamationTriangle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );

  /**
   * Textarea component with error handling
   */
  const FormTextarea = ({ placeholder, value, onChange, error, className }) => (
    <div className="mb-4 w-full">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 border rounded-lg shadow-sm transition duration-300 focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
          font-inter text-base ${className || ""}`}
      ></textarea>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <FaExclamationTriangle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );

  /**
   * Navigation button component
   */
  const NavButton = ({ onClick, icon, text, color = "bg-indigo-600", className }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 ${color} text-white px-6 py-3 rounded-lg 
        hover:opacity-90 transition duration-300 disabled:opacity-50 font-medium shadow-md hover:shadow-lg
        transform hover:-translate-y-1 active:translate-y-0 font-poppins ${className || ""}`}
    >
      {icon} {text}
    </button>
  );

  /**
   * Template selection card
   */
  const TemplateCard = ({ id, name, color, selected, onClick }) => (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition duration-300 transform hover:scale-105 
        ${selected ? `border-${color}-600 bg-${color}-50 dark:bg-${color}-900 dark:bg-opacity-20` : "border-gray-300 dark:border-gray-700"}
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <div className={`h-32 rounded bg-${color}-100 dark:bg-${color}-800 flex items-center justify-center mb-3`}>
        <span className={`text-${color}-600 dark:text-${color}-400 font-bold font-poppins`}>{name}</span>
      </div>
      <p className="text-center font-medium">{name}</p>
    </div>
  );

  /**
   * Success modal component
   */
  const SuccessModal = ({ show }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity">
        <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl transform transition-all duration-500 
          ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} max-w-md w-full`}>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <FaCheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-poppins">Resume Generated!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Your professional resume has been created successfully.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors"
              >
                <FaDownload className="mr-2" /> Download Resume
              </button>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Photo upload modal component
   */
  const PhotoModal = ({ show }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity">
        <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl transform transition-all duration-500 
          ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} max-w-md w-full`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">Update Profile Photo</h3>
            
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-600">
                <img 
                  src={userPhoto || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <label 
              htmlFor="photo-input"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors mx-auto w-fit cursor-pointer mb-4"
            >
              <FaImage className="mr-2" /> Select New Photo
            </label>
            
            <div className="flex justify-center gap-4 mt-4">
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders form content based on active tab
   */
  const renderContent = () => {
    const contentMap = {
      personal: (
        <>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-5xl" />
            <h1 className="text-4xl font-extrabold font-poppins">
              <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg font-inter">Your AI-Powered Professional Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6 flex items-center font-poppins">
            <FaUser className="mr-2 text-indigo-600" /> Personal Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              type="text"
              placeholder="Full Name"
              value={personal.name}
              onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
              error={formErrors.name}
            />
            <FormInput
              type="email"
              placeholder="Email"
              value={personal.email}
              onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
              error={formErrors.email}
            />
            <FormInput
              type="tel"
              placeholder="Phone Number"
              value={personal.phone}
              onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
              error={formErrors.phone}
            />
            <FormInput
              type="text"
              placeholder="LinkedIn Profile (optional)"
              value={personal.linkedin}
              onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
            />
            <FormInput
              type="text"
              placeholder="Personal Website (optional)"
              value={personal.website}
              onChange={(e) => setPersonal({ ...personal, website: e.target.value })}
            />
            <FormTextarea
              placeholder="Address"
              value={personal.address}
              onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
              error={formErrors.address}
            />
          </div>
          
          <div className="flex justify-end mt-8">
            <NavButton 
              onClick={() => setActiveTab("qualification")} 
              icon={<FaArrowRight />} 
              text="Next: Education" 
              className="px-8"
            />
          </div>
        </>
      ),
      
      qualification: (
        <>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-5xl" />
            <h1 className="text-4xl font-extrabold font-poppins">
              <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg font-inter">Your AI-Powered Professional Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6 flex items-center font-poppins">
            <FaGraduationCap className="mr-2 text-indigo-600" /> Education & Qualifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              type="text"
              placeholder="Degree / Certification"
              value={qualification.degree}
              onChange={(e) => setQualification({ ...qualification, degree: e.target.value })}
              error={formErrors.degree}
            />
            <FormInput
              type="text"
              placeholder="University / College / Institution"
              value={qualification.university}
              onChange={(e) => setQualification({ ...qualification, university: e.target.value })}
              error={formErrors.university}
            />
            <FormInput
              type="text"
              placeholder="Year of Completion"
              value={qualification.year}
              onChange={(e) => setQualification({ ...qualification, year: e.target.value })}
              error={formErrors.year}
            />
            <FormTextarea
              placeholder="Additional Courses or Certifications (optional)"
              value={qualification.additionalCourses}
              onChange={(e) => setQualification({ ...qualification, additionalCourses: e.target.value })}
            />
          </div>
          
          <div className="flex justify-between mt-8">
            <NavButton 
              onClick={() => setActiveTab("personal")} 
              icon={<FaArrowLeft />} 
              text="Previous" 
              color="bg-gray-600"
            />
            <NavButton 
              onClick={() => setActiveTab("summary")} 
              icon={<FaArrowRight />} 
              text="Next: Summary" 
              className="px-8"
            />
          </div>
        </>
      ),
      
      summary: (
        <>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-5xl" />
            <h1 className="text-4xl font-extrabold font-poppins">
              <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg font-inter">Your AI-Powered Professional Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6 flex items-center font-poppins">
            <FaFileAlt className="mr-2 text-indigo-600" /> Professional Summary
          </h2>
          
          <div className="mb-4 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 p-4 rounded-lg border-l-4 border-indigo-500">
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              Write a compelling overview of your professional background, skills, and career objectives.
              This section gives employers a quick snapshot of your value proposition.
            </p>
          </div>
          
          <FormTextarea
            placeholder="I am a dedicated professional with X years of experience in... My expertise includes..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            error={formErrors.summary}
            className="h-64"
          />
          
          <div className="flex justify-between mt-8">
            <NavButton 
              onClick={() => setActiveTab("qualification")} 
              icon={<FaArrowLeft />} 
              text="Previous" 
              color="bg-gray-600"
            />
            <NavButton 
              onClick={() => setActiveTab("skills")} 
              icon={<FaArrowRight />} 
              text="Next: Skills" 
              className="px-8"
            />
          </div>
        </>
      ),
      
      skills: (
        <>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-5xl" />
            <h1 className="text-4xl font-extrabold font-poppins">
              <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg font-inter">Your AI-Powered Professional Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6 flex items-center font-poppins">
            <FaCode className="mr-2 text-indigo-600" /> Skills & Expertise
          </h2>
          
          <div className="mb-4 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 p-4 rounded-lg border-l-4 border-indigo-500">
            <p className="text-gray-700 dark:text-gray-300 font-inter">
              List your technical skills, soft skills, tools, and technologies you're proficient in.
              Separate different skills with commas for better readability.
            </p>
          </div>
          
          <FormTextarea
            placeholder="HTML, CSS, JavaScript, React, Node.js, Team Leadership, Project Management, Communication, Adobe Photoshop..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            error={formErrors.skills}
            className="h-64"
          />
          
          <div className="flex justify-between mt-8">
            <NavButton 
              onClick={() => setActiveTab("summary")} 
              icon={<FaArrowLeft />} 
              text="Previous" 
              color="bg-gray-600"
            />
            <NavButton 
              onClick={() => setActiveTab("profession")} 
              icon={<FaArrowRight />} 
              text="Next: Experience" 
              className="px-8"
            />
          </div>
        </>
      ),
      
      profession: (
        <>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-5xl" />
            <h1 className="text-4xl font-extrabold font-poppins">
              <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
              <span className="text-indigo-700">CV</span>
              <span className="text-purple-600"> AI</span>
            </h1>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-lg font-inter">Your AI-Powered Professional Resume Builder</p>

          <h2 className="text-2xl font-bold mb-6 flex items-center font-poppins">
            <FaBriefcase className="mr-2 text-indigo-600" /> Professional Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              type="text"
              placeholder="Current/Recent Job Title"
              value={profession.jobTitle}
              onChange={(e) => setProfession({ ...profession, jobTitle: e.target.value })}
              error={formErrors.jobTitle}
            />
            <FormInput
              type="text"
              placeholder="Years of Experience"
              value={profession.experience}
              onChange={(e) => setProfession({ ...profession, experience: e.target.value })}
              error={formErrors.experience}
            />
          </div>
          
          <div className="mt-6">
            <div className="mb-2 text-gray-700 dark:text-gray-300 font-medium font-inter">
              Professional Background & Work History
            </div>
            <FormTextarea
              placeholder="Describe your work history, roles, and responsibilities..."
              value={profession.background}
              onChange={(e) => setProfession({ ...profession, background: e.target.value })}
              error={formErrors.background}
              className="h-40"
            />
          </div>
          
          <div className="mt-6">
            <div className="mb-2 text-gray-700 dark:text-gray-300 font-medium font-inter">
              Key Achievements & Accomplishments (optional)
            </div>
            <FormTextarea
              placeholder="List notable achievements, awards, or measurable results from your work..."
              value={profession.achievements}
              onChange={(e) => setProfession({ ...profession, achievements: e.target.value })}
              className="h-40"
            />
          </div>
          
          <div className="mt-8 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-xl font-bold mb-4 font-poppins">Select Resume Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {templates.map(template => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  color={template.color}
                  selected={selectedTemplate === template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center">
              <input
              type="checkbox"
              id="autosave"
              checked={autoSave}
              onChange={() => setAutoSave(!autoSave)}
              className="mr-2 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="autosave" className="text-sm text-gray-600 dark:text-gray-400 font-inter">
              Auto save form
              {lastSaved && autoSave && (
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </label>
          </div>
          
          <div className="flex space-x-4">
            <NavButton 
              onClick={() => setActiveTab("skills")} 
              icon={<FaArrowLeft />} 
              text="Previous" 
              color="bg-gray-600"
            />
            <NavButton 
              onClick={handleGenerateCV} 
              icon={isLoading ? null : <FaCloudUploadAlt className="mr-2" />} 
              text={isLoading ? "Generating..." : "Generate Resume"} 
              color="bg-green-600"
              className="px-8"
            />
          </div>
        </div>
      </>
    )
  };

  return contentMap[activeTab] || contentMap.personal;
};

// Main component render
return (
  <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>
   
   {/* Header with corrected name display */}
<header className={`px-4 py-3 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md transition-colors duration-300`}>
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center">
      <FaRobot className="text-purple-600 text-2xl mr-2" />
      <span className="font-bold text-xl font-poppins">
        <span className={darkMode ? "text-white" : "text-gray-900"}>Smart</span>
        <span className="text-indigo-700">CV</span>
        <span className="text-purple-600"> AI</span>
      </span>
    </div>
    
    <div className="flex items-center space-x-4">
      <div 
        onClick={() => setShowPhotoModal(true)}
        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-indigo-500 mr-2">
          <img 
            src={userPhoto || "https://via.placeholder.com/150"} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
        {/* Fixed user name display logic */}
        <span className="hidden sm:inline font-medium">
          {personal?.name || (location.state && location.state.name) || "Guest User"}
        </span>
      </div>
      
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      
      <button
        onClick={handleLogout}
        className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300"
        aria-label="Logout"
      >
        <FaSignOutAlt className="mr-1" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  </div>
</header>

    {/* Main content */}
    <main className="container mx-auto px-4 py-8">
      <div className={`max-w-5xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-xl p-8 transition-colors duration-300`}>
        {/* Progress tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {[
            { id: "personal", icon: <FaUser />, text: "Personal" },
            { id: "qualification", icon: <FaGraduationCap />, text: "Education" },
            { id: "summary", icon: <FaFileAlt />, text: "Summary" },
            { id: "skills", icon: <FaCode />, text: "Skills" },
            { id: "profession", icon: <FaBriefcase />, text: "Experience" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base
                ${activeTab === tab.id 
                  ? `${darkMode ? "bg-indigo-700" : "bg-indigo-600"} text-white shadow-md` 
                  : `${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} 
                     ${darkMode ? "text-gray-200" : "text-gray-700"}`
                }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.text}</span>
            </button>
          ))}
        </div>
        
        {/* Form content */}
        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </main>

    {/* Settings gear in bottom right */}
    <div className="fixed bottom-8 right-8">
      <button 
        onClick={() => alert("Settings functionality would open here")}
        className={`p-4 rounded-full shadow-lg ${darkMode ? "bg-gray-700 text-indigo-400" : "bg-indigo-600 text-white"} hover:opacity-90 transition-opacity`}
      >
        <FaCog className="text-2xl" />
      </button>
    </div>

    {/* Modals */}
    <SuccessModal show={showSuccessModal} />
    <PhotoModal show={showPhotoModal} />
    
    {/* Hidden file input for photo upload */}
    <input 
      type="file" 
      id="photo-input" 
      className="hidden" 
      accept="image/*"
      onChange={handlePhotoChange}
    />
  </div>
);
}