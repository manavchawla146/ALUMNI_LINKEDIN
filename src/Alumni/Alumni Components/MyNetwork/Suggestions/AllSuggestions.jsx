import React, { useEffect, useState } from 'react';
import Suggestion from './Suggestion';
import { collection, query, where, getDocs, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '../../../../firebase'; // Adjust the import based on your project structure

const db = getFirestore(app);

const AllSuggestions = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const localuser = localStorage.getItem('userData');
    const userData = JSON.parse(localuser);
    const connectionsRef = collection(db, 'connections');
    const usersRef = collection(db, 'users'); // Assume you have a 'users' collection

    const fromIdQuery = query(
      connectionsRef,
      where('fromid', '==', userData.uid),
      where('accepted', '==', true)
    );

    const toIdQuery = query(
      connectionsRef,
      where('toid', '==', userData.uid),
      where('accepted', '==', true)
    );

    // Real-time listener for connections
    const unsubscribeFrom = onSnapshot(fromIdQuery, (snapshot) => {
      const fromConnections = snapshot.docs.map(doc => doc.data().toid);
      setConnectedUsers(prev => [...new Set([...prev, ...fromConnections])]);
    });

    const unsubscribeTo = onSnapshot(toIdQuery, (snapshot) => {
      const toConnections = snapshot.docs.map(doc => doc.data().fromid);
      setConnectedUsers(prev => [...new Set([...prev, ...toConnections])]);
    });

    // Cleanup function to unsubscribe from real-time listeners
    return () => {
      unsubscribeFrom();
      unsubscribeTo();
    };
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const fetchNonConnectedUsers = async () => {
      const localuser = localStorage.getItem('userData');
      const userData = JSON.parse(localuser);
      const usersRef = collection(db, 'users');

      const usersSnapshot = await getDocs(usersRef);
      const allUsers = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSuggestions(allUsers.filter(user => !connectedUsers.includes(user.uid) && user.uid !== userData.uid));
    };

    fetchNonConnectedUsers();
  }, [connectedUsers]); // Dependency on connectedUsers

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '90vw', margin: '10vh auto' }}>
      <h1 style={{ margin: '1rem 3rem' }}>People you may know</h1>
      <input
        type="text"
        placeholder="Search connections"
        className="bg-gray-700 text-black p-2 rounded focus:outline-none"
        value={searchQuery} // Bind search term to input
        onChange={(e) => setSearchQuery(e.target.value)} // Update search term on input change
      />
      {filteredSuggestions.map(suggestion => (
        <Suggestion key={suggestion.id} data={suggestion} />
      ))}
    </div>
  );
};

export default AllSuggestions;