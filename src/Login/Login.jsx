import React, { useState } from 'react'; 
import './Login.css'; 
import googleIcon from '../images/google.png'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { app } from '../firebase'; 
import { collection, getFirestore, query, getDocs, where } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';
const auth=getAuth(app);
const db=getFirestore(app);
const userRef=collection(db,'users');

const Login = () => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); // <-- Move useNavigate inside the component
 
  const handleEmailChange = (e) => { 
    setEmail(e.target.value); 
  }; 
 
  const handlePasswordChange = (e) => { 
    setPassword(e.target.value); 
  }; 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      await signInWithEmailAndPassword(auth, email, password); 
      alert('Login Successful'); 
      navigate('/alumni');
      const querySnapshot = await getDocs(query(userRef, where('email', '==', email))); 
      if (!querySnapshot.empty) { 
        const queryData = querySnapshot.docs[0].data(); 
        const userId = querySnapshot.docs[0].id; 
 
        // Store user data in localStorage 
        localStorage.setItem('userData', JSON.stringify(queryData)); 
         
        // Redirect based on role (You can replace this with custom logic) 
      } 
    } catch (error) { 
      console.error("Error logging in: ", error); 
      alert('Login Failed'); 
    } 
  }; 
 
  return ( 
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
      <div className="login-form"> 
        <h2>Login</h2> 
        <form onSubmit={handleSubmit}> 
          <div className="form-group"> 
            <input  
              type="email"  
              placeholder='Email'  
              value={email}  
              onChange={handleEmailChange}  
              required  
            /> 
          </div> 
          <div className="form-group"> 
            <input  
              type="password"  
              placeholder='Password'  
              value={password}  
              onChange={handlePasswordChange}  
              required  
            /> 
          </div> 
          <button className='forget'>Forgot Password?</button> 
          <button type="submit" className='login'>Login</button> 
        </form> 
        <p className="info-text">Don't have an account? <button className="register-btn" onClick={()=>navigate('/register')}>Register Now</button></p> 
        <p className='or'>OR</p> 
        <button className='google'> 
          <img src={googleIcon} alt="Google" className="google-icon" /> 
          Continue With Google 
        </button> 
      </div> 
    </div> 
  ); 
}; 
 
export default Login;
