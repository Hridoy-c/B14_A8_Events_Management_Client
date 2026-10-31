"use client";

import { ToastContainer, type ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider(props: ToastContainerProps) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      newestOnTop
      closeOnClick
      draggable
      pauseOnHover
      pauseOnFocusLoss
      limit={3}
      theme="colored"
      {...props}
    />
  );
}
