import React from "react";

const Profile = ({ personal, setPersonal, onNext }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-extrabold">
          <span className="text-black">Smart</span>
          <span className="text-indigo-700">CV</span>
          <span className="text-purple-600"> AI</span>
        </h1>
      </div>
      <p className="text-center text-gray-500">Your AI Powered Resume Builder</p>

      <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
      <form className="space-y-4">
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

      <button
        onClick={onNext}
        className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-lg"
      >
        Next
      </button>
    </>
  );
};

export default Profile;
