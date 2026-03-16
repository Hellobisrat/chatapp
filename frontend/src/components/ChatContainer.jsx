import React,{useRef,useEffect} from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = ({selectedUser,setSelectedUser}) => {
  const scrollEnd = useRef()

  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({
        behavior:"smooth"
      })
    }
  },[])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* ----header---- */}
      <div className='flex items-center gap-3 mx-4 border-b border-stone-500'>
       <img src={assets.profile_martin} alt='' className='w-8 rounded-full'/>
       <p className='flex-1 text-lg text-black flex items-center gap-2'>Martin Johnson
       <span className='w-2 h-2 rounded-full bg-green-500'></span>
       </p>
       <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt='' className='md:hidden max-w-7'/>
       <img src={assets.help_icon} alt='' className='nax-md:hidden max-w-5'/>
      </div>
      {/* ----chat area---- */}
      <div className='flex flex-col h-[calc(100%-120px)}] overflow-y-scroll p-3 pb-6'>
       {messagesDummyData.map((message,index)=>(
        <div key={index} className={`flex items-end gap-2 justify-end 
        ${message.senderId !== '680f50e4f10f3cd2838ecf9' && 'flex-row-reverse'}`}>
          {message.image ? (
            <img src={message.image} alt='' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
          ) :(
            <p className={` p-2 max-w-[200px] md:text-sm font-light  text-black text-xs ${message.senderId==='680f50e410f3cd28382ecf9' ? 'rounded-br-none':
              'rounded-bl-none'}`}>{message.text}</p>
          )}
          <div className='text-center text-xs'>
            <img src={message.senderId==='680f50e4f10f3cd2838ecf9'?assets.avatar_icon : assets.profile_martin} alt=''
            className='w-7 rounded-full'/>
            <p className='text-gray-500'>{message.createdAt}</p>
          </div>

        </div>
       ))}
       <div ref={scrollEnd}></div>
      </div>
    </div>
  ) :(
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500
    bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' alt=''/>
      <p className='text-lg font-medium text-black
      rounded-lg mb-8 break-all bg-violet-500/30 '>Chat anytime,anywhere</p>

    </div>
  )
}

export default ChatContainer