import Contacts from "../../components/contacts"
import Head from "../../components/head"
import Body from "../../components/body"

const Main = () => {
    return(
        <div className="container">
            <div className="main">
                <div className="box">
                    <div className="main_left">
                        <Contacts/>
                    </div>
                    <div className="main_right">
                        <Head/>
                        <Body/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main