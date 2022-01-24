import { useState, useEffect, useRef } from 'react'
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
    abc = textMessage
    let messageBox = useRef()

    let loggedUserdID = localStorage.getItem("id")

    const [user, setUser] = useState({})

    const [block, setBlock] = useState(false)

    dupUser = user

    const [message, setMessage] = useState(
        [
            // {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            // {sender:true, type:"image", message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!", userID:'1', receiverID:'2'},
            // {sender:true, type:"doc", message:"first", userID:'1', receiverID:'2'},
            // {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            // {sender:false, type:"text", message:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!", userID:'1', receiverID:'2'},
            // {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
            // {sender:true, type:"text", message:"first", userID:'1', receiverID:'2'},
        ])

    const handleFile = (e) => {
        const file = e.target.files[0].name
        if (file)
        {
            setFileName(file)
        }
    }

    const sendMsg = () => {

        axios.post(`${REACT_APP_API_URL}/sendMessage`, {
            type: "text",
            message : textMessage,
            senderID : loggedUserdID,
            receiverID : user.id
        })
        .then(res => console.log("RESS", res))
        .catch(err => console.log("ERR", err))

    }

    const loadData = () => {
        axios.post(`${REACT_APP_API_URL}/getChat`, {
            receiverID : activeChat.id,
            senderID : loggedUserdID
        })
        .then(res => {
            console.log("LOAD DATA", res.data);
            setBlock(res.data.block)
            setMessage(res.data.findChat?.messages || [])
        })
        .catch(err => console.log("err", err))

    }

    // const setToDB = (data) => {

    //     axios.post(`${REACT_APP_API_URL}/sendMessageToDB`, {
    //         type: "text",
    //         message : abc,
    //         senderID : data.senderID,
    //         receiverID : data.receiverID,
    //         checked : data.checked
    //     })
    //     .then(res => console.log("RES", res))
    //     .catch(err => console.log("ERR", err))
    // }

    useEffect(() => {
        if (messageBox) {
          messageBox.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    useEffect(() => {
        loadData()
        setUser(activeChat)
        setMessage([])
    }, [activeChat])  
    
    useEffect(() => {
        // console.log("Realtime msg in body", realTimeMsg);
        // console.log("user in body", user);
        if(realTimeMsg.senderID == user.id || realTimeMsg.senderID === loggedUserdID){
            console.log("IF");
            setMessage([
                // ...message,
                ...message,
                realTimeMsg
            ])
        }
    }, [realTimeMsg])   

    // console.log("realTimeMsg",textMessage);


    return(
        <div ref={messageBox} className="body">
            <div className="body_top">
                <div className="body_topPerson">
                    <div className="body_topLeft">
                        <img src={user.image} alt="" />
                    </div>
                    <div className="body_topRight">
                        <p className="body_topName">{user.name}</p>
                        <p className="body_topMsg">{activeChat.status}</p>
                    </div>
                </div>
                <div className="body_block">
                    {
                        block
                        ?
                        <img src={ImgBlock} alt="" />
                        :
                        <img style={{width:25,height:25,marginRight:10}} src={"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"} alt="" />
                    }
                </div>
            </div>
            <div className="body_main">
                {
                    message.map((elem,index) => (
                        elem.senderID === loggedUserdID
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
                {/* <div className="body_receiver">
                    <div className="body_receiverLeft">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="body_receiverRight">
                        <p className="body_receiverName">Yogi</p>
                        <p className="body_receiverMsg">Lorem ipsum dolor sit amet.</p>
                        <p className="body_receiverTime">2 weeks ago</p>
                    </div>
                </div>
                <div className="body_receiver">
                    <div className="body_receiverLeft">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="body_receiverRight">
                        <p className="body_receiverName">Yogi</p>
                        <p className="body_receiverMsg">Lorem</p>
                        <p className="body_receiverTime">2 weeks ago</p>
                    </div>
                </div>
                <div className="body_receiver">
                    <div className="body_receiverLeft">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="body_receiverRight">
                        <p className="body_receiverName">Yogi</p>
                        <p className="body_receiverMsg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!</p>
                        <p className="body_receiverTime">2 weeks ago</p>
                    </div>
                </div>
                <div className="body_sender">
                    <div className="body_senderLeft">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="body_senderRight">
                        <p className="body_senderMsg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum nesciunt alias incidunt, quia quod ad laborum perferendis rerum recusandae illum provident suscipit corporis, obcaecati vel. Id laudantium totam dolore. Ratione minus dolorem dolorum magnam exercitationem similique quisquam magni vel expedita, quibusdam quidem quis rem voluptatum sed asperiores minima laborum. Consequuntur, illo voluptas! Ad ratione provident quis aut molestias excepturi suscipit laborum laudantium, quia quisquam in asperiores itaque molestiae assumenda minima libero blanditiis quo fugiat maxime a impedit? Quasi quaerat vel est recusandae maiores. Impedit suscipit aperiam nesciunt blanditiis. Iusto doloribus dicta porro nesciunt adipisci. Esse perferendis nobis reprehenderit ducimus!</p>
                        <p className="body_senderTime">2 weeks ago</p>
                    </div>
                </div>
                <div className="body_sender">
                    <div className="body_senderLeft">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="body_senderRight">
                        <p className="body_senderMsg">lorem</p>
                        <p className="body_senderTime">2 weeks ago</p>
                    </div>
                </div> */}
            </div>
            <div className="body_bot">
                <p className="body_fileName">{fileName}</p>
                <input className='body_msg' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" placeholder='Your Message' />
                <input type="file" id='file' onChange={(e) => handleFile(e)} />
                <label htmlFor="file"><img className='body_file' src={ImgFile} alt="" /></label>                
                <img className='body_send' onClick={sendMsg} src={ImgSend} alt="" />
            </div>
        </div>
    )
}

export default Body