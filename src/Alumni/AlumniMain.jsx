import React, { useContext, useState } from 'react';
import Navbar from './Alumni Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { ShowContext } from '../Context/ShowContext';
import { app } from '../firebase';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { FaImage, FaVideo, FaTimes } from 'react-icons/fa'; // Import icons
import AiChatBot from '../AiChatBot/AiChatBot';


const db = getFirestore(app);
const storage = getStorage(app);

const AlumniMain = () => {
  const { showCreatePost, setShowCreatePost, postType } = useContext(ShowContext);
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const uploadImages = async () => {
    const uploadPromises = [];

    for (const file of selectedImages) {
      const storageRef = ref(storage, `posts/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
      uploadPromises.push(uploadTask);
    }
    return Promise.all(uploadPromises);
  };

  const addpost = async () => {
    setShowCreatePost(false);
    const imageUrlsArray = await uploadImages();
    const type = isOn ? 'Achievement' : 'Normal';
    function randomAlphaNumeric(length) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    const id = randomAlphaNumeric(10);
    const postRef = collection(db, 'posts');
    const postdoc = doc(postRef, id);
    const localuser = localStorage.getItem('userData');
    const userData = JSON.parse(localuser);
    await setDoc(postdoc, {
      userid: userData.uid,
      postid: id,
      likes: 0,
      description: postContent,
      type,
      imageUrls: imageUrlsArray,
      username:userData.fullName
    });

    alert('Data submitted successfully!');
  }

  const handleFileRead = (files) => {
    const imageFiles = [];
    let videoFile = null;

    for (let file of files) {
      if (file.type.startsWith('image/')) {
        imageFiles.push(file);
      } else if (file.type.startsWith('video/')) {
        videoFile = file;
      }
    }

    if (videoFile) {
      setSelectedVideo(videoFile);
      setSelectedImages([]);
    } else {
      setSelectedImages(imageFiles);
      setSelectedVideo(null);
    }
  };

  const openFileDialog = (fileTypes, multiple = false) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = fileTypes;
    input.multiple = multiple;
    input.style.display = 'none';
    input.onchange = (event) => {
      if (input.files.length > 0) {
        handleFileRead(input.files);
      }
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const openImageFile = () => openFileDialog('.jpg,.jpeg,.png', true);
  const openVideoFile = () => openFileDialog('.mp4,.webm', false);

  return (
    <div>
      <Navbar />
      <AiChatBot />
      <Outlet />
      {showCreatePost && postType === 1 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-4 w-full max-w-3xl">
            <div className="flex items-center">
              <img
                alt="User profile picture"
                className="rounded-full w-10 h-10"
                src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-RcpoXHkzChYnDbFAyeQ8tamr/user-ehrvabJ3DufsCu8YJ7PqY5gl/img-3nMSWqIR9KUnH1tEeOFNiqPO.png"
              />
              <div className="ml-2 flex justify-between w-full">
                <p className="font-semibold text-white">Mayur Lalchandani</p>
                <button onClick={() => setShowCreatePost(false)}>
                  <FaTimes className="text-white" />
                </button>
              </div>
            </div>
            <textarea
              className="w-full bg-gray-800 text-white text-lg p-2 border-none focus:outline-none mt-4"
              placeholder="What do you want to talk about/Post?"
              rows="4"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4 text-gray-400">
                <button onClick={openImageFile}>
                  <FaImage className="text-xl cursor-pointer" />
                </button>
                <button onClick={openVideoFile}>
                  <FaVideo className="text-xl cursor-pointer" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center cursor-pointer">
                  <div
                    onClick={() => setIsOn(!isOn)}
                    className={`relative inline-flex items-center w-10 h-6 bg-${isOn ? 'green-500' : 'gray-300'} rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`absolute w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${isOn ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                  </div>
                  <span className="ml-3 text-gray-700">{isOn ? 'On' : 'Off'}</span>
                </label>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={addpost}>
                  Post
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
            <div className="mt-4">
              {selectedVideo && (
                <video
                  controls
                  src={URL.createObjectURL(selectedVideo)}
                  className="w-full rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showCreatePost && postType === 2 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 overflow-auto">
          <div className="relative w-full max-w-lg bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto max-h-[80vh]">
            <div className="flex items-center mb-6">
              <img
                alt="User profile picture"
                className="rounded-full w-12 h-12"
                src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-RcpoXHkzChYnDbFAyeQ8tamr/user-ehrvabJ3DufsCu8YJ7PqY5gl/img-3nMSWqIR9KUnH1tEeOFNiqPO.png"
              />
              <div className="ml-3">
                <div className="font-semibold text-xl">Name</div>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Job Title"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Enter Company Name"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Hybrid / On-Site / Remote"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Full-Time / Part-Time / Internship"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              
              
              <input
                type="text"
                placeholder="Enter Experience Required"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Enter Salary"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="text"
                placeholder="Any Other Info"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Post
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowCreatePost(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AlumniMain;
