import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, increment, updateDoc, doc, setDoc, query, where, deleteDoc } from 'firebase/firestore';
import { app } from '../../../firebase'; // Adjust the import based on your Firebase config location 

const db = getFirestore(app); // Initialize Firestore 

function ResourceLib() {
    const [posts, setPosts] = useState([]);
    const [userLikes, setUserLikes] = useState({});
    const [userSaves, setUserSaves] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, 'posts');
                const postsSnapshot = await getDocs(postsCollection);
                const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsList);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchUserLikes = async () => {
            try {
                const localUser = localStorage.getItem('userData');
                const userData = JSON.parse(localUser);
                if (userData) {
                    const likesQuery = query(collection(db, 'likes'), where('userid', '==', userData.uid));
                    const likesSnapshot = await getDocs(likesQuery);
                    const likedPostsData = likesSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        acc[data.postid] = true;
                        return acc;
                    }, {});
                    setUserLikes(likedPostsData);

                    // Fetch liked posts details 
                    const likedPostsCollection = collection(db, 'posts');
                    const likedPostsSnapshot = await getDocs(query(likedPostsCollection, where('postid', 'in', Object.keys(likedPostsData))));
                    const likedPostsList = likedPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setLikedPosts(likedPostsList);
                }
            } catch (error) {
                console.error('Error fetching user likes:', error);
            }
        };

        const fetchUserSaves = async () => {
            try {
                const localUser = localStorage.getItem('userData');
                const userData = JSON.parse(localUser);
                if (userData) {
                    const savesQuery = query(collection(db, 'saves'), where('userid', '==', userData.uid));
                    const savesSnapshot = await getDocs(savesQuery);
                    const savedPostsData = savesSnapshot.docs.reduce((acc, doc) => {
                        const data = doc.data();
                        acc[data.postid] = true;
                        return acc;
                    }, {});
                    setUserSaves(savedPostsData);

                    // Fetch saved posts details 
                    const savedPostsCollection = collection(db, 'posts');
                    const savedPostsSnapshot = await getDocs(query(savedPostsCollection, where('postid', 'in', Object.keys(savedPostsData))));
                    const savedPostsList = savedPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setSavedPosts(savedPostsList);
                }
            } catch (error) {
                console.error('Error fetching user saves:', error);
            }
        };

        fetchPosts();
        fetchUserLikes();
        fetchUserSaves();
    }, []); // Remove `posts` from dependency array

    console.log(likedPosts);
    console.log(savedPosts);

    const handleSave = async (post) => {
        try {
            const id = randomAlphaNumeric(10);
            const localUser = localStorage.getItem('userData');
            const userData = JSON.parse(localUser);

            if (!userData) return; // Ensure user data is available 

            const isSaved = userSaves[post.id];

            if (isSaved) {
                // Remove save 
                const savesQuery = query(collection(db, 'saves'), where('userid', '==', userData.uid), where('postid', '==', post.id));
                const savesSnapshot = await getDocs(savesQuery);
                const saveDoc = savesSnapshot.docs[0];
                if (saveDoc) {
                    await deleteDoc(doc(db, 'saves', saveDoc.id));
                }
                setUserSaves(prev => ({
                    ...prev, [post.id]: false
                }));
                setSavedPosts(savedPosts.filter(savedPost => savedPost.id !== post.id));
            } else {
                // Save 
                await setDoc(doc(db, 'saves', id), {
                    saveid: id,
                    userid: userData.uid,
                    postid: post.id,
                });
                setUserSaves(prev => ({ ...prev, [post.id]: true }));
                setSavedPosts([...savedPosts, post]);
            }
        } catch (error) {
            console.error('Error handling save:', error);
        }
    };

    const handleLike = async (post) => {
        try {
            const id = randomAlphaNumeric(10);
            const localUser = localStorage.getItem('userData');
            const userData = JSON.parse(localUser);

            if (!userData) return; // Ensure user data is available 

            const isLiked = userLikes[post.id];

            if (isLiked) {
                // Unlike 
                const likesQuery = query(collection(db, 'likes'), where('userid', '==', userData.uid), where('postid', '==', post.id));
                const likesSnapshot = await getDocs(likesQuery);
                const likeDoc = likesSnapshot.docs[0];
                if (likeDoc) {
                    await deleteDoc(doc(db, 'likes', likeDoc.id));
                    await updateDoc(doc(db, 'posts', post.id), {
                        likes: increment(-1)
                    });
                }
                setUserLikes(prev => ({ ...prev, [post.id]: false }));
                setLikedPosts(likedPosts.filter(likedPost => likedPost.id !== post.id));
            } else {
                // Like 
                await setDoc(doc(db, 'likes', id), {
                    likeid: id,
                    userid: userData.uid,
                    postid: post.id,
                });
                await updateDoc(doc(db, 'posts', post.id), {
                    likes: increment(1)
                });
                setUserLikes(prev => ({ ...prev, [post.id]: true }));
                setLikedPosts([...likedPosts, post]);
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    const randomAlphaNumeric = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const PostCard = ({ post }) => (
        <div key={post.id} className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
                <img
                    src="https://placehold.co/50x50"
                    alt="Profile picture"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h2 className="text-lg font-bold">{post.fullName}</h2>
                    <p className="text-sm">{post.description}</p>
                </div>
            </div>

            <div className="mt-4">
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                        {post.imageUrls.map((url, index) => (
                            <img
                            
                                key={index}
                                src={url}
                                alt={`Post image ${index + 1}`}
                                className="w-50 h-full object-cover rounded-lg"
                                
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center space-x-4">
                <button
                    className={`flex items-center space-x-2 ${userLikes[post.id] ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
                    onClick={() => handleLike(post)}
                >
                    <i className={`fas fa-thumbs-up ${userLikes[post.id] ? 'text-blue-500' : 'text-gray-400'}`}></i>
                    <span>{userLikes[post.id] ? 'Liked' : 'Like'}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <i className="far fa-comment"></i>
                    <span>Comment</span>
                </button>
                <button
                    className={`flex items-center space-x-2 ${userSaves[post.id] ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
                    onClick={() => handleSave(post)}
                >
                    <i className={`fas fa-bookmark ${userSaves[post.id] ? 'text-blue-500' : 'text-gray-400'}`}></i>
                    <span>{userSaves[post.id] ? 'Saved' : 'Save'}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <i className="fas fa-paper-plane"></i>
                    <span>Send</span>
                </button>
            </div>
        </div>
    );


    return (
        <div style={{width:'50vw',margin:'auto',marginBottom:'2rem'}}>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Liked Posts</h2>
            {likedPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}

            <h2 className="text-xl font-bold mt-8 mb-4">Saved Posts</h2>
            {savedPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default ResourceLib;
