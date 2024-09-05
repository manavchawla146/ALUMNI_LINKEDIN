import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Video from '../../assets/tatti.mp4';
import chatBot from '../../assets/pngegg.png'
function AiChatBot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  // State to toggle popup
    const videoRef = useRef(null);

    useEffect(() => {
        const hasPlayed = localStorage.getItem('videoPlayed');

        if (!hasPlayed && videoRef.current) {
            videoRef.current.play();
            localStorage.setItem('videoPlayed', 'true');
        }
    }, []);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessage = { sender: 'user', text: userInput };
        setMessages([...messages, newMessage]);
        setIsLoading(true);

        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCywA4XfhzAuvm3KZEN619DAT362fb9aZg",
                method: "post",
                data: {
                    "contents": [
                        {
                            "parts": [
                                { "text": userInput }
                            ]
                        }
                    ]
                }
            });

            const aiResponse = response.data.candidates[0].content.parts[0].text;

            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: aiResponse }]);
        } catch (error) {
            console.error("Error fetching AI response", error);
        } finally {
            setIsLoading(false);
        }

        setUserInput('');
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-0 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={togglePopup}
                    style={{ background: 'transparent', border: 'none' }}
                >
                   <img src={chatBot} alt="" style={{width:'5rem'}} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-4 right-4 w-80 max-h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">AI ChatBot</h2>
                        <button
                            className="text-white text-lg font-semibold"
                            onClick={togglePopup}
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white self-end text-right' : 'bg-gray-300 text-black self-start text-left'}`}
                            >
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        {isLoading && <div className="text-center text-gray-600 mt-2">Loading...</div>}
                    </div>

                    <div className="bg-white border-t border-gray-300 p-2 flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={handleInputChange}
                            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors duration-200"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AiChatBot;
