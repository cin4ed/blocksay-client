function ChatMessage({ message, variant = false }) {
  return variant ? (
    <>
      <div className="text-mono space-y-2">
        <div className="bg-white w-fit text-black px-1 py-[3px]">
          <p className="text-[.6rem] uppercase">
            {message.sender} ({message.created_at})
          </p>
        </div>
        <div className="w-fit max-w-72 font-light text-[.6rem] font-mono border border-[#5D5D5D] p-[10px]">
          <p>{message.content}</p>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="text-mono space-y-2 flex flex-col items-end">
        <div className="bg-white w-fit text-black px-1 py-[3px] text-right">
          <p className="text-[.6rem] uppercase">
            {message.sender} ({message.created_at})
          </p>
        </div>
        <div className="w-fit max-w-72 font-light text-[.6rem] font-mono border border-[#5D5D5D] p-[10px]">
          <p>{message.content}</p>
        </div>
      </div>
    </>
  )
}

export default ChatMessage
