import React, { useEffect, useRef, useState } from 'react';
import { FaCamera, FaSchool, FaPencilAlt } from 'react-icons/fa';
import { FaEye, FaUsers, FaBookmark } from 'react-icons/fa';


import ResourceLib from './ResourceLib';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
    const navigate = useNavigate();
    const [showSurvey, setShowSurvey] = useState(false);
    const [showResourceLib, setShowResourceLib] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
    const [formData, setFormData] = useState({
        studentId: '',
        about: '',
        currentDegree: '',
        expectedGraduationYear: '',
        interestHobby: '',
    });

    const [userData, setUserData] = useState('');
    useEffect(() => {
        const localuser = localStorage.getItem('userData');

        setUserData(JSON.parse(localuser));
        console.log(userData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfilePic(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    const sectionRef = useRef(null);
    const handleScroll = () => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission
        try {
            const response = await fetch('/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div ref={sectionRef} className="" style={{ backgroundColor: 'white', width: '100vw', height: '100vh', margin: '0', padding: '0', position: 'absolute', left: '0', top: '5rem' }}>
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="w-24 h-24 bg-white-600 rounded-full flex items-center justify-center">
                            <img style={{borderRadius:'50%'}} src="https://media.licdn.com/dms/image/v2/D4D35AQFh3qJQ7oL9-Q/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1707156621975?e=1726131600&v=beta&t=0If9Mnx129ES6O-ECijlEGK7MOv8u3MJOe52XMGQdFM" alt="" />
                        </div>
                        <div className="ml-6">
                            <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                            <p className="text-lg">Student at K.S. School of Business Management - India</p>
                            <p className="text-sm text-gray-400">
                                Ahmedabad, Gujarat, India · <a href="#" className="text-blue-400">Contact info</a>
                            </p>
                            <p className="text-sm text-blue-400 mt-2">64 connections</p>
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-full" onClick={() => setShowSurvey(true)}>Complete profile</button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-full" onClick={() => setShowResourceLib(!showResourceLib)}>ResourceLib</button>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-full border border-gray-600"  onClick={handleScroll}>More</button>
                    </div>
                </div>
                <div className="mt-4 flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <FaSchool className="text-2xl text-gray-400" />
                    </div>
                    <div className="ml-4">
                        <p className="text-lg">K.S. School of Business Management - India</p>
                    </div>
                    <div className="ml-auto">
                        <FaPencilAlt className="text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center" style={{width:'100vw'}}>
                <div className="max-w-sm mx-auto p-4 bg-gray-800 rounded-lg">
                    <h2 className="text-lg font-semibold">Resources</h2>
                    <p className="text-sm text-gray-400 flex items-center">
                        <FaEye className="mr-2" /> Private to you
                    </p>
                    <div className="mt-4">
                        <div className="flex items-start mb-4">
                            <FaUsers className="text-xl mr-4" />
                            <div>
                                <h3 className="text-base font-medium" onClick={() => navigate('/alumni/myNetwork')}>My network</h3>
                                <p className="text-sm text-gray-400">See and manage your connections and interests.</p>
                            </div>
                        </div>
                        <hr className="border-gray-700" />
                        <div className="flex items-start mt-4">
                            <FaBookmark className="text-xl mr-4" />
                            <div>
                                <h3 className="text-base font-medium" onClick={() => setShowResourceLib(!showResourceLib)}>Saved and liked</h3>
                                <p className="text-sm text-gray-400">Keep track of your jobs, courses, and articles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showResourceLib && (<ResourceLib />)}
            {showSurvey && userData.role === 'alumni' && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
                        <h3 className="text-xl mb-4">Upload Your Profile Picture</h3>
                        <div className="flex flex-col items-center mb-4">
                            <img
                                src={profilePic}
                                alt="Profile Picture"
                                className="w-36 h-36 rounded-full border border-gray-300 object-cover mb-4 cursor-pointer"
                                onClick={() => document.getElementById('file-input').click()}
                            />
                            <input
                                type="file"
                                id="file-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <form onSubmit={handleSubmit}>

                            <label className="block mb-2">
                                About :
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Educational Qualification:
                                <input
                                    type="text"
                                    name="eduQual"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Current Degree/Current Job:
                                <input
                                    type="text"
                                    name="currjob"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>
                            <label className="block mb-2">
                                Current College/Current Company:
                                <input
                                    type="text"
                                    name="currcol"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                />
                            </label>

                            <label className="block mb-2">
                                Graduation Year:
                                <input
                                    type="number"
                                    name="expectedGraduationYear"
                                    value={formData.expectedGraduationYear}
                                    onChange={handleChange}
                                    min="1960"
                                    max="2024"
                                    step="1"
                                    className="w-full mt-1 p-2 border rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Interest/Hobby:
                                <textarea
                                    name="interestHobby"
                                    value={formData.interestHobby}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Expertise/Skills:
                                <textarea
                                    name="expertise"
                                    value={formData.interestHobby}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded"
                                    required
                                />
                            </label>
                            <button
                                type="submit"
                                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {showSurvey && userData.role === 'teacher' && (<div><div>
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                <img
                    src={formData.profilePic || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border mb-4"
                    onClick={() => document.getElementById('file-input').click()}
                />
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label className="block mb-2">
                    About :
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Educational Qualification:
                    <input
                        type="text"
                        name="eduQual"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Job Title:
                    <input
                        type="text"
                        name="jobtitle"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Experience:
                    <input
                        type="text"
                        name="experience"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Interest/Hobby:
                    <textarea
                        name="interestHobby"
                        value={formData.interestHobby}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Expertise:
                    <textarea
                        name="expertise"
                        value={formData.interestHobby}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="w-full h-10 bg-green-500 text-white rounded hover:bg-green-400"
                >
                    Submit
                </button>
            </div>
            </div>)}
            {showSurvey && userData.role === 'student' && (<div>
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                <img
                    src={formData.profilePic || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border mb-4"
                    onClick={() => document.getElementById('file-input').click()}
                />
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <label className="block mb-2">
                    About :
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Educational Qualification:
                    <input
                        type="text"
                        name="eduQual"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Current Pursuing Degree:
                    <select
                        name="currentDegree"
                        value={formData.currentDegree}
                        onChange={handleChange}
                        className="w-full h-10 p-2 border rounded"
                    >
                        <option value="">Select your current degree</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="Ph.D.">Ph.D.</option>
                    </select>
                </label>
                <label className="block mb-2">
                    Expected Completion Year:
                    <input
                        type="number"
                        name="expectedGraduationYear"
                        value={formData.expectedGraduationYear}
                        onChange={handleChange}
                        min="2024"
                        max="2029"
                        step="1"
                        required
                        className="w-full h-10 p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Interest/Hobby:
                    <textarea
                        name="interestHobby"
                        value={formData.interestHobby}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </label>
                <label className="block mb-2">
                    Expertise:
                    <textarea
                        name="expertise"
                        value={formData.interestHobby}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="w-full h-10 bg-green-500 text-white rounded hover:bg-green-400"
                >
                    Submit
                </button>
            </div>
            )}

            <ProfileInfo />
        </div>
    );
};

export default Profile;
