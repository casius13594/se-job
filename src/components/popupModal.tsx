
import Modal from 'react-modal';

export function requireLogin(isOpen: boolean, onRequestClose: () => void) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="require login"
            className= ""
            overlayClassName="Overlay"
        >
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Login Required</h1>
                <p className="text-xl">You need an account to save a job</p>
                <a href="/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Login</a>
                <a href="/auth/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Register</a>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
}