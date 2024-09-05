import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaTh } from "react-icons/fa";
import { ShowContext } from "../../../Context/ShowContext";
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/logo.jpg'
const Navbar = () => {
  const [isPostDropdownVisible, setIsPostDropdownVisible] = useState(false);
  const [isMoreDropdownVisible, setIsMoreDropdownVisible] = useState(false);
  const { setShowCreatePost, setPostType } = useContext(ShowContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Initialize as null

  // Function to update user data from localStorage
  const updateUserData = () => {
    const localuser = localStorage.getItem('userData');
    if (localuser) {
      setUserData(JSON.parse(localuser));
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  // Handle user data changes on localStorage update
  useEffect(() => {
    // Set up an event listener for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'userData') {
        updateUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleNormalPost = () => {
    setShowCreatePost(true);
    setPostType(1);
  };

  const handleJobPost = () => {
    setShowCreatePost(true);
    setPostType(2);
  };

  // Safe check if userData is defined and has the role property
  const canCreatePost = userData && userData.role === 'alumni';

  return (
    <div className="bg-gray-900 text-gray-300 p-3 flex justify-between items-center fixed top-0 left-0 z-40" style={{ width: '100vw' }}>
      <div className="flex items-center space-x-4">
        <img src={logo} alt="" style={{width:'6rem'}}/>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 text-white p-2 rounded focus:outline-none"
        />
      </div>
      <div className="flex space-x-6 items-center">
        <div className="flex flex-col items-center" onClick={() => navigate('/alumni/')}>
          <FaHome className="text-xl" />
          <span className="text-sm">Home</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/alumni/myNetwork')}
        >
          <FaUserFriends className="text-xl" />
          <span className="text-sm">My Network</span>
        </div>
        <div
          className="relative flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsPostDropdownVisible(true)}
          onMouseLeave={() => setIsPostDropdownVisible(false)}
        >
          {canCreatePost && (
            <>
              <FaBriefcase className="text-xl" />
              <span className="text-sm cursor-pointer">Create Post</span>
              {isPostDropdownVisible && (
                <div className="absolute bg-gray-800 text-white rounded mt-2 w-48">
                  <ul className="flex flex-col p-2">
                    <li
                      className="hover:bg-gray-700 px-2 py-1 cursor-pointer"
                      onClick={handleNormalPost}
                    >
                      Post Anything
                    </li>
                    <li
                      className="hover:bg-gray-700 px-2 py-1 cursor-pointer"
                      onClick={handleJobPost}
                    >
                      Job Post
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col items-center" onClick={() => navigate('/alumni/msg')}>
          <FaCommentDots className="text-xl" />
          <span className="text-sm">Messaging</span>
        </div>
        <div className="relative flex flex-col items-center">
          <FaBell className="text-xl" />
          <span className="text-sm">Notifications</span>
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">25</span>
        </div>
        <div className="flex flex-col items-center" onClick={() => navigate('/alumni/profile')}>
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <span className="text-sm">Me</span>
        </div>
        <div
          className="relative flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsMoreDropdownVisible(true)}
          onMouseLeave={() => setIsMoreDropdownVisible(false)}
        >
          <FaTh className="text-xl" />
          <span className="text-sm">More</span>
          {isMoreDropdownVisible && (
            <div className="absolute bg-gray-800 text-white rounded mt-2 w-48">
              <ul className="flex flex-col p-2">
                <li
                  className="hover:bg-gray-700 px-2 py-1 cursor-pointer"
                  onClick={() => navigate('/alumni/eventOrganize')}
                >
                  Event Organize
                </li>
                <li
                  className="hover:bg-gray-700 px-2 py-1 cursor-pointer"
                  onClick={() => navigate('/alumni/donation')}
                >
                  Donation
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
