import React, { useEffect, useState } from 'react';
import Connection from './Connection';
import { useNavigate } from 'react-router-dom';
import { query, where, onSnapshot, collection, getFirestore } from 'firebase/firestore';
import { app } from '../../../../firebase'; // Adjust according to your Firebase config location
import AllSuggestions from '../Suggestions/AllSuggestions';

const db = getFirestore(app);

const AllConnections = () => {
    const navigate = useNavigate();
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const localuser = localStorage.getItem('userData');
        const userData = JSON.parse(localuser);
        const connectionsRef = collection(db, 'connections');

        // Query for connections where fromid == userId and accepted == true
        const fromIdQuery = query(
            connectionsRef,
            where('fromid', '==', userData.uid),
            where('accepted', '==', true)
        );

        // Query for connections where toid == userId and accepted == true
        const toIdQuery = query(
            connectionsRef,
            where('toid', '==', userData.uid),
            where('accepted', '==', true)
        );

        // Combine both queries and listen for real-time updates
        const unsubscribeFrom = onSnapshot(fromIdQuery, (snapshot) => {
            const fromConnections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setConnections(prev => [...prev, ...fromConnections]);
        });

        const unsubscribeTo = onSnapshot(toIdQuery, (snapshot) => {
            const toConnections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setConnections(prev => [...prev, ...toConnections]);
        });

        return () => {
            unsubscribeFrom();
            unsubscribeTo();
        };
    }, []);

    // Filter connections based on the search query
    useEffect(() => {
        if (searchQuery === '') {
            // Show all connections if search query is empty
            setFilteredConnections(connections);
        } else {
            // Filter connections when there is a search query
            const filtered = connections.filter(connection => {
                // Assuming connections have 'fromname' and 'toname' fields to search by
                return connection.fromname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       connection.toname.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredConnections(filtered);
        }
    }, [searchQuery, connections]);

    return (
        <div>
            <div style={{ height: '50vh', overflow: 'scroll', overflowX: 'hidden', width: '85vw', margin: 'auto', marginTop: '7rem' }}>
                <div className="bg-white" style={{ width: '85vw', margin: '3vh auto' }}>
                    <nav className="bg-white p-4">
                        <div className="flex space-x-8">
                            <div className="relative" onClick={() => navigate('/alumni/myNetwork/invitations')}>
                                <span className="text-teal-400 font-semibold">Invitations</span>
                            </div>
                            <div onClick={() => navigate('/alumni/myNetwork/connections')}>
                                <span className="text-gray-400">My Connections</span>
                            </div>
                        </div>
                    </nav>
                    <input
                        type="text"
                        placeholder="Search connections"
                        className="bg-gray-700 text-black p-2 rounded focus:outline-none"
                        value={searchQuery} // Bind search term to input
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search term on input change
                    />
                </div>

                {/* Render connections (filtered or all based on search query) */}
                <div>
                    {filteredConnections.map((connection) => (
                        <Connection key={connection.id} connection={connection} />
                    ))}
                </div>
            </div>
            <AllSuggestions />
        </div>
    );
};

export default AllConnections;