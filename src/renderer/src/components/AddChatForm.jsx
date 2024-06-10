import { useState } from 'react'

function AddChatForm({ onCancelAddChatForm, onSumbitAddChatForm }) {
  const [formData, setFormData] = useState({ ip: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSumbitAddChatForm(formData)

    setFormData({
      ip: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 text-white font-mono border border-[#5D5D5D]">
      <h1 className="text-sm">Add a new server</h1>
      <div className="mt-6 space-x-4">
        <label htmlFor="ip" className="text-xs">
          Server IP:
        </label>
        <input
          type="text"
          id="ip"
          name="ip"
          value={formData.ip}
          onChange={handleInputChange}
          className="text-black focus:outline-none"
        />
      </div>
      <div className="flex justify-around mt-6">
        <button
          type="button"
          className="text-xs w-[90px] py-2 border border-[#5D5D5D] hover:bg-white hover:text-black active:bg-black active:text-white"
          onClick={onCancelAddChatForm}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-xs w-[90px] py-2 border border-[#5D5D5D] hover:bg-white hover:text-black active:bg-black active:text-white"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default AddChatForm
