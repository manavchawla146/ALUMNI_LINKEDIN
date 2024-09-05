import React, { useState, useEffect } from 'react';
import Invitation from './Invitation';
import AllSuggestions from '../Suggestions/AllSuggestions';
import { useNavigate } from 'react-router-dom';
import { query, where, getDocs, getFirestore, collection } from 'firebase/firestore';
import { app } from '../../../../firebase';

const db = getFirestore(app);
const localuser = localStorage.getItem('userData');
const userData = JSON.parse(localuser);

const AllInvitations = () => {
    const [invitations, setInvitations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const recordsRef = collection(db, 'connections');
                const q = query(
                    recordsRef,
                    where("toid", "==", userData.uid),
                    where("accepted", "==", false)
                );

                const querySnapshot = await getDocs(q);
                const records = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setInvitations(records);
                console.log("Fetched invitations:", records);
            } catch (error) {
                console.error("Error fetching records: ", error);
            }
        };

        fetchInvitations();
    }, );
    console.log("Invitation",invitations)

    return (
        <div>
            <div style={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden', width: '85vw', margin: 'auto', marginTop: '7rem' }}>
                <div className="bg-white">
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
                </div>
                <h1 style={{ margin: '1rem 3rem' }}>All Invitations</h1>
                {invitations.map(invitation => (
                    <Invitation key={invitation.id}  data={invitation} />
                ))}
            </div>
            <AllSuggestions />
        </div>
    );
};

export default AllInvitations;