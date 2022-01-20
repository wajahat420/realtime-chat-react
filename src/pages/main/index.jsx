import {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

import Contacts from "../../components/contacts"
import Body from "../../components/body"

const REACT_APP_API_URL = "http://localhost:5000"


const Main = () => {

    const loggedUserdID = "1"
    const [activeChat, setActiveChat] = useState({})
    const [realTimeMsg, setRealTimeMsg] = useState({})

    useEffect(()=>{
        // const socket = socketIOClient(process.env.REACT_APP_API_URL);
        // socket.on("messages", (data) => setLastMessage(data));
        const socket = socketIOClient(REACT_APP_API_URL);
        socket.emit("connected", loggedUserdID)

        socket.on("message", (data) => setRealTimeMsg(data));
        socket.on("getUsers", (data) => {
            const find = data.findIndex(elem => elem.userId == activeChat.id)
            console.log("find", find, data);
            console.log("activeChat", activeChat);
            if(find == -1){
                setActiveChat({...activeChat, status : "offline"})
            }else{
                setActiveChat({...activeChat, status : "online"})
            }
        });

        
    }, [])

    return(
        <div className="container">
            <div className="main">
                <div className="box">
                    <div className="main_left">
                        <Contacts setChat={(user) => setActiveChat(user)}/>
                    </div>
                    <div className="main_right">
                        <Body realTimeMsg={realTimeMsg} activeChat={activeChat}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main