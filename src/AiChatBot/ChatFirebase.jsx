import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, query, onSnapshot, orderBy, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

function ChatFirebase() {
    const [recentChats, setRecentChats] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatPopupOpen, setIsChatPopupOpen] = useState(false); // Toggle chat popup
    const [isUserListOpen, setIsUserListOpen] = useState(true); // Open user list popup by default

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setCurrentUser(parsedUserData); // Now currentUser will have the user's info
            fetchRecentChats(parsedUserData.uid);
            fetchAllUsers();
        } else {
            console.error("User data not found in localStorage");
        }
    }, []);

    useEffect(() => {
        if (recentChats.length > 0) {
            // Automatically open chat with the first recent chat if available
            openChat(recentChats[0]);
        }
    }, [recentChats]);

    // Fetch the list of recently chatted users
    const fetchRecentChats = (currentUserId) => {
        const recentChatsRef = query(
            collection(db, `recentChats/${currentUserId}/chats`),
            orderBy('timestamp', 'desc')
        );

        onSnapshot(recentChatsRef, (snapshot) => {
            const loadedRecentChats = snapshot.docs.map(doc => doc.data());
            setRecentChats(loadedRecentChats);
        });
    };

    // Fetch all users from the Firestore database
    const fetchAllUsers = () => {
        const usersRef = collection(db, 'users');

        onSnapshot(usersRef, (snapshot) => {
            const loadedUsers = snapshot.docs.map(doc => doc.data());
            console.log(loadedUsers);
            setAllUsers(loadedUsers);
        });
    };

    // Open chat popup with selected user
    const openChat = (user) => {
        if (currentUser) {
            if (user.uid !== currentUser.uid) {
                setSelectedUser(user);
                setIsChatPopupOpen(true);
                fetchChatMessages(user.uid);
            } else {
                console.error("User cannot chat with themselves");
            }
        } else {
            console.error("Current user is not set");
        }
    };

    // Fetch chat history between the current user and the selected user
    const fetchChatMessages = (partnerId) => {
        if (currentUser) {
            const chatRef = query(
                collection(db, `messages/${currentUser.uid}_${partnerId}/chats`),
                orderBy('timestamp', 'asc')
            );

            onSnapshot(chatRef, (snapshot) => {
                const loadedMessages = snapshot.docs.map(doc => doc.data());
                setChatMessages(loadedMessages);
            });
        } else {
            console.error("Current user is not set");
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim() || !selectedUser || !currentUser) return;

        const newMessage = {
            senderId: currentUser.uid,
            receiverId: selectedUser.uid,
            text: userInput,
            timestamp: Date.now(),
        };

        try {
            setIsLoading(true);

            // Add message to both sender's and receiver's chat collections
            const chatRef = doc(db, `messages/${currentUser.uid}_${selectedUser.uid}/chats`, newMessage.timestamp.toString());
            const partnerChatRef = doc(db, `messages/${selectedUser.uid}_${currentUser.uid}/chats`, newMessage.timestamp.toString());

            await setDoc(chatRef, newMessage);
            await setDoc(partnerChatRef, newMessage); // Mirror the message in the partner's chat

            // Update recent chats for both users
            const currentUserRecentRef = doc(db, `recentChats/${currentUser.uid}/chats`, selectedUser.uid);
            const partnerRecentRef = doc(db, `recentChats/${selectedUser.uid}/chats`, currentUser.uid);

            await setDoc(currentUserRecentRef, {
                partnerId: selectedUser.uid,
                partnerUsername: selectedUser.fullName,
                lastMessage: userInput,
                timestamp: Date.now()
            });

            await setDoc(partnerRecentRef, {
                partnerId: currentUser.uid,
                partnerUsername: currentUser.fullName, // Using fullName from localStorage
                lastMessage: userInput,
                timestamp: Date.now()
            });

        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setIsLoading(false);
            setUserInput('');
        }
    };

    const toggleUserListPopup = () => {
        setIsUserListOpen(!isUserListOpen);
        fetchAllUsers();
    };

    const closeChatPopup = () => {
        setIsChatPopupOpen(false);
    };

    // Filter out users that have already been chatted with
    const otherUsers = allUsers.filter(
        user => !recentChats.some(chat => chat.partnerId === user.uid)
    );

    return (
        <div>
            {/* <!-- Open User List Button --> */}
            <button 
                className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleUserListPopup}
            >
                Chat
            </button>
        
            {/* User List Popup */}
            {isUserListOpen && (
                <div className="absolute top-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-w-xs w-full mt-5 mr-5">
                    <div className="bg-blue-600 text-white p-2.5 flex justify-between items-center">
                        <h3 className="text-lg">Recently Chatted Users</h3>
                    </div>
                    <ul className="list-none p-0 m-0">
                        {recentChats.map((chat) => (
                            <li 
                                key={chat.partnerId} 
                                onClick={() => openChat({ uid: chat.partnerId, fullName: chat.partnerUsername })}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {chat.partnerUsername} (Last Message: {chat.lastMessage})
                            </li>
                        ))}
                    </ul>
        
                    <div className="bg-blue-600 text-white p-2.5 flex justify-between items-center">
                        <h3 className="text-lg">All Users</h3>
                    </div>
                    <ul className="list-none p-0 m-0">
                        {otherUsers.map(user => (
                            <li 
                                key={user.uid} 
                                onClick={() => openChat(user)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {user.fullName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        
            {/* Chat Popup */}
            {isChatPopupOpen && selectedUser && (
                <div className="fixed bottom-5 right-5 w-80 max-h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
                    <div className="bg-blue-600 text-white p-2.5 flex justify-between items-center">
                        <h2 className="text-lg">Chat with {selectedUser.fullName}</h2>
                        <button 
                            className="bg-transparent text-white text-xl focus:outline-none"
                            onClick={closeChatPopup}
                        >
                            X
                        </button>
                    </div>
        
                    <div className="flex-grow p-2.5 bg-gray-100 overflow-y-auto flex flex-col">
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message p-2.5 rounded-lg text-sm leading-relaxed mb-1 ${
                                    msg.senderId === currentUser?.uid
                                        ? 'bg-blue-600 text-white self-end text-right rounded-br-none'
                                        : 'bg-gray-300 text-black self-start text-left rounded-bl-none'
                                }`}
                            >
                                <p>{msg.text} <span>{new Date(msg.timestamp).toLocaleTimeString()}</span></p>
                            </div>
                        ))}
                        {isLoading && <div className="text-center text-sm text-gray-600 mt-2">Loading...</div>}
                    </div>
        
                    <div className="bg-white border-t border-gray-300 p-2.5 flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={handleInputChange}
                            className="flex-grow px-2.5 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                        />
                        <button 
                            onClick={sendMessage} 
                            disabled={isLoading || !selectedUser}
                            className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatFirebase;
