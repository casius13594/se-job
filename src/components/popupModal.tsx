import Modal from "react-modal";

export function requireLogin(isOpen: boolean, onRequestClose: () => void) {
  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="require login"
        style={{ // Add the style prop
            content: {
              width: '25%',  // Adjust as needed
              height: '50%', // Adjust as needed
              margin: 'auto', // Center the modal
              background: "#13544e",
              borderRadius: '15px',
            }
          }}
        overlayClassName="Overlay"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-white">Login Required</h1>
          <p className="text-xl text-white">You need an account to save a job</p>
          <a
            href="/auth/login"
            className="bg-[#e3ce98] hover:bg-[#b09f75] text-[#13544e] font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </a>
          <a
            href="/auth/register"
            className="bg-[#e3ce98] hover:bg-[#b09f75] text-[#13544e] font-bold py-2 px-4 rounded mt-4"
          >
            Register
          </a>
          <button
            className="bg-[#e3ce98] hover:bg-[#b09f75] text-[#13544e] font-bold py-2 px-4 rounded mt-4"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </Modal>
  );
}
