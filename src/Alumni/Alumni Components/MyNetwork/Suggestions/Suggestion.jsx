import React from 'react';
import {app} from '../../../../firebase';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
const db = getFirestore(app)
const localuser = localStorage.getItem('userData');
const userData = JSON.parse(localuser);
// Generate a random alphanumeric string
function randomAlphaNumeric(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Suggestion = ({ data }) => {
  console.log(data.fullName)
  // Handle the connect action
  const connect = async (uid) => {
    try {
      const id = randomAlphaNumeric(10);
      const connectionRef = collection(db, 'connections');
      const connectionDoc = doc(connectionRef, id);
      const localUser = localStorage.getItem('userData');
      const userData = JSON.parse(localUser);

      await setDoc(connectionDoc, {
        fromid: userData.uid,
        toid: data.uid,
        // frompic: userData.profileImage,
        fromname: userData.fullName,
        toname: data.fullName,
        // topic: data.,
        connectionid: id,
        accepted: false
      });

      console.log('Connection request sent successfully.');
    } catch (error) {
      console.error('Error sending connection request: ', error);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-64 relative" style={{ display: 'inline-block', marginLeft: '1vw', marginBottom: '1vw' }}>
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200">
        {/* Add any functionality for this button if needed */}
      </button>
      <div className="flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-full border-4 border-gray-700"
          src={data.profilePic || "https://placehold.co/80x80"}
          alt={`Profile picture of ${data.name}`}
        />
        <h2 className="mt-4 text-lg font-semibold">{data.name || "Name"}</h2>
        <p className="text-sm text-gray-400 text-center">
          Attended {data.institution || "Institution"} -
        </p>
        <div className="flex items-center mt-2">
          <i className="fas fa-university text-gray-400"></i>
          <p className="ml-2 text-sm text-gray-400">
            {data.institution || "Institution"} - {data.country || "Country"}
          </p>
        </div>
        <button 
          onClick={() => connect(data)} 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full flex items-center"
        >
          <i className="fas fa-user-plus mr-2"></i> Connect
        </button>
      </div>
    </div>
  );
};

export default Suggestion;