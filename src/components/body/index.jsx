import { useState } from 'react'
import ImgBlock from '../../assets/images/block.PNG'
import ImgFile from '../../assets/images/file.PNG'
import ImgSend from '../../assets/images/send.PNG'

const Body = () => {

    const [fileName, setFileName] = useState('')

    const handleFile = (e) => {
        const file = e.target.files[0].name
        if (file)
        {
            setFileName(file)
        }
    }

    return(
        <div className="body">
            <div className="body_top">
                <div className="body_topPerson">
                    <div className="body_topLeft">
                        <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="" />
                    </div>
                    <div className="body_topRight">
                        <p className="body_topName">Yogi Yogi Yogi Yogi Yogi Yogi</p>
                        <p className="body_topMsg">Last seen 8 months</p>
                    </div>
                </div>
                <div className="body_block">
                    <img src={ImgBlock} alt="" />
                </div>
            </div>
            <div className="body_main">
                <div className="body_receiver">
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
                </div>
            </div>
            <div className="body_bot">
                <p className="body_fileName">{fileName}</p>
                <input className='body_msg' type="text" placeholder='Your Message' />
                <input type="file" id='file' onChange={(e) => handleFile(e)} />
                <label htmlFor="file"><img className='body_file' src={ImgFile} alt="" /></label>                
                <img className='body_send' src={ImgSend} alt="" />
            </div>
        </div>
    )
}

export default Body