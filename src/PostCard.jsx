import React from 'react';

const PostCard = ({ post, userLikes, userSaves, handleLike, handleSave }) => (
    <div key={post.id} className="mb-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
            <img
                src="https://placehold.co/50x50"
                alt="Profile picture"
                className="w-12 h-12 rounded-full"
            />
            <div>
                <h2 className="text-lg font-bold">{post.userid}</h2>
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
                            className="w-full h-full object-cover rounded-lg"
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
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-500"
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

export default PostCard;
