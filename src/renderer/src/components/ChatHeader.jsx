function ChatHeader({ chatName }) {
  return (
    <>
      <div className="flex justify-between pb-2 font-thin font-mono border-b border-[#5D5D5D]">
        <span>{chatName}</span>
        <button type="button" className="text-[.6rem] px-2 border border-[#5D5D5D]">
          ...
        </button>
      </div>
    </>
  )
}

export default ChatHeader
