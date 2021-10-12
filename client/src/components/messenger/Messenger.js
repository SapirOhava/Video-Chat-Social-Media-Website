import "./messenger.css";
import Conversation from "../conversations/Conversation";
import ChatOnline from "../chatOnline/ChatOnline"
import Message from "../message/Message";
import { connect } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import axios from "axios";

const Messenger = ({ user }) => {

    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();

    //useEffect 1
    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });

    }, [socket]);


    //useEffect 2
    useEffect(() => {
        
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat, socket]);//socket?


    //useEffect 3
    useEffect(() => {
        
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
        })
    }, [user, socket]);
    

    //useEffect 4
    useEffect(() => {
        
        const getConversations = async () => {
            try {
                // get all conversations of the user
                const res = await axios.get("/api/conversations");
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);


    //useEffect 5
    useEffect(() => {

        
        //get all messages in a conversation
        const getMessages = async () => {
            try {
                if (currentChat !== null) {
                    const res = await axios.get(`/api/messages/${currentChat._id}`);
                    setMessages(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat, socket]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post(`/api/messages/`, message, config);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }

    }

    //useEffect 6
    useEffect(() => {
        
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation key={c._id} conversation={c} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message key={m._id} message={m} own={m.sender === user._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                            </div>
                        </>) : (
                        <span className="noConversationText">
                            Open a conversation to start a chat.
                        </span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline
                        onlineUsers={onlineUsers}
                        currentId={user._id}
                        setCurrentChat={setCurrentChat}
                    />
                </div>
            </div>
        </div>

    );
}


const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Messenger);