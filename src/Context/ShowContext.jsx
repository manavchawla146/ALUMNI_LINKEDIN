// src/context/showProfile.jsx
import React, { useState, createContext } from 'react';

// Create a Context for the showProfile state
export const ShowContext = createContext();

// Provider component to wrap the part of your app that needs access to showProfile state
export const ShowProvider = ({ children }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [postType, setPostType] = useState();
    // 1. normal post   2.ss   3.job 

    return (
        <ShowContext.Provider value={{ showProfile, setShowProfile, showCreatePost, setShowCreatePost,postType, setPostType}}>
            {children}
        </ShowContext.Provider>
    );
};