import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
 
import InfoBar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('') ;   
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'https://react-chat-messenger-app.herokuapp.com/';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search); //turns location.search containing name and room entry into an object
        
        socket = io(ENDPOINT); //Creates a socket object using ENDPOINT

        setName(name); //sets the state name to be the name of the user
        setRoom(room); //sets the state room to be the room where the user is

        socket.emit('join', { name, room }, () => {
            // alert(error);
        }); //This is used in the server index.js side 
        
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]); //useEffect only runs if ENDPOINT and location.search changes

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', (users) => {
            setUsers(users)
        })
    }, [message]);

   
    

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () =>  setMessage(''));
        }
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;