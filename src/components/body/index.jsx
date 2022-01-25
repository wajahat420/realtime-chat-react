import React, { useState, useEffect, useRef } from 'react'
import Block from '../block'
import ImgBlock from '../../assets/images/block.PNG'
import ImgFile from '../../assets/images/file.PNG'
import ImgSend from '../../assets/images/send.PNG'
import axios from "axios"
import socketIOClient from "socket.io-client";
import moment from 'moment'
import storage from '../../config/firebase'

const REACT_APP_API_URL = "http://localhost:5000"

const socket = socketIOClient(REACT_APP_API_URL);

let abc = "11"
let dupUser = {}
const Body = ({ activeChat, realTimeMsg }) => {

    // const { storage } = Firebase()

    const [fileName, setFileName] = useState('')
    const [lastSeen, setLastSeen] = useState('')
    const [textMessage, setTextMessage] = useState('')
    const [block, setBlock] = useState(false)
    const [isBlock, isSetBlock] = useState(false)

    abc = textMessage
    let messageBox = useRef()

    let loggedUserdID = localStorage.getItem("id")

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
        console.log("FILEEE", file);
        if (file.name) {
            const fileReader = new FileReader()

            fileReader.onloadend = (res) => {
                console.log(res.target.result);
                getImgURL(file, file)
            }

            fileReader.readAsDataURL(file)
            // setFileName(file)
        }
    }

    const getImgURL = (result, file) => {
        console.log("UPLOADING");
        const uploadTask = storage().ref(`realtimeChat/${file.name}`)
                            .put(result)
                            .on("state_changed" , alert("success") , alert("abc"))

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                // switch (error.code) {
                //     case 'storage/unauthorized':
                //         // User doesn't have permission to access the object
                //         break;
                //     case 'storage/canceled':
                //         // User canceled the upload
                //         break;

                //     // ...

                //     case 'storage/unknown':
                //         // Unknown error occurred, inspect error.serverResponse
                //         break;
                // }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    //  const dup = [...song]
                    //  dup[index].song = downloadURL
                    //  setSong(dup)
                });
            }
        )

    }


    const sendMsg = () => {

        axios.post(`${REACT_APP_API_URL}/sendMessage`, {
            type: "text",
            message: textMessage,
            senderID: loggedUserdID,
            receiverID: user.id,
            time: (new Date).getTime()
        })
            .then(res => console.log("RESS", res))
            .catch(err => console.log("ERR", err))

    }

    const loadData = () => {
        axios.post(`${REACT_APP_API_URL}/getChat`, {
            receiverID: activeChat.id,
            senderID: loggedUserdID
        })
            .then(res => {
                console.log("LOAD DATA", res.data);
                isSetBlock(res.data.block)
                setMessage(res.data.findChat?.messages || [])
            })
            .catch(err => console.log("err", err))

    }

    const savingLastSeen = (data) => {
        axios.post(`${REACT_APP_API_URL}/lastSeen`, {
            id: data.userId,
            date: (new Date()).getTime()
        })
            .then(res => {
                if (activeChat.id === data.userId) {
                    // console.log("");
                    getLastSeen()
                }
                // console.log("DATA",data.userId, activeChat.id);
                // console.log("SAVED", res.data)
                // if(res.data.type === 'offline') getLastSeen()
                // else setLastSeen('online')
                // console.log("TTT", res.data.type)
            })
            .catch(err => console.log("ERR", err))
        // setLastSeen('offline')
    }

    const getLastSeen = () => {
        console.log("SEENK", activeChat.id);
        axios.post(`${REACT_APP_API_URL}/getLastSeen`, {
            id: activeChat.id,
        })
            .then(res => {
                console.log("SEENAA", res.data)
                const date = moment(parseInt(res.data.lastSeen)).format('hh:mm A')
                setLastSeen(date)
                // if(res.data.type === 'offline') getLastSeen()
                // else setLastSeen('online')
                // console.log("TTT", res.data.type)
            })
            .catch(err => console.log("ERR", err))
    }

    const getTime = (time) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let currentTime = new Date()
        let givenTime = new Date(parseInt(time))
        // console.log("givennnn",givenTime.getDate(),givenTime.getHours(),givenTime.getMinutes())
        if (currentTime.getFullYear() > givenTime.getFullYear()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        if (currentTime.getMonth() > givenTime.getMonth()) {
            return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        else if (currentTime.getDate() > givenTime.getDate()) {
            return `${givenTime.getDate()}-${months[givenTime.getMonth()]}-${givenTime.getFullYear()}`
        } else if (currentTime.getHours() > givenTime.getHours()) {
            return `${currentTime.getHours() - givenTime.getHours()} hour ago`
        } else if (currentTime.getMinutes() - givenTime.getMinutes() !== 0) {
            return `${currentTime.getMinutes() - givenTime.getMinutes()} min ago`
        } else {
            return 'Just now'
        }

    }


    useEffect(() => {
        if (messageBox) {
            messageBox.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    useEffect(() => {
        axios.post(`${REACT_APP_API_URL}/getUserStatus`, {
            id: activeChat.id
        })
            .then(res => {
                if (res.data.type === 'offline') getLastSeen()
                else setLastSeen('online')
                console.log("TTT", res.data.type)
            })
            .catch(err => console.log("ERR", err))

        loadData()
        setUser(activeChat)
        setMessage([])

        const socket = socketIOClient(REACT_APP_API_URL);

        socket.on("userStatusChange", (data) => {
            console.log("userStatusChange", data);
            if (user.id === data?.userId) {
                // setLastSeen('offline')
                savingLastSeen(data)
            }

        })

    }, [activeChat])

    useEffect(() => {
        // console.log("Realtime msg in body", realTimeMsg);
        // console.log("user in body", user);
        if (realTimeMsg.senderID == user.id || realTimeMsg.senderID === loggedUserdID) {
            setMessage([
                // ...message,
                ...message,
                realTimeMsg
            ])
        }
    }, [realTimeMsg])



    const handleBlock = () => {
        axios.post(`${REACT_APP_API_URL}/blockUser`, {
            receiverID: user.id,
            senderID: loggedUserdID,
            block: isBlock
        })
            .then(res => {
                isSetBlock(!isBlock)
                setBlock(false)
            })
            .catch(err => console.log(err))
        console.log('user is blocked');
    }


    return (

        <React.Fragment>
            {block && <Block status={isBlock} setBlock={setBlock} handleBlock={handleBlock} />}
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

                    {/* <div className="body_block">
                        <img src={ImgBlock} alt="" onClick={() => setBlock(true)} />
                    </div> */}
                    <div className="body_block">
                        {
                            isBlock
                                ?
                                <img onClick={setBlock} src={ImgBlock} alt="" />
                                :
                                <img onClick={setBlock} style={{ width: 25, height: 25, marginRight: 10 }} src={"https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"} alt="" />
                        }
                    </div>
                </div>
                <div className="body_main">
                    {
                        message.map((elem, index) => (
                            elem.senderID === loggedUserdID
                                ?
                                <div className="body_sender">
                                    {/* <div className="body_senderLeft">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                                </div> */}
                                    <div className="body_senderRight">
                                        <p className="body_senderMsg">{elem.message}</p>
                                        <p className="body_senderTime">{getTime(elem.time)}</p>
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
                                        <p className="body_receiverTime">{getTime(elem.time)}</p>
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