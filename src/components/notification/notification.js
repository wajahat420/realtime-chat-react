import axios from 'axios';
import React, {useEffect, useState} from 'react';

const REACT_APP_API_URL = "https://realtimebackend.herokuapp.com"


export default function Notification() {

   let loggedUserEmail = localStorage.getItem("email")
   const userName = loggedUserEmail.split('@')[0]
   // let loggedUserdID = localStorage.getItem("id")
   let loggedUserdID = userName

   const [data, setData] = useState([])


   function renderNotification(img, name, notificationContent, location, id){
      return(
          <div 
         //  onClick={() => navigation.navigate('Chatting',{receiverId : id, name})} 
          className='notification_main' >
              <div className='notification_profile'>
                  <div>
                      <img
                              // I write the following logic just to display my own photo from macbook. Otherwise when we do database then we just follow the line after below
                              src = {img}

                           
                              style = {{
                                  width: 40,
                                  height: 40,
                                  marginLeft: 10,
                                  marginVertical: 5,
                                  borderColor: 'gray',
                                  borderRadius: 20,
                                  borderWidth: 1
                              }}
                          />
                  </div>
              </div>
              
              <div className='notification_content' >
                  <div>
                      <p className=''>
                          <p style = {{fontWeight: 'bold', fontSize: 15}}>{name} </p> 
                          {notificationContent}
                      </p>

                      {/* <p style = {{fontSize: 11, color: 'gray'}}>
                          {location}
                      </p> */}
                  </div>
              </div>
              
          </div>
      )
  }

   useEffect(() => {
      axios.post(`${REACT_APP_API_URL}/getNoti`, { id : loggedUserdID })
      .then(res => setData(res.data.reverse()))
      .catch(err => console.log('ERR', err))
    }, []);


   return (
      <div className='notification'>
         <div className='notification_container'>
         <h2>Notifications</h2>
         

         {
            data.map(elem => renderNotification(
                  elem.user.image,
                  elem.user.name,
                  elem.noti.message,
                  "abcd",
                  elem.user.id
            ))
         }
         </div>
      </div>
   )
}
