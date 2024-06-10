import { useState } from 'react'

function ToggleSidebarButton({ onClick }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleClick = () => {
    setIsSidebarVisible(!isSidebarVisible)
    onClick()
  }

  return (
  )
}

export default ToggleSidebarButton
