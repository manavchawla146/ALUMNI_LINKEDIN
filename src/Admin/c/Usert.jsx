import React, { useEffect, useState } from 'react';
import { app } from '../../firebase'; // Adjust the import path as necessary
import { getFirestore, collection, getDocs, deleteDoc,doc } from 'firebase/firestore'; // Import necessary Firestore functions

const db = getFirestore(app);

const Usert = () => {
  const localuser = localStorage.getItem('userData');
  const userData = JSON.parse(localuser);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Get the users collection reference
        const snapshot = await getDocs(usersCollection); // Fetch documents from the collection
        const usersList = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.uid !== userData.uid); // Exclude current user
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }); // Correct dependency

  const handleBan = async(userId) => {
    // Handle the ban logic here
    const userref = collection(db,"users");
    const userDoc = doc(userref,userId);
    await deleteDoc(userDoc)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Role</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-3 px-6 text-gray-800">{user.fullName}</td>
                <td className="py-3 px-6 text-gray-600">{user.role}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleBan(user.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usert;
