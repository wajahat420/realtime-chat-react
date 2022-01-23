import React, { useState, useEffect, useRef } from 'react'
import Block from '../block'
import ImgBlock from '../../assets/images/block.PNG'
import ImgFile from '../../assets/images/file.PNG'
import ImgSend from '../../assets/images/send.PNG'
import axios from "axios"
import socketIOClient from "socket.io-client";

const REACT_APP_API_URL = "http://localhost:5000"

const socket = socketIOClient(REACT_APP_API_URL);

let abc = "11"
let dupUser = {}
const Body = ({activeChat, realTimeMsg}) => {

    const [fileName, setFileName] = useState('')
    const [textMessage, setTextMessage] = useState('')
    const [block, setBlock] = useState(false)
    abc = textMessage
    let messageBox = useRef()

    let loggedUserdID = "999"

    const [user, setUser] = useState({})
    dupUser = user

    const [message, setMessage] = useState(
        [
            {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            {sender:true, type:"image", message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!", userID:'1', receiverID:'2'},
            {sender:true, type:"doc", message:"first", userID:'1', receiverID:'2'},
            {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            {sender:false, type:"text", message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!", userID:'1', receiverID:'2'},
            {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
        ])

    const handleFile = (e) => {
        const file = e.target.files[0].name
        if (file)
        {
            setFileName(file)
        }
    }

    const sendMsg = () => {
        console.log("SENDING");

        axios.post(`${REACT_APP_API_URL}/sendMessage`, {
            // type: "text",
            // message : textMessage,
            senderID : "123",
            receiverID : "999"
        })
        .then(res => console.log("RESS", res))
        .catch(err => console.log("ERR", err))
    }

    const checkReceiverActiveChat = (data) =>{
        // console.log("receiverActiveChat", data);
        console.log("USERR", dupUser);

        
        if(loggedUserdID === data.receiverID){
            axios.post(`${REACT_APP_API_URL}/sendMessageChecking`, {
                    checked : data.senderID === dupUser.id,
                    senderID: data.senderID,
                    receiverID : data.receiverID
            })
            .then(res => console.log("sendMessageChecking", res))
            .catch(err => console.log("ERR", err))
            // sendCurrentChatID()
        }
    }

    const setToDB = (checked) => {

        axios.post(`${REACT_APP_API_URL}/sendMessageToDB`, {
            type: "text",
            message : abc,
            senderID : "999",
            receiverID : "123",
            checked : checked
        })
        .then(res => console.log("RES", res))
        .catch(err => console.log("ERR", err))
    }

    useEffect(() => {
        if (messageBox) {
          messageBox.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }


        socket.on("receiverActiveChat", (data) => {
            checkReceiverActiveChat(data)
        })

        socket.on('receiverActiveChatResponse', (data) => {
            setToDB(data.checked)
        })
      }, [])

    useEffect(() => {
        setUser(activeChat)
    }, [activeChat])  
    
    useEffect(() => {
        if(realTimeMsg.senderID == user.id){
            setMessage([
                ...message,
                realTimeMsg
            ])
        }
    }, [realTimeMsg.message])

    const handleBlock = () => {
        console.log('user is blocked');
    }


    return(
        <React.Fragment>
            {block && <Block setBlock={setBlock} handleBlock={handleBlock} />}
            <div ref={messageBox} className="body">
                <div className="body_top">
                    <div className="body_topPerson">
                        <div className="body_topLeft">
                            <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" />
                        </div>
                        <div className="body_topRight">
                            <p className="body_topName">Yogi Yogi Yogi Yogi Yogi Yogi</p>
                            <p className="body_topMsg">{activeChat.status}</p>
                        </div>
                    </div>
                    <div className="body_block">
                        <img src={ImgBlock} alt="" onClick={() => setBlock(true)} />
                    </div>
                </div>
                <div className="body_main">
                    {
                        message.map((elem,index) => (
                            elem.sender
                            ?
                            <div className="body_sender">
                                {/* <div className="body_senderLeft">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                                </div> */}
                                <div className="body_senderRight">
                                    <p className="body_senderMsg">{elem.message}</p>
                                    <p className="body_senderTime">2 weeks ago</p>
                                </div>
                            </div>
                            :
                            <div className="body_receiver">
                                <div className="body_receiverLeft">
                                    <img src={user?.image} alt="" />
                                </div>
                                <div className="body_receiverRight">
                                    <p className="body_receiverName">Yogi</p>
                                    <p className="body_receiverMsg">{elem.message}</p>
                                    <p className="body_receiverTime">2 weeks ago</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="body_bot">
                    <p className="body_fileName">{fileName}</p>
                    <input className='body_msg' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" placeholder='Your Message' />
                    <input type="file" id='file' onChange={(e) => handleFile(e)} />
                    <label htmlFor="file"><img className='body_file' src={ImgFile} alt="" /></label>                
                    <img className='body_send' onClick={sendMsg} src={ImgSend} alt="" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Body