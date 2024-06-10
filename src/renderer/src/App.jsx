import { useState, useEffect } from 'react'
import { testServerConnection, getServerData } from './lib/blocksay'
import AddChatForm from './components/AddChatForm'

function App() {
  const [showAddServerForm, setShowAddServerForm] = useState(false)
  const [servers, setServers] = useState([])
  const [currentServer, setCurrentServer] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const loadServers = async () => {
      try {
        const serverData = await window.blocksay.server.getAll()
        setServers(serverData)
      } catch (error) {
        console.error(`Failed to load servers: ${error}`)
      }
    }

    loadServers()
  }, [])

  const handleAddServerForm = async ({ ip }) => {
    try {
      const connectionIsValid = await testServerConnection(ip)

      if (!connectionIsValid) {
        console.error(`Failed to connect to server at ${ip}`)
        return
      }

      const serverData = await getServerData(ip)

      if (!serverData) {
        console.error(`Failed to get data from server at ${ip}`)
        return
      }

      await window.blocksay.server.add({ name: serverData.name, ip })

      setServers((prevServers) => [...prevServers, { name: serverData.name, ip }])
    } catch (error) {
      console.error(error)
    } finally {
      setShowAddServerForm(false)
    }
  }

  const handleServerSelection = async (ip) => {
    
    setCurrentServer(ip)
  }

  return (
    <>
      {showAddServerForm ? (
        <div className="flex h-lvh justify-center items-center antialiased">
          <AddChatForm
            onCancelAddChatForm={() => setShowAddServerForm(false)}
            onSumbitAddChatForm={handleAddServerForm}
          />
        </div>
      ) : (
        <div className="flex h-lvh bg-black text-white">
          {/* Sidebar */}
          <div className="w-[250px] flex flex-col border-r border-[#5D5D5D]">
            {/* Top area for draging */}
            <div className="h-12 drag"></div>
            {/* Sidebar content */}
            <div className="flex flex-col flex-1 p-3 gap-2">
              {/* List of servers */}
              <div className="flex flex-col flex-1 gap-2">
                <h1 className="font-mono">Servers</h1>
                {servers.map((server) =>
                  server.ip === currentServer ? (
                    <button
                      key={server.ip}
                      className="w-full h-8 button button-active"
                      onClick={() => handleServerSelection(server.ip)}
                    >
                      {server.name}
                    </button>
                  ) : (
                    <button
                      key={server.ip}
                      className="w-full h-8 button"
                      onClick={() => handleServerSelection(server.ip)}
                    >
                      {server.name}
                    </button>
                  )
                )}
              </div>
              {/* Add server button */}
              <button
                className="w-full h-8 button"
                type="button"
                onClick={() => setShowAddServerForm(true)}
              >
                +
              </button>
            </div>
          </div>
          {/* Chat area */}
          <div className="flex-1"></div>
        </div>
      )}
    </>
  )
}

export default App
