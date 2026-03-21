import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {AuthContext} from './AuthContext.jsx'
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;



export const ChatContext = createContext();

export const ChatProvider = ({children})=>{
  
  const [messages,setMessages]=useState([]);
  const [selectedUser,setSelectedUser]=useState(null)
  const [users,setUsers]=useState([]);
  const [unseenMessages,setUnseenMessages]= useState({})

  const {socket,axios} =useContext(AuthContext)
  
  const getUsers =async()=>{
    try {
        const {data}= await axios.get("/api/messages/users")
        if(data.success){
          setUsers(data.users);
          setUnseenMessages(data.unseenMessage || {})
        }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getMessages = async(userId)=>{
     try {
      const {data}= await axios.get(`/api/messages/${userId}`)
      if(data.success){
        setMessages(data.messages)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }
  const sendMessage = async(userId)=>{
    try{
  const {data}= await axios.get(`/api/messages/${userId}`)
      if(data.success){
        setMessages(data.messages)
      }
     } catch (error) {
      toast.error(error.message)
     }
    }
  const  subscribeToMessages = async ()=>{
    if(!socket) return;
    socket.on("newMessage",(newMessage)=>{
      if(selectedUser && newMessage.senderId === selectedUser._id){
        newMessage.seen = true;
        setMessages((prevMessages)=>[...prevMessages,newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`)
      } else{
         setUnseenMessages((prevUnseenMessages)=>({
           ...prevUnseenMessages,[newMessage.senderId] : prevUnseenMessages[newMessage.senderId]?
            prevUnseenMessages[newMessage.senderId]+1 :1
         }))


      }
    })

  }

  const unsubscribeFromMessages =()=>{
    if(socket) socket.off("newMessage")
  }

  useEffect(()=>{
    subscribeToMessages()
    return()=>unsubscribeFromMessages();
  },[socket,selectedUser])

  const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }
   return (<ChatContext.Provider value={value}>
       {children}
   </ChatContext.Provider>)
}