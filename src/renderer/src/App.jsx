import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import AddChatForm from './components/AddChatForm'
import Chat from './components/Chat'

function App() {
  const [showAddServerForm, setShowAddServerForm] = useState(false)
  const [socketStatuses, setSocketStatuses] = useState({})
  const [currentServerIp, setCurrentServerIp] = useState(null)
  const [messages, setMessages] = useState(null)
  const [servers, setServers] = useState([])
  const [sockets, setSockets] = useState({})
  const [user, setUser] = useState('geust')
  const [isUsernameSet, setIsUsernameSet] = useState(false)

  const handleUsernameSet = (username) => {
    setUser(username)
    setIsUsernameSet(true)
  }

  useEffect(() => {
    ;(async () => {
      // Load servers from the database
      const servers = await window.blocksay.servers.getAll()
      setServers(servers)

      // Initialize sockets connections for each server
      const newSockets = {}
      for (const server of servers) {
        const socket = io(`http://${server.ip}:3000`)

        setSocketStatuses((prevStatuses) => ({ ...prevStatuses, [server.ip]: 'disconnected' }))

        socket.on('message', (message) => {
          setMessages((prevMessages) => {
            if (prevMessages && prevMessages[server.ip]) {
              return {
                ...prevMessages,
                [server.ip]: [...prevMessages[server.ip], message]
              }
            }
            return { [server.ip]: [message] }
          })
        })

        socket.on('messages', (messages) => {
          setMessages((prevMessages) => ({ ...prevMessages, [server.ip]: messages }))
        })

        socket.on('connect_error', () => {
          setSocketStatuses((prevStatuses) => ({ ...prevStatuses, [server.ip]: 'error' }))
          socket.close()
        })

        socket.on('connect', () => {
          setSocketStatuses((prevStatuses) => ({ ...prevStatuses, [server.ip]: 'connected' }))
        })

        socket.on('disconnect', () => {
          setSocketStatuses((prevStatuses) => ({ ...prevStatuses, [server.ip]: 'disconnected' }))
        })

        socket.emit('messages')

        newSockets[server.ip] = socket
      }
      setSockets(newSockets)
    })()

    return () => {
      // Close all sockets
      for (const socket in sockets) {
        socket.disconnect()
      }
    }
  }, [])

  const handleAddServerForm = async ({ ip }) => {
    try {
      const socket = io(`http://${ip}:3000`)
      socket.on('welcome', async (name) => {
        console.log(name, ip)
        // Add the server to the database
        await window.blocksay.servers.add({ name, ip })
        setServers((prevServers) => [...prevServers, { name, ip }])
        setSockets((prevSockets) => ({ ...prevSockets, [ip]: socket }))
        // // Stop listening to the welcome event
        socket.off('welcome')
      })
      socket.on('connect_error', (error) => {
        console.error(`Failed to connect to server at ${ip}: ${error}`)
        socket.close()
        return
      })
    } catch (error) {
      console.error(error)
    } finally {
      setShowAddServerForm(false)
    }
  }

  const handleMessageSend = async (content) => {
    if (currentServerIp) {
      sockets[currentServerIp].emit('message', { content, sender: user })
    }
  }

  const handleDeleteServer = async (server) => {
    setServers((prevServers) => {
      const serverToRemove = prevServers.find((s) => s.ip === server)
      if (serverToRemove) {
        sockets[serverToRemove.ip].disconnect()
      }
      return prevServers.filter((s) => s.ip !== server)
    })

    setCurrentServerIp(null)
    await window.blocksay.servers.delete(server)
  }

  return (
    <>
      {!isUsernameSet ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <UsernameForm onUsernameSet={handleUsernameSet} />
        </div>
      ) : (
        // ... rest of the return statement
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
                      server.ip === currentServerIp ? (
                        <button
                          key={server.ip}
                          className="w-full h-8 button button-active"
                          onClick={() => setCurrentServerIp(server.ip)}
                        >
                          {server.name} - {socketStatuses[server.ip]}
                        </button>
                      ) : (
                        <button
                          key={server.ip}
                          className="w-full h-8 button"
                          onClick={() => setCurrentServerIp(server.ip)}
                        >
                          {server.name} - {socketStatuses[server.ip]}
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
              <div className="flex-1">
                {currentServerIp && (
                  <div className=" flex-1 flex h-full flex-col">
                    {/* Header area */}
                    <div className="flex w-full justify-between p-3 items-center border-b border-[#5D5D5D]">
                      <h1 className="font-mono flex-1 grab">
                        {servers.find((server) => server.ip === currentServerIp).name}
                      </h1>
                      <button
                        onClick={() => handleDeleteServer(currentServerIp)}
                        className="button t px-2"
                      >
                        DELETE
                      </button>
                    </div>
                    {/* Chat area */}
                    <Chat
                      messages={
                        messages && messages[currentServerIp] ? messages[currentServerIp] : []
                      }
                      user={user}
                      onMessageSend={handleMessageSend}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

function UsernameForm({ onUsernameSet }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onUsernameSet(username)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button type="submit" className="button p-2">
        Set Username
      </button>
    </form>
  )
}

export default App
