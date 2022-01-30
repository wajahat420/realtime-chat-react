import axios from 'axios'
import { useState, useEffect } from 'react'
import logoutIcon from '../../assets/images/log-out.png'

// const REACT_APP_API_URL = "http://localhost:5000"
const REACT_APP_API_URL = "https://realtimebackend.herokuapp.com"



const Contacts = ({setChat, realTimeMsg}) => {

    let loggedUserEmail = localStorage.getItem("email")
    const userName = loggedUserEmail.split('@')[0]
    // let loggedUserdID = localStorage.getItem("id")
    let loggedUserdID = userName


    const [chats, setChats] = useState([  ])
    const [search, setSearch] = useState('')

    const filteredContacts = search ? chats.filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase())) : chats

    const [user, setUser] = useState({})

    const loadChats = () => {
        axios.post(`${REACT_APP_API_URL}/getAllChats`, {
            id : loggedUserdID
        })
        .then(res => {
            const arr = []

            res.data.forEach(elem => {

                console.log("ELEM", elem);
                let obj = {
                    name : elem.user.name,
                    id : elem.user.id,  
                    lastMsg: elem.messages?.message,
                    time : elem.messages?.time,
                    image: elem.user.image,
                    seen : elem.messages ? elem.seen : true
                }
                arr.push(obj)
            })
            setChats(arr)
            setChat(arr[0])
            setUser(arr[0])
            console.log("API",arr)
        })
        .catch(err => console.log("err", err))
    }

    const getTime =(time) =>{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
        let currentTime = new Date()
        let givenTime = new Date(parseInt(time))
        if(currentTime.getFullYear() > givenTime.getFullYear()){
          return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        if(currentTime.getMonth() > givenTime.getMonth()){
          return `${months[givenTime.getMonth()]}-${givenTime.getDate()}`
        }
        else if(currentTime.getDate() > givenTime.getDate()){
          return `${givenTime.getDate()}-${months[givenTime.getMonth()]}`
        }else if(currentTime.getHours() > givenTime.getHours()){
          return `${currentTime.getHours() -  givenTime.getHours()} hour ago`
        }else if(currentTime.getMinutes() - givenTime.getMinutes() !== 0){
          return `${currentTime.getMinutes() - givenTime.getMinutes()} min ago`
        }else{
            return 'Just now'
        }
    
    }

    const seenMsg = (elem, index) => {
        if(!elem.seen){
            axios.post(`${REACT_APP_API_URL}/seenMsg`, {
                receiverID : elem.id,
                senderID : loggedUserdID
            })
            .then(res => {
                const dupChats = [...chats]
                dupChats[index].seen = true

                setChats(dupChats)
                setUser(elem)
            })
            .catch(err => console.log("Err", err))
        }else{
            setUser(elem)
        }
    }


    useEffect(() => {
        if(realTimeMsg.receiverID === loggedUserdID || realTimeMsg.senderID == loggedUserdID){
            
            const dupChats = [...chats]
            const find = dupChats.findIndex(elem => elem.id === realTimeMsg.senderID || elem.id === realTimeMsg.receiverID)
            
            console.log("realTimeMsg", realTimeMsg);
            console.log("user", user);
            if(find !== -1){
                const chat = chats[find]
                dupChats.splice(find, 1)

                chat.lastMsg = realTimeMsg.message
                chat.time = realTimeMsg.time

                if(realTimeMsg.senderID == loggedUserdID || realTimeMsg.senderID == user.id){
                    chat.seen = true
                }else{
                    chat.seen = false
                }
                setChats([
                    chat,
                    ...dupChats,
                    
                ])
            }
        }
    }, [realTimeMsg]) 

    useEffect(() => {
        loadChats()
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload(false)
    }    

    console.log("Chats",filteredContacts);

    return(
        <div className="contacts">
            <div className="contacts_top">
                <p className="contacts_topLeft">{userName}</p>
                <div className="contacts_topRight" onClick={handleLogout}>
                    <p>LOG OUT</p>
                    <img src={logoutIcon} alt="..." />
                </div>
            </div>
            <p className="contacts_title">Messages</p>
            <input className="contacts_input" type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <div className="contacts_persons">
                {filteredContacts.length > 0 ? 
                    filteredContacts.map((elem, index) => {
                        return(
                            <div style={!elem.seen ? {backgroundColor:'#dbdbdb'} : {}} 
                                onClick={() => {
                                    setChat(elem) 
                                    seenMsg(elem,index)
                                }} 
                                className="contacts_person">
                                <div className="contacts_left">
                                    <img src={elem.image} alt="" />
                                </div>
                                <div className="contacts_right">
                                    <p className="contacts_name">{elem.name}</p>
                                    <p className="contacts_msg">{elem.lastMsg}</p>
                                </div>
                                <p className="contacts_time">{elem.time ? getTime(elem.time) : ''}</p>
                                <div className="contacts_tick">
                                {
                                    elem.lastMsg &&
                                    (elem.seen
                                    ?
                                    <i class="fas fa-check-double read"></i>
                                    :
                                    <i class="fas fa-check"></i>
                                    )
                                }
                                </div>
                            </div>
                        )
                    })
                : <p className='mt-2 pl-3'>no contact found </p>}
                {/* <div className="contacts_person">
                    <div className="contacts_left">
                        <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" />
                    </div>
                    <div className="contacts_right">
                        <p className="contacts_name">Yogi</p>
                        <p className="contacts_msg">Hello How you doing</p>
                    </div>
                    <p className="contacts_time">4 days ago</p>
                    <div className="contacts_tick">
                        <i class="fas fa-check-double"></i>
                    </div>
                </div>
                <div className="contacts_person">
                    <div className="contacts_left">
                        <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" />
                    </div>
                    <div className="contacts_right">
                        <p className="contacts_name">Yogi</p>
                        <p className="contacts_msg">Hello How you doing Hello How you doing Hello How you doing</p>
                    </div>
                    <p className="contacts_time">4 days ago</p>
                    <div className="contacts_tick">
                        <i class="fas fa-check-double read"></i>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Contacts