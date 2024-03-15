import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import "../styles/ChatRoom.css";
import Header from '../components/Header';
import useLocalStorage from 'use-local-storage';

var stompClient = null;

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDark", false); // Add dark mode state

    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    // Load username and chat history from session storage on component mount
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        const storedChatHistory = sessionStorage.getItem('chatHistory');
        if (storedUsername) {
            setUserData(prevUserData => ({ ...prevUserData, username: storedUsername, connected: true }));
        }
        if (storedChatHistory) {
            const { publicChats: storedPublicChats, privateChats: storedPrivateChats } = JSON.parse(storedChatHistory);
            setPublicChats(storedPublicChats);
            setPrivateChats(new Map(storedPrivateChats));
        }
    }, []);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (userData.connected) {
            connect();
        }
    }, [userData.connected]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                setPublicChats(prevPublicChats => {
                    const updatedPublicChats = [...prevPublicChats, payloadData];
                    sessionStorage.setItem('chatHistory', JSON.stringify({ publicChats: updatedPublicChats, privateChats: [...privateChats] }));
                    return updatedPublicChats;
                });
                break;
        }
    }
    
    

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
        sessionStorage.setItem('chatHistory', JSON.stringify({ publicChats, privateChats: [...privateChats] }));
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        sessionStorage.setItem('username', userData.username);
        setUserData(prevUserData => ({ ...prevUserData, connected: true }));
    }

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <div className="ChatRoom-App">
                <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                <div className="container">
                    {userData.connected ?
                        <div className="chat-box">
                            <div className="member-list">
                                <ul>
                                    <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                                    {[...privateChats.keys()].map((name, index) => (
                                        <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                            {tab === "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {publicChats.map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                                </div>
                            </div>}
                            {tab !== "CHATROOM" && <div className="chat-content">
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                                </div>
                            </div>}
                        </div>
                        :
                        <div className="register">
                            <input
                                id="user-name"
                                placeholder="Enter your name"
                                name="userName"
                                value={userData.username}
                                onChange={handleUsername}
                                margin="normal"
                            />
                            <button className='enterUsername-button' type="button" onClick={registerUser}>
                                connect
                            </button>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default ChatRoom;
