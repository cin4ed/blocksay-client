import { io } from 'socket.io-client'

export function testServerConnection(ip) {
  return new Promise((resolve) => {
    const socket = io(`http://${ip}:3000`)

    socket.on('connect', () => {
      socket.disconnect()
      resolve(true)
    })

    socket.on('connect_error', () => {
      socket.disconnect()
      resolve(false)
    })
  })
}

export function getServerData(ip) {
  return new Promise((resolve) => {
    const socket = io(`http://${ip}:3000`)

    socket.emit('requestData')

    socket.on('serverData', (data) => {
      socket.disconnect()
      resolve(data)
    })
  })
}

export const chat = {
  groupName: 'Weekend Plans',
  participants: ['Alice', 'Bob', 'Charlie', 'Dana'],
  messages: [
    {
      sender: 'Alice',
      message: 'Hi everyone! What are we doing this weekend?',
      timestamp: '2024-05-20T18:30:00Z'
    },
    {
      sender: 'Bob',
      message: 'I was thinking we could go hiking on Saturday. What do you all think?',
      timestamp: '2024-05-20T18:32:00Z'
    },
    {
      sender: 'Charlie',
      message: 'Hiking sounds great! Where were you thinking of going?',
      timestamp: '2024-05-20T18:34:00Z'
    },
    {
      sender: 'Bob',
      message: 'How about the Green Valley Trail? It’s not too far and has some amazing views.',
      timestamp: '2024-05-20T18:35:00Z'
    },
    {
      sender: 'Dana',
      message: 'I’m in! What time should we meet?',
      timestamp: '2024-05-20T18:36:00Z'
    },
    {
      sender: 'Alice',
      message: 'How about 9 AM at the trailhead?',
      timestamp: '2024-05-20T18:37:00Z'
    },
    {
      sender: 'Charlie',
      message: '9 AM works for me. Don’t forget to bring water and snacks!',
      timestamp: '2024-05-20T18:38:00Z'
    },
    {
      sender: 'Bob',
      message: 'I’ll bring some energy bars and fruit.',
      timestamp: '2024-05-20T18:39:00Z'
    },
    {
      sender: 'Dana',
      message: 'I’ll pack a first aid kit just in case. Should we carpool?',
      timestamp: '2024-05-20T18:40:00Z'
    },
    {
      sender: 'Alice',
      message: 'Good idea. I can drive. Who needs a ride?',
      timestamp: '2024-05-20T18:41:00Z'
    },
    {
      sender: 'Charlie',
      message: 'I do. Can you pick me up at 8:30?',
      timestamp: '2024-05-20T18:42:00Z'
    },
    {
      sender: 'Bob',
      message: 'Me too. I’ll be ready by 8:30 as well.',
      timestamp: '2024-05-20T18:43:00Z'
    },
    {
      sender: 'Dana',
      message: 'I’ll drive myself since I have some errands to run afterwards.',
      timestamp: '2024-05-20T18:44:00Z'
    },
    {
      sender: 'Alice',
      message: 'Sounds like a plan! See you all at 8:30. Don’t forget to wear comfortable shoes!',
      timestamp: '2024-05-20T18:45:00Z'
    },
    {
      sender: 'Bob',
      message: 'Looking forward to it!',
      timestamp: '2024-05-20T18:46:00Z'
    },
    {
      sender: 'Charlie',
      message: 'Me too!',
      timestamp: '2024-05-20T18:47:00Z'
    },
    {
      sender: 'Dana',
      message: 'Can’t wait! See you all on Saturday.',
      timestamp: '2024-05-20T18:48:00Z'
    }
  ]
}
