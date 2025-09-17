import React, { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import * as pdfjs from "pdfjs-dist";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./Ask.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const location = useLocation();
    const { pdfUrl } = location.state || {};
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const currentAudioRef = useRef(null); // To track the currently playing audio

    const stopCurrentAudio = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0; // Reset playback position
            currentAudioRef.current = null; // Clear reference
        }
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, user: true }];
            setMessages(newMessages);
            setInput("");

            try {
                setLoading(true);
                const response = await axios.post("https://res-1-7uph.onrender.com/ask", {
                    query: input,
                });
                const botResponse = response.data.response;
                setMessages([...newMessages, { text: botResponse, user: false }]);

                // Play the response as audio
                /*stopCurrentAudio(); // Stop any current audio
                const audioUrl = `http://127.0.0.1:5000${response.data.audio}`;
                const audio = new Audio(audioUrl);
                currentAudioRef.current = audio; // Track the current audio
                audio.play();*/
            } catch (error) {
                console.error("Error sending message:", error);
                setMessages([
                    ...newMessages,
                    { text: "Error: Could not get a response from the bot.", user: false },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleVoiceRecord = () => {
        if (!isRecording) {
            stopCurrentAudio(); // Stop any playing audio when recording starts
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            audioChunks.current.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = handleVoiceSend;
                    audioChunks.current = [];
                    mediaRecorder.start();
                    setIsRecording(true);
                })
                .catch((err) => console.error("Error accessing microphone:", err));
        } else {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleVoiceSend = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob);

        try {
            setLoading(true);
            const response = await axios.post("https://res-1-7uph.onrender.com/voice", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const userMessage = response.data.userMessage;
            const botResponse = response.data.response;
            const audioUrl = `https://res-1-7uph.onrender.com${response.data.audio}`;

            setMessages([
                ...messages,
                { text: userMessage, user: true },
                { text: botResponse, user: false },
            ]);

            // Play the bot's response audio
            stopCurrentAudio(); // Stop any current audio
            const audio = new Audio(audioUrl);
            currentAudioRef.current = audio;
            audio.play();
        } catch (error) {
            console.error("Error processing voice message:", error);
            setMessages([
                ...messages,
                { text: "Error: Could not process the voice message.", user: false },
            ]);
        } finally {
            setLoading(false);
        }
    };

    pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/workers/pdf.worker.min.js`;
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            toolbarItems: (toolbarItems) => {
                return toolbarItems.filter((item) => item.key !== "open");
            },
        },
    });

    return (
        <div className="flex h-screen">
            <div className="w-[45%] h-full bg-gray-100 p-4 overflow-auto">
                {pdfUrl ? (
                    <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>
                ) : (
                    <p>No resume uploaded.</p>
                )}
            </div>
            <div className="flex flex-col justify-between w-[55%] h-screen bg-gray-900">
                <h1 className="text-2xl font-bold
 text-center text-white drop-shadow-lg">
                    Resume ChatBot
                </h1>
                <h1 className="text-center text-white">Enhance your Career</h1>
                <div className="mb-4">
        <hr className="border-t border-white" />
    </div>
                <div className=" pl-3  bg-gray-900 flex flex-col justify-between h-[calc(100%-4rem)] w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden"
                 >
                    <div className="rounded-lg  bg-gray-900 flex-1 p-8 pl-8 pt-8 pb-8 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`text-white flex ${msg.user ? "justify-end" : "justify-start"} mb-4` }
                            >
                                <div
                                    className={`text-white rounded-lg p-2 shadow-md flex-wrap ${
                                        msg.user ? " text-white" : "bg-gray-700 text-white"
                                        
                                    }`
                                    
                                }
                                style={{
                                    maxWidth: "70%", // Adjust the maximum width of the response box
                                    wordWrap: "break-word", // Ensure long text wraps properly
                                  backgroundColor:  msg.user ? "#2563eb" : "bg-gray-700 "
                                    
                                
                                }}
                                >
                                     
                                    <ReactMarkdown  className="text-white text-base text-3xl" // Apply a consistent text style
                                        // Ensure compatibility with Markdown features
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p className="text-white" {...props} />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong className="font-bold text-white" {...props} />
                                            ),
                                            em: ({ node, ...props }) => (
                                                <em className="italic text-white" {...props} />
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-gray-800 p-1 rounded text-white" {...props} />
                                            ),
                                        }}
                                    >
                                        {msg.text}</ReactMarkdown>
                                   
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="wrapper flex justify-center items-center">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="shadow"></div>
                                <div className="shadow"></div>
                                <div className="shadow"></div>
                                <span>Loading</span>
                            </div>
                        )}
                    </div>
                    </div>
                    <div  className="p-4 border-t border-gray-200 flex items-center">
                        <input
                            type="text"
                            className="bg-gray-700 flex-1 p-2 border border-blue-300 rounded-lg outline-none"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                            onClick={handleSendMessage}
                           
                        >
                            
                            
                            <FaPaperPlane />
                        </button>
                        <button
    className={`ml-2 p-2 rounded-lg ${
        isRecording ? "bg-red-500" : "bg-gray-500"
    } text-white transition-all`}
    onClick={handleVoiceRecord}
>
    <FaMicrophone />
</button>
                    </div>
                </div>
            
        </div>
    );
};
export default Chatbot;
