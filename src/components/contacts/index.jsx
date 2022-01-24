import axios from 'axios'
import { useState, useEffect } from 'react'

const REACT_APP_API_URL = "http://localhost:5000"


const Contacts = ({setChat, realTimeMsg}) => {

    let loggedUserdID = localStorage.getItem("id")


    const [chats, setChats] = useState([
        // {name:'User 1', id:'123',lastMsg:'this is my last message are you hearing ????', image:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'},
        // {name:'User 2', id:'999',lastMsg:'this is my last message are you hearing ????', image:"data:image/png;base64,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"},
        // {name:'User 3', id:'3',lastMsg:'this is my last message are you hearing ????', image:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'},
        // {name:'User 4', id:'3',lastMsg:'this is my last message are you hearing ????', image:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'},
        // {name:'User 5', id:'3',lastMsg:'this is my last message are you hearing ????', image:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'},
    ])
    const [search, setSearch] = useState('')

    const contacts = [
        {name:'User 1', id:'123',lastMsg:'this is my last message are you hearing ????', image:'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'},
        {name:'User 2', id:'2',lastMsg:'this is my last message are you hearing ????', image:"data:image/png;base64,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"},
    ]

    const filteredContacts = search ? contacts.filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase())) : contacts

    const [user, setUser] = useState({})

    const loadChats = () => {
        // console.log("LOGGED", loggedUserdID);
        axios.post(`${REACT_APP_API_URL}/getAllChats`, {
            id : loggedUserdID
        })
        .then(res => {
            const arr = []

            res.data.forEach(elem => {

                // console.log("ELEM", elem);
                let obj = {
                    name : elem.user.name,
                    id : elem.user.id,  
                    lastMsg: elem.messages?.message,
                    image: elem.user.image
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


    useEffect(() => {
        // console.log("CONTACTS", realTimeMsg, 'userid', user.id);
        if(realTimeMsg.receiverID === loggedUserdID || realTimeMsg.senderID == loggedUserdID){
            
            const dupChats = [...chats]
            const find = dupChats.findIndex(elem => elem.id === user.id)
            
            // console.log("FIND", find);
            // console.log("FIND", find);
            if(find !== -1){
                const chat = chats[find]
                dupChats.splice(find, 1)

                chat.lastMsg = realTimeMsg.message
                setChats([
                    chat,
                    ...dupChats,
                    
                ])
            }
        }
    }, [realTimeMsg]) 

    useEffect(() => {
        // setChat(chats[0]) 
        // setUser(chats[0])

        loadChats()
    }, [])

    

    // console.log("Chats",chats);

    return(
        <div className="contacts">
            <p className="contacts_title">Messages</p>
            <input className="contacts_input" type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <div className="contacts_persons">
                {filteredContacts.length > 0 ? 
                    filteredContacts.map(elem => {
                        return(
                            <div onClick={() => {setChat(elem); setUser(elem)}} className="contacts_person">
                                <div className="contacts_left">
                                    <img src={elem.image} alt="" />
                                </div>
                                <div className="contacts_right">
                                    <p className="contacts_name">{elem.name}</p>
                                    <p className="contacts_msg">{elem.lastMsg}</p>
                                </div>
                                <p className="contacts_time">4 days ago</p>
                                <div className="contacts_tick">
                                    <i class="fas fa-check"></i>
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