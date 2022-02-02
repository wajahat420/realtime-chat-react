import {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

import Contacts from "../../components/contacts"
import Body from "../../components/body"
import axios from 'axios';
import Notification from '../../components/notification/notification';

// const REACT_APP_API_URL = "http://localhost:5000"
const REACT_APP_API_URL = "https://realtimebackend.herokuapp.com"


let msg
let chat

const Main = () => {


    let loggedUserEmail = localStorage.getItem("email")
    const userName = loggedUserEmail.split('@')[0]
    // let loggedUserdID = localStorage.getItem("id")
    let loggedUserdID = userName

    const [noti, setNoti] = useState(false)

    const [activeChat, setActiveChat] = useState({})
    const [realTimeMsg, setRealTimeMsg] = useState({})
    msg = realTimeMsg
    chat = activeChat

    const checkReceiverActiveChat = (data) =>{
        setRealTimeMsg(data)
    }

    useEffect(()=>{
        const socket = socketIOClient(REACT_APP_API_URL);
        
        if(loggedUserdID){
            socket.emit("addUser", loggedUserdID)
        }

        // socket.on(loggedUserdID, (data) => {
        //     console.log("INSIDE INDEX", data);
        //     if(!data.isSeenReceiver && !data.isSeenSender){
        //         checkReceiverActiveChat(data)
        //     }
        // })

        socket.on(loggedUserdID, (data) => {

            if(data.isSeenReceiver == '' && msg.time != data.time){
                console.log('RECEIVER', chat.id, activeChat.id);
                console.log("isSeenReceiver", data.senderID == chat.id);
                
                axios.post( `${REACT_APP_API_URL}/hasReadMsg`, {
                    ...data,
                    isSeen : data.senderID == chat.id
                })
                .then(res => setRealTimeMsg(data))
            }else if(data.isSeenSender == '' && msg.time != data.time) {
                    setRealTimeMsg(data)
                console.log("isSeenSender", data.time, msg.time);
            }
        })
        
    }, [])


    return(
        <div className="container">
            <div className="main">

                <div onClick={() => setNoti(!noti)} className='bell' style={{position:'absolute', top:50, left:30}}>
                    <i style={{fontSize:30, color:'black'}} class="fa fa-bell"></i>
                </div>

                {
                    noti
                    ?
                    <Notification/>
                    :
                    <div className="box">
                        <div className="main_left">
                            <Contacts realTimeMsg={realTimeMsg} setChat={(user) => setActiveChat(user)}/>
                        </div>
                        <div className="main_right">
                            <Body setNoti={() => setNoti} sendMsgContact={setRealTimeMsg} realTimeMsg={realTimeMsg} activeChat={activeChat}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Main