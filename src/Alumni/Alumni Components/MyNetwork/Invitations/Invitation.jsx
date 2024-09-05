import React from 'react';
import { FiUserX } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { doc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../../firebase'; // Adjust based on your actual Firebase import
const db = getFirestore(app)

const Invitation = ({ data }) => {
  console.log("Mayank 3");
  console.log(data);

  const accept = async (connectionId) => {
    try {
      const connectionRef = doc(db, "connections", connectionId);
      await updateDoc(connectionRef, {
        accepted: true
      });
      console.log("Connection accepted:", connectionId);
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
  };

  const reject = async (connectionId) => {
    try {
      const connectionRef = doc(db, "connections", connectionId);
      await deleteDoc(connectionRef);
      console.log("Connection rejected and deleted:", connectionId);
    } catch (error) {
      console.error("Error rejecting connection:", error);
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-300">
      <div className="ml-4 flex-grow">
        <div className="flex items-center">
          <span className="font-semibold text-gray-900">{data.fromname}</span>
          {/* Add other details if necessary */}
        </div>
        <div className="text-gray-500 text-sm mt-1">
          <i className="fas fa-link"></i> {data.topic} and others
        </div>
      </div>
      <div className="flex items-center">
        <button className="text-red-500 font-semibold mr-4" onClick={() => reject(data.connectionid)}>
          <FiUserX />
        </button>
        <button className="bg-blue-500 text-white font-semibold px-8 py-2 rounded" onClick={() => accept(data.connectionid)}>
          <FaUserCheck />
        </button>
      </div>
    </div>
  );
};

export default Invitation;