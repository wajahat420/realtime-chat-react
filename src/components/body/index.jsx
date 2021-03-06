import React, { useState, useEffect, useRef } from 'react'
import Block from '../block'
import ImgBlock from '../../assets/images/block.PNG'
import ImgFile from '../../assets/images/file.PNG'
import ImgSend from '../../assets/images/send.PNG'
import axios from "axios"
import socketIOClient from "socket.io-client";
import moment from 'moment'
import storage from '../../config/firebase'
import { ref, uploadBytesResumable ,getDownloadURL} from "firebase/storage"

// const REACT_APP_API_URL = "http://localhost:5000"
const REACT_APP_API_URL = "https://realtimebackend.herokuapp.com"


const socket = socketIOClient(REACT_APP_API_URL);

let abc = "11"
let dupUser = {}
let msgSentTime = ''

const Body = ({ activeChat, realTimeMsg, sendMsgContact, setNoti }) => {

    // const { storage } = Firebase()

    const [fileName, setFileName] = useState('')
    const [lastSeen, setLastSeen] = useState('')
    const [textMessage, setTextMessage] = useState('')
    const [block, setBlock] = useState(false)
    const [isBlock, isSetBlock] = useState({block : false,byMe : ''})

    abc = textMessage
    let messageBox = useRef()


    let loggedUserEmail = localStorage.getItem("email")
    const userName = loggedUserEmail.split('@')[0]
    // let loggedUserdID = localStorage.getItem("id")
    let loggedUserdID = userName

    const [user, setUser] = useState({})

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
        const file = e.target.files[0]
        if (file.name) {
            const fileReader = new FileReader()

            fileReader.onloadend = (res) => {
                console.log(res.target.result);
                setImage(file)
            }

            fileReader.readAsDataURL(file)
        }
    }


    const setImage = (file) => {
        const storageRef = ref(storage, `images/${Math.random().toString()}`)

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
         
        },
        (error) => {
      
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
                console.log('File available at', downloadURL);
                sendMsg("image", downloadURL)
              
            });
        }
    )
    }

    const sendMsg = (type = "text", text = textMessage) => {
        const time = (new Date).getTime()

        const obj = {
            type,
            message : text,
            senderID : loggedUserdID,
            receiverID : user.id,
            time
        }

        axios.post(`${REACT_APP_API_URL}/sendMessage`, obj)
        .then(res => {
            // console.log("RES", res.data);
            setTextMessage('')
            if(res.data.userStatus.type == 'offline'){
                sendMsgContact(obj)
                // setMessage([...message, obj])
            }
        })
        .catch(err => console.log("ERR", err))

    }

    const loadData = () => {
        axios.post(`${REACT_APP_API_URL}/getChat`, {
            receiverID: activeChat.id,
            senderID: loggedUserdID
        })
            .then(res => {

                const messages = []

                res.data.findChat?.messages.forEach(elem => {
                  const obj = {...elem}
                  if(res.data.findChat.seen){
                    obj.seen = true
                  }else{
                    obj.seen = false
                  }
                  messages.push(obj)
                })

                isSetBlock({
                    block : res.data.block,
                    byMe : res.data.byMe
                })
                setMessage(messages)
            })
            .catch(err => console.log("err", err))

    }

    const savingLastSeen = (data) => {
        // console.log("SAVING LAST SEEN", data);
        axios.post(`${REACT_APP_API_URL}/lastSeen`, {
            id: data.userId,
            date: (new Date()).getTime()    
        })
            .then(res => {
                // console.log("saving last seen api response", data);
                if (dupUser.id === data.userId) {
                    const date = moment(parseInt((new Date).getTime())).format('hh:mm A')
                    setLastSeen(getTime((new Date()).getTime()))
                    // getLastSeen()
                }
                
            })
            .catch(err => console.log("ERR", err))
    }

    const getLastSeen = () => {
        // console.log("GET LAST SEEN", dupUser.id);
        axios.post(`${REACT_APP_API_URL}/getLastSeen`, {
            id: activeChat.id,
        })
            .then(res => {
                // const date = moment(parseInt(res.data.lastSeen)).format('hh:mm A')
                // const seen = getSeen(res.data.lastSeen)
                if(res.data.lastSeen){
                    setLastSeen(getTime(res.data.lastSeen))
                }
            })
            .catch(err => console.log("ERR", err))
    }

    const getTime = (time) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let currentTime = new Date()
        let givenTime = new Date(parseInt(time))
        
        if (currentTime.getFullYear() > givenTime.getFullYear()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        if (currentTime.getMonth() > givenTime.getMonth()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        else if (currentTime.getDate() > givenTime.getDate()) {
            // return `${givenTime.getDate()}-${months[givenTime.getMonth()]}`
            return `${currentTime.getDate() - givenTime.getDate()} day ago`
        } else if (currentTime.getHours() > givenTime.getHours()) {
            return `${currentTime.getHours() - givenTime.getHours()} hour ago`
        } else if (currentTime.getMinutes() - givenTime.getMinutes() !== 0) {
            return `${currentTime.getMinutes() - givenTime.getMinutes()} min ago`
        } else {
            return 'Just now'
        }

    }

    const getSeen = (time) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let currentTime = new Date()
        let givenTime = new Date(parseInt(time))
        
        if (currentTime.getFullYear() > givenTime.getFullYear()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        if (currentTime.getMonth() > givenTime.getMonth()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        else if (currentTime.getDate() > givenTime.getDate()) {
            return `${givenTime.getDate()}-${months[givenTime.getMonth()]}`
        } 
        
        else {
            return `${givenTime.getHours()} - ${givenTime.getMinutes()}`
        }

    }
    useEffect(() => {
        if (messageBox) {
            messageBox.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }

        const socket = socketIOClient(REACT_APP_API_URL);

        socket.on("userStatusChange", (data) => {
            const user = dupUser
            // console.log("userStatusChange", data);
            // console.log("current user", dupUser);
            if(data.type == 'disconnect'){
                if (user.id === data.user.userId && data.user) {
                    // console.log("SAVING LAST SEEN");
                    savingLastSeen(data.user)
                }
            }else{
                if (user.id === data.user) {
                    console.log("ONLINE USER");

                    setLastSeen('online')
                }else{
                    const date = moment((new Date).getTime()).format('hh:mm A')
                    // console.log("DOING", date);
                    // setLastSeen(date)
                    setLastSeen(getTime(data.time))
                    // getLastSeen()
                }
            }
        })

        // socket.on(loggedUserdID, (data) => {
        //     console.log("BODY", data);
        //     console.log('current user', dupUser.id);

        //     if(data.isSeenReceiver == ''){

        //         console.log("isSeenReceiver", data.senderID == dupUser.id);
                
        //         axios.post( `${REACT_APP_API_URL}/hasReadMsg`, {
        //             ...data,
        //             isSeen : data.senderID == dupUser.id
        //         })
        //         .then(res => console.log('res sent',res))
        //     }else if(data.isSeenSender == '') {
        //         if(data.isSeen){
        //             const messages = [...message, {...data, seen : data.isSeen}]
        //             // messages[messages.length-1].seen = true
        //             setMessage(messages)
        //           }
          
        //         console.log("isSeenSender", data);
        //     }
        // })

    }, [])

    useEffect(() => {
        axios.post(`${REACT_APP_API_URL}/getUserStatus`, {
            id: activeChat.id
        })
        .then(res => {
            if (res.data.type === 'offline') getLastSeen()
            else setLastSeen('online')
            // console.log("TTT", res.data.type)
        })
        .catch(err => console.log("ERR", err))
        
        // console.log("ACTIVE CHAT", activeChat);
        loadData()
        setUser(activeChat)
        setMessage([])

    }, [activeChat])

    useEffect(() => {
        console.log("INSIDE REALTIME MSG", realTimeMsg);
        // if (realTimeMsg.senderID == user.id || realTimeMsg.senderID === loggedUserdID) {
        // if (realTimeMsg.receiverID == loggedUserdID) {
            setMessage([
                ...message,
                {
                    ...realTimeMsg,
                    seen : realTimeMsg.isSeen
                }
            ])
        // }
    }, [realTimeMsg])



    const handleBlock = () => {
        axios.post(`${REACT_APP_API_URL}/blockUser`, {
            receiverID: user.id,
            senderID: loggedUserdID,
            block: isBlock.block
        })
            .then(res => {
                isSetBlock({ block:!isBlock.block, byMe :isBlock.block ? '' : 'yes' })
                setBlock(false)
            })
            .catch(err => console.log(err))
    }

    return (

        <React.Fragment>
            {block && <Block status={isBlock.block} setBlock={setBlock} handleBlock={handleBlock} />}

            <div ref={messageBox} className="body">


                <div className="body_top">
                    <div className="body_topPerson">

                        <div className="body_topLeft">
                            {/* <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" /> */}
                            <img src={user.image} alt="" />
                        </div>
                        <div className="body_topRight">
                            <p className="body_topName">{user.name}</p>
                            <p className="body_topMsg">{lastSeen}</p>
                        </div>
                    </div>

                    
                    <div className="body_block">
                        {
                            isBlock.byMe == 'yes'
                            ?
                            <img onClick={setBlock} src={ImgBlock} alt="" />
                            :
                            isBlock.byMe == ''
                            ?
                            <img onClick={setBlock} style={{ width: 25, height: 25, marginRight: 10 }} src={"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"} alt="" />
                            :
                            <></>
                        }
                    </div>
                </div>
                <div className="body_main">
                    {
                        message.map((elem, index) => (
                            elem.senderID === loggedUserdID
                                ?
                                <div className="body_sender">
                                    <div className="body_senderRight">
                                        <div style={{position:'relative'}}>
                                        {
                                            elem.type == 'text'
                                            ?
                                            <p className="body_senderMsg">{elem.message}</p>
                                            :
                                            <img style={{width:200, height:'100%'}} src={elem.message}/>
                                        }
                                            <i style={{color:(elem.seen) ? 'green' : 'gray', position:'absolute', bottom:'-2px', right:'-20px', fontSize:'15px'}} class="fas fa-check-double read"></i>
                                        </div>
                                        <p className="body_senderTime">{getTime(elem.time)}</p>
                                    </div>
                                </div>
                                :
                                <div className="body_receiver">
                                    <div className="body_receiverLeft">
                                        <img src={user?.image} alt="" />
                                    </div>
                                    <div className="body_receiverRight">
                                        {
                                            elem.type == 'text'
                                            ?
                                           
                                                <p className="body_receiverMsg">{elem.message}</p>
                                           
                                            :
                                            <img style={{width:200, height:'100%'}} src={elem.message}/>
                                        }
                                        <p className="body_receiverTime">{getTime(elem.time)}</p>
                                    </div>
                                </div>
                        ))
                    }
                </div>
                {
                !isBlock.block &&
                <form onSubmit={(e) => {
                    e.preventDefault()
                    sendMsg('text', textMessage)
                }} className="body_bot">
                    <p className="body_fileName">{fileName}</p>
                    <input className='body_msg' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" placeholder='Your Message' />

                    <input type="file" id='file' onChange={(e) => handleFile(e)} />
                    <label htmlFor="file"><img className='body_file' src={ImgFile} alt="" /></label>
                    <img className='body_send' onClick={() => sendMsg('text', textMessage)} src={ImgSend} alt="" />
                </form>
                }
            </div>
        </React.Fragment>
    )
}

export default Body


// <div ref={messageBox} className="body">
        //     <div className="body_top">
        //         <div className="body_topPerson">
        //             <div className="body_topLeft">
        //                 <img src={user.image} alt="" />
        //             </div>
        //             <div className="body_topRight">
        //                 <p className="body_topName">{user.name}</p>
        //                 <p className="body_topMsg">{activeChat.status}</p>
        //             </div>
        //         </div>
            //     <div className="body_block">
            //         {
            //             block
            //             ?
            //             <img src={ImgBlock} alt="" />
            //             :
            //             <img style={{width:25,height:25,marginRight:10}} src={"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"} alt="" />
            //         }
            //     </div>
            // </div>
        //     <div className="body_main">
        //         {
        //             message.map((elem,index) => (
        //                 elem.senderID === loggedUserdID
        //                 ?
        //                 <div className="body_sender">
        //                     {/* <div className="body_senderLeft">
        //                         <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
        //                     </div> */}
        //                     <div className="body_senderRight">
        //                         <p className="body_senderMsg">{elem.message}</p>
        //                         <p className="body_senderTime">2 weeks ago</p>
        //                     </div>

    // return(
    //     <div ref={messageBox} className="body">
    //         <div className="body_top">
    //             <div className="body_topPerson">
    //                 <div className="body_topLeft">
    //                     <img src={user.image} alt="" />
    //                 </div>
    //                 <div className="body_topRight">
    //                     <p className="body_topName">{user.name}</p>
    //                     <p className="body_topMsg">{lastSeen}</p>
    //                 </div>
    //             </div>
    //             <div className="body_block">
    //                 {
    //                     block
    //                     ?
    //                     <img src={ImgBlock} alt="" />
    //                     :
    //                     <img style={{width:25,height:25,marginRight:10}} src={"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"} alt="" />
    //                 }
    //             </div>
    //         </div>
    //         <div className="body_main">
    //             {
    //                 message.map((elem,index) => (
    //                     elem.senderID === loggedUserdID
    //                     ?
    //                     <div className="body_sender">
    //                         {/* <div className="body_senderLeft">
    //                             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
    //                         </div> */}
    //                         <div className="body_senderRight">
    //                             <p className="body_senderMsg">{elem.message}</p>
    //                             <p className="body_senderTime">2 weeks ago</p>
    //                         </div>
    // }, [realTimeMsg.message])