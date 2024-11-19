import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
