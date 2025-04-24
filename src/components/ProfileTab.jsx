import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function ProfileTab() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const studentID = "S12345678";
  const email = "john.doe@university.edu";

  useEffect(() => {
    const savedName = localStorage.getItem('fullName');
    const savedPic = localStorage.getItem('profilePic');
    if (savedName) setFullName(savedName);
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('fullName', fullName);
    if (profilePic) localStorage.setItem('profilePic', profilePic);
    alert("Profile changes saved locally!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Profile Information</h2>
      <p className="text-gray-600 mb-4">Update your account information</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Profile Picture */}
        <div>
          <div className="relative flex items-center mb-2">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden relative">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
              
              <label className="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow">
                <FontAwesomeIcon icon={faPen} className="text-xs text-[#0F766EFF]" />
                <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="full-name" className=" text-gray-700 text-sm font-bold mb-2 flex items-center justify-between">
            Full Name
            <FontAwesomeIcon icon={faPen} className="text-xs text-[#0F766EFF]" />
          </label>
          <input type="text" id="full-name" value={fullName}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFullName(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="student-id" className="block text-gray-700 text-sm font-bold mb-2">
            Student ID
          </label>
          <input type="text" id="student-id" value={studentID} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"/>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input type="email" id="email" value={email} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"/>
          <p className="text-gray-500 text-xs italic">Your school email cannot be changed</p>
        </div>
      </div>

      <button onClick={handleSave} className="bg-[#0F766EFF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Changes
      </button>
    </div>
  );
}

export default ProfileTab;
