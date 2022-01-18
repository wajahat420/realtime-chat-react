const Contacts = () => {
    return(
        <div className="contacts">
            <p className="contacts_title">Messages</p>
            <input className="contacts_input" type="search" placeholder="Search" />
            <div className="contacts_persons">
                <div className="contacts_person">
                    <div className="contacts_left">
                        <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" />
                    </div>
                    <div className="contacts_right">
                        <p className="contacts_name">Yogi</p>
                        <p className="contacts_msg">Hello How you doing</p>
                    </div>
                    <p className="contacts_time">4 days ago</p>
                    <div className="contacts_tick">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <div className="contacts_person">
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
                </div>
            </div>
        </div>
    )
}

export default Contacts