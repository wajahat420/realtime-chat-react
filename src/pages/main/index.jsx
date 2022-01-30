import {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

import Contacts from "../../components/contacts"
import Body from "../../components/body"
import axios from 'axios';

// const REACT_APP_API_URL = "http://localhost:5000"
const REACT_APP_API_URL = "https://realtimebackend.herokuapp.com"


 let val = ''

const Main = () => {


    let loggedUserEmail = localStorage.getItem("email")
    const userName = loggedUserEmail.split('@')[0]
    // let loggedUserdID = localStorage.getItem("id")
    let loggedUserdID = userName

    const [activeChat, setActiveChat] = useState({})
    const [realTimeMsg, setRealTimeMsg] = useState({})
    
    // const [activeChat, setActiveChat] = useState({})

    const checkReceiverActiveChat = (data) =>{
            setRealTimeMsg(data)
    }

    useEffect(()=>{
        const socket = socketIOClient(REACT_APP_API_URL);
        console.log("LOGGG", loggedUserdID);
        if(loggedUserdID){
            // console.log("");
            socket.emit("addUser", loggedUserdID)
        }

        socket.on("receiverActiveChat", (data) => {
            checkReceiverActiveChat(data)
        })

        socket.on(loggedUserdID, (data) => {
            // const { receiverId } = this.props.route.params
      
            console.log("data to socket",loggedUserdID, data);
        })
        
    }, [])

    const sendCurrentChatID = () => {
        axios.post('/sendMessageResponse', {
            id : activeChat.id
        })
        .then(res => console.log("RES", res))
        .catch(err => console.log("ERR", err))
    }

    const changeVal = async(e) => {
        await localStorage.setItem('id', e.target.value)
    }
    
    const get = localStorage.getItem('id')

    return(
        <div className="container">
            {/* <h2>{get}</h2>
            <input  type='text' onBlur={changeVal} onChange={e => val =  e.target.value}/> */}
            <div className="main">
                <div className="box">
                    <div className="main_left">
                        <Contacts realTimeMsg={realTimeMsg} setChat={(user) => setActiveChat(user)}/>
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