import React, { useState } from "react";
import { ReactComponent as MailBox } from '../assets/inbox-alt-1-svgrepo-com.svg'
import { ReactComponent as Connection } from "../assets/share-circle-network-connection-social-svgrepo-com.svg";
import { ReactComponent as Friend } from "../assets/user-friends-svgrepo-com.svg";
import { ReactComponent as Graph } from "../assets/graph-increase-svgrepo-com.svg";
import {ReactComponent as Logout} from "../assets/logout-svgrepo-com.svg"
import img from "../assets/img1.jpeg"
import img1 from "../assets/align-left_10654774.png"
import { ReactComponent as RefreshIcon } from "../assets/refresh-svgrepo-com.svg";
import { ReactComponent as CallIcon } from "../assets/call-alt-svgrepo-com.svg";
import { ReactComponent as ProfileIcon } from "../assets/user-profile-avatar-svgrepo-com.svg";
import AllMessages from "./AllMessages";
import { CHATS } from "../chats";
import '../css/FinalPage.css'
import Chats from "./chats";
let DATA = [];
const Agent = () => {
    const [message, setMessage] = useState(DATA);
    const [chats, setChats] = useState(CHATS);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [pid,setPid] = useState('');
    const [name,setName] = useState('');
    const status = 'Online';
    const [email,setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    const fetchmess = async () => {
            try {
                // const response = await fetch('https://graph.facebook.com/v19.0/197468190125742/conversations?fields=participants,messages{id,message,created_time,from}&access_token=EAAZATCgv3TQMBO6sMHtYmiOICBXaBCtovrreSwZA6DwwhDixe5BgkFPtI3pWGZCvJlYTBIWfKsc2R7oCmKvbNaLcLIHusXSfnZBU1YjuZApdWmGeudIsa3IXeggzYpcusnv9q0anF8HSHedGQX4oPceFHQdQReifIsxBSrGA0aFKkU5IaBNBpGbTobZAArYHPiXZA1XhWIZD');
                // const data = await response.json();
                
                const response = await fetch('https://backend-rmji.onrender.com/api/getchat');
                const data = await response.json();
                for(const user of data.data)
                  {
                      const temp =(user.participants.data[0]);

                      //console.log(temp.name);
                      const newObj ={
                        id : temp.id,
                        name: temp.name,
                        email: temp.email,
                        type: 'Facebook DM',
                        time: '10m',
                        heading: '',
                        text: ''
                    };

                      const isDistinct = !DATA.some(obj => obj.id === newObj.id);

                        if (isDistinct) {
                            DATA.push(newObj);
                        }
                        //console.log(DATA);
                  }
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
          
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        };
    
        fetchmess();
    
    const myId = "225176530686691"
    async function fetchData(psid) {
        try {
            console.log("he;jfojidjfid",psid);

            if(psid==='')
            return [];
            const response = await fetch('https://backend-rmji.onrender.com/api/getchat');
            //const data = await response.json();
            //const response = await fetch('https://graph.facebook.com/v19.0/197468190125742/conversations?fields=participants,messages{id,message,created_time,from}&access_token=EAAZATCgv3TQMBO6sMHtYmiOICBXaBCtovrreSwZA6DwwhDixe5BgkFPtI3pWGZCvJlYTBIWfKsc2R7oCmKvbNaLcLIHusXSfnZBU1YjuZApdWmGeudIsa3IXeggzYpcusnv9q0anF8HSHedGQX4oPceFHQdQReifIsxBSrGA0aFKkU5IaBNBpGbTobZAArYHPiXZA1XhWIZD');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            const data = resp.data;


            const getMessagesForParticipant = async(participantId) => {
                console.log("jahy",participantId);

                const participantData = await data.find(item =>
                    item.participants.data.some(participant => participant.id === participantId)
                );
                if (participantData) {
                    // Return the messages data for the participant
                    console.log(participantData.messages.data);
                    return participantData.messages.data;
                } else {
                    // Participant not found
                    return [];
                }
            };
            setPid(psid);
            const participantId = psid; // ID of the participant
            const dm_messages = await getMessagesForParticipant(participantId); // Await the async function call
            // Usage example
            // console.log(dm_messages.reverse);
            const dm_messages1 = await dm_messages.map((_, index, arr) => arr[arr.length - 1 - index]);
            // console.log(dm_messages1[0].from.name)
            console.log(dm_messages1);
            setChats(dm_messages1);

        } catch (error) {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // fetchData();

    function convertGMTtoIST(gmtTime) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Convert the GMT time string to a Date object
        const gmtDate = new Date(gmtTime);

        // Add the IST offset to the GMT date to get the IST date
        const istDate = new Date(gmtDate.getTime());

        // Format the IST date as "dd-mm-yyyy hh:mm"
        const formattedDate = `${istDate.getDate().toString().padStart(2, '0')}-${monthNames[istDate.getMonth()]}-${istDate.getFullYear()} ${istDate.getHours().toString().padStart(2, '0')}:${istDate.getMinutes().toString().padStart(2, '0')}`;

        return formattedDate;

    }

    const [activeMessageIndex, setActiveMessageIndex] = useState(null);
    const handleSetActiveMessage = (index,psid) => {
        setActiveMessageIndex(index); // Set the active message index
        fetchData(psid);
        // console.log(index)
    };
    


    const updname = (name,email,fname,lname) => {
        console.log(name,email,fname,lname);
        setName(name);
        setEmail(email);
        setFName(fname);
        setLName(lname);
      };

    const [navActiveTab, setNavActiveTab] = useState('mailbox'); // Initial active tab

    const handleNavTabClick = (tab) => {
        setNavActiveTab(tab); // Set the active tab when clicked
    };



    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key

            // Call your API or handle form submission here
            try {
                console.log(typeof pid,pid);

                const response = await fetch('https://graph.facebook.com/v19.0/225176530686691/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers required by your API
                    },
                    body: JSON.stringify({
                        "recipient": { "id": pid },
                        "message": { "text": inputMessage },
                        "messaging_type": "RESPONSE",
                        "access_token": "EAANKlbV8XikBO21vOfw4rCVLAE3qrUg35MwClf1nIkeo2U1UZAmnTX5x4jy2qjPZC7eNFEL7qT3EsIV1cR7Lu3o3TDkIqZCruErmVbvgMC3Ea6VZA9U6VQYDOcHZAPFNUZApyO6zgG4S5g1hJ649Gxe7Jm6N3c8dr5yPizyN7Nf5mhbpsJD0e6djVyP3ZCXQeFE"
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Handle success response
                console.log('Message sent successfully');
                fetchData(pid);
            } catch (error) {
                // Handle error
                console.error('There was a problem with the fetch operation:', error);
            }
            event.target.value = '';
            setInputMessage(''); // Clear the input field after submission
        }
    };

    const handleChange = (event) => {
        setInputMessage(event.target.value);
    };

    return (
        <div className="container">
            <div className="nav-container">
                <ul className="nav-tabs">
                    <li className={navActiveTab === 'connection' ? 'active-nav' : ''} onClick={() => handleNavTabClick('connection')}>
                        <a href="#"><Connection /></a>
                    </li>
                    <li className={navActiveTab === 'mailbox' ? 'active-nav' : ''} onClick={() => handleNavTabClick('mailbox')}>
                        <a href="#"><MailBox /></a>
                    </li>
                    <li className={navActiveTab === 'friend' ? 'active-nav' : ''} onClick={() => handleNavTabClick('friend')}>
                        <a href="#"><Friend /></a>
                    </li>
                    <li className={navActiveTab === 'graph' ? 'active-nav' : ''} onClick={() => handleNavTabClick('graph')}>
                        <a href="#"><Graph /></a>
                    </li>
                    <li
           className={navActiveTab === "logout" ? "active-nav" : ""}
            onClick={() => handleNavTabClick("logout")}
            >
              <a href="/login"> <Logout/> </a>
              
          </li>
                </ul>
                <div className="profile-container">
                    <div className="profile-image">
                        <img src={img} alt="Profile" />
                        <div className="status-dot"></div>
                    </div>
                </div>
            </div>
            <div className="secondComponent">
                <div className="header">
                    <div className="left_content">
                        <img src={img1} alt="Menu" className="menu-icon" />
                        <span className="conversation">Conversation</span>
                    </div>
                    <RefreshIcon className="refresh-icon" />
                </div>
                <div className="divider"></div>
                {message.map((data, index) => (<div onClick={() => handleSetActiveMessage(index,data.id)}><AllMessages name={data.name} type={data.type} time={data.time} heading={data.heading} text={data.text} isActive={index === activeMessageIndex} updatenaam={updname} email = {data.email}/> </div>))}
            </div>
            <div className="thirdComponent">
                <div className="header">
                    <span className="chat-heading">Chat</span>
                </div>
                <div className="divider"></div>
                <div className="chats">
                    {chats.map(data => (<Chats name={data.from?.name} time={convertGMTtoIST(data.created_time)} text={data.message} img={data.avatar} myChat={data.from?.id === myId} />))}
                </div>
                <div className="input-area"><input type="text" name="" id="input-area" placeholder="Message" onKeyDown={handleKeyDown} onChange={handleChange}
                /></div>
            </div>
            <div className="fourthComponent">
                <div className="profile-container1">
                    <img src={img} alt="Avatar" className="profile-avatar" />
                    <div className="profile-name"><b>{name}</b></div>
                    {status === "Online" ? (<div className="full-profile-status">
                        <div className="profile-status-dot-online"></div>
                        <div className="profile-status">Online</div>
                    </div>) :
                        (<div className="full-profile-status">
                            <div className="profile-status-dot-offline"></div>
                            <div className="profile-status">Offline</div>
                        </div>)}
                    <div className="profile-buttons">
                        <button className="call-button"><CallIcon />Call</button>
                        <button className="profile-button"><ProfileIcon />Profile</button>
                    </div>
                </div>
                <div className="divider profile-divider"></div>
                <div className="profile-details">
                    <div className="details-box">
                        <div className="details">
                            <h4 className="details-header">Consumer Details</h4>
                            <div className="detail">
                                <div className="detail-heading">
                                    Email
                                </div>
                                <div className="detail-value">{email}</div>
                            </div>
                            <div className="detail">
                                <div className="detail-heading">
                                    First Name
                                </div>
                                <div className="detail-value">{fName}</div>
                            </div>
                            <div className="detail">
                                <div className="detail-heading">
                                    Last Name
                                </div>
                                <div className="detail-value">{lName}</div>
                            </div>
                            <a className="more-details" href="#">View more details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agent;