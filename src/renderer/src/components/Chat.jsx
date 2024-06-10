import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import ChatHeader from './ChatHeader'
import chat from '../lib/chat'

function Chat({ onToggleSidebar }) {
  const scrollerRef = useRef(null)
  const [showScrollBottom, setShowScrollBottom] = useState(true)

  const messages = chat.messages.map((message) => {
    return message.sender === 'Bob' ? (
      <ChatMessage message={message} />
    ) : (
      <ChatMessage message={message} variant={true} />
    )
  })

  function checkScrollPosition() {
    const scroller = scrollerRef.current
    if (scroller) {
      const { scrollTop, scrollHeight, clientHeight } = scroller
      setShowScrollBottom(scrollTop + clientHeight < scrollHeight)
    }
  }

  function scrollToBottom() {
    const scroller = scrollerRef.current
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight
    }
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) {
      scroller.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition()
    }

    return function () {
      if (scroller) {
        scroller.removeEventListener('scroller', checkScrollPosition)
      }
    }
  }, [])

  return (
    <>
      <div className="flex flex-col w-full gap-3 p-3">
        <div className="flex w-full items-center border-b border-[#5D5D5D]">
          <ToggleSidebarButton onClick={onToggleSidebar} />
          <div className="flex-1">
            <ChatHeader chatName="testing" />
          </div>
        </div>
        <div
          className="flex-1 overflow-y-scroll antialiased space-y-5 relative"
          id="scroll_enabled"
          ref={scrollerRef}
        >
          {messages}
          {showScrollBottom && (
            <button
              onClick={scrollToBottom}
              type="button"
              className="fixed right-10 bottom-14 px-5 py-2 border font-mono text-[.7rem] border-[#5D5D5D] bg-black hover:bg-white hover:text-black active:bg-black active:text-white"
            >
              V
            </button>
          )}
        </div>
        <div>
          <div className="flex gap-5">
            <input
              className="flex-1 bg-black border text-[.7rem] font-mono border-[#5D5D5D] px-2 py-1 focus:ring-0 focus:outline-none"
              type="text"
            />
            <button
              className="border border-[#5D5D5D] px-4 py-1 font-mono text-[.7rem] hover:bg-white hover:text-black active:bg-black active:text-white"
              type="button"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


export default Chat
