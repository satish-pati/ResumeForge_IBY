import { useState, useEffect } from "react";
import { useUser } from "./usercontext";

const Profile = () => {
  const { userId } = useUser(); // Get the logged-in user ID
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || "");
  const [resume, setResume] = useState(localStorage.getItem("resume") || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://backend-1-61k2.onrender.com/api/user/${userId}`); // Replace with your backend URL
        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        setName(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);
  useEffect(() => {
    localStorage.setItem("profilePicture", profilePicture);
    localStorage.setItem("resume", resume);
  }, [profilePicture, resume]);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setResume(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex-1 p-4">
      <div className="mt-6  bg-gray-700 text-white rounded-lg border shadow-sm w-full max-w-2xl mx-auto">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="tracking-tight text-2xl font-bold">Your Profile</h3>
        </div>
        <div className="p-6 pt-0">
          <form className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <span className="bg-gray-600 relative flex shrink-0 overflow-hidden rounded-full h-32 w-32">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="rounded-full h-32 w-32 object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">P</span>
                )}
              </span>
              <div className="flex items-center space-x-2">
                <input
                  className="hidden"
                  accept="image/*"
                  id="profile-picture"
                  type="file"
                  onChange={handleProfilePictureUpload}
                />
                <label className="bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer bg-primary text-white px-4 py-2 rounded" htmlFor="profile-picture">
                  Upload Picture
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <input
                className="bg-gray-600 border rounded px-3 py-2 w-full"
                id="name"
                disabled
                value={name}
              />
            </div>
            <div className="space-y-2">
              <label className=" text-sm font-medium" htmlFor="email">Email</label>
              <input
                className="bg-gray-600 border rounded px-3 py-2 w-full"
                id="email"
                disabled
                value={email} // Updated to use fetched email
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="resume">Resume</label>
              <div className="flex items-center space-x-2">
                <input
                  className="hidden"
                  accept=".pdf"
                  id="resume"
                  type="file"
                  onChange={handleResumeUpload}
                />
                <label className="  bg-gradient-to-r from-cyan-500 to-blue-500
 cursor-pointer bg-secondary text-white px-4 py-2 rounded ml-0" htmlFor="resume">
                  Upload Resume
                </label>
                {/*{resume && <a href={resume} download="resume.pdf" className="text-blue-500 underline">View Resume</a>}*/}
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-bl from-violet-500 to-fuchsia-500
 my-2 w-full  px-8 rounded-2xl py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

            >
                 Update Profile
            </button>
          </form>
        </div>
      </div>
      <div className="bg-gray-800"></div>

    </div>
  );
};

export default Profile;
