function AddChatButton({ onClick }) {
  return (
    <button
      type="button"
      className="px-4 py-2 border border-[#5D5D5D] hover:bg-white hover:text-black active:bg-black active:text-white"
      onClick={onClick}
    >
      +
    </button>
  )
}

export default AddChatButton
