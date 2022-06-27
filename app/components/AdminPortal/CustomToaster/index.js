import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomToaster() {
  return (
    <div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default CustomToaster;
