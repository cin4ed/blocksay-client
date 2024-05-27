import Chat from './components/Chat'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="flex gap-2 h-lvh bg-black text-white">
        <div className="w-1/4 border-r border-[#5D5D5D]"></div>
        <Chat />
      </div>
    </>
  )
}

export default App
