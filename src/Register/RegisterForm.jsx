import React, { useState } from 'react'; 
import './Register.css'; 
import googleIcon from '../images/google.png'; 
import { app } from '../firebase'; 
import { getFirestore, setDoc, doc } from 'firebase/firestore'; 
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
const db = getFirestore(app); 
const auth = getAuth(app); 

const RegisterForm = () => { 
  // State variables for form inputs 
  const [fullName, setFullName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [role, setRole] = useState(''); // State for role selection
  const navigate = useNavigate();

  // Handle form submission 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 

    // Add form validation logic here (e.g., password matching) 
    if (password !== confirmPassword) { 
      alert('Passwords do not match'); 
      return; 
    } 

    try { 
      const result = await createUserWithEmailAndPassword(auth, email, password); 
      const user = result.user; 
      const { uid } = user; 

      const userdoc = doc(db, 'users', uid); 
      await setDoc(userdoc, { 
        uid, 
        fullName, 
        email, 
        phone, 
        role // Include role in Firestore document
      }); 
      console.log('User registered successfully'); 
      // Optionally, redirect the user or clear the form 
    } catch (error) { 
      console.error('Error registering user:', error); 
    } 
    navigate('/');
  }; 

  return ( 
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100"> 
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> 
        <h2 className="text-2xl font-semibold mb-6">Register</h2> 
        <form onSubmit={handleSubmit}> 
          <div className="mb-4"> 
            <input 
              type="text" 
              placeholder='Full Name' 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div> 
          <div className="mb-4"> 
            <input 
              type="email" 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div> 
          <div className="mb-4"> 
            <input 
              type="tel" 
              placeholder='Phone' 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div> 
          <div className="mb-4"> 
            <input 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div> 
          <div className="mb-6"> 
            <input 
              type="password" 
              placeholder='Confirm Password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
          </div> 
          <div className="mb-6 flex space-x-4"> 
            <button 
              type="button" 
              onClick={() => setRole('student')} 
              className={`w-full py-2 rounded-lg border ${role === 'student' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-300'} hover:bg-blue-600 hover:text-white`}
            >
              Student
            </button> 
            <button 
              type="button" 
              onClick={() => setRole('teacher')} 
              className={`w-full py-2 rounded-lg border ${role === 'teacher' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-300'} hover:bg-blue-600 hover:text-white`}
            >
              Teacher
            </button> 
            <button 
              type="button" 
              onClick={() => setRole('alumni')} 
              className={`w-full py-2 rounded-lg border ${role === 'alumni' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 text-gray-700 border-gray-300'} hover:bg-blue-600 hover:text-white`}
            >
              Alumni
            </button> 
          </div>
          <button type="submit" className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600' >Register</button> 
        </form> 
        <p className="text-center mt-4">Already have an account? <button className="text-blue-500 hover:underline" onClick={()=>navigate('/')}>Login</button></p> 
        <p className='text-center mt-4 text-gray-500'>OR</p> 
        <button className='w-full py-3 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300'>
          <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" /> 
          Continue With Google 
        </button> 
      </div> 
    </div> 
  ); 
}; 

export default RegisterForm;
