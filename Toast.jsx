import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([]);
  const removeToast = (id) => {
    setToastList((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  const addToast = (message) => {
    let toastItem = { ...message };
    toastItem.id = uuidv4();

    let newToastList = [toastItem, ...toastList];
    setToastList(newToastList);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed"
        style={{
          bottom: "10px",
          right: "10px",
          zIndex: "100",
        }}
      >
        {toastList.map((x) => (
          <ToastComponent key={x.id} toast={x} removeToast={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const ToastComponent = ({ toast, removeToast }) => {
  useEffect(() => {
    var timeOut = setTimeout(() => {
      removeToast(toast.id);
    }, 2000);
  }, [removeToast]);
  switch (toast.type) {
    case "error":
      return <div className=" text-bg-danger p-3">{toast.message}</div>;
    case "warning":
      return <div className=" text-bg-warning p-3">{toast.message}</div>;
    default:
      return <div className=" text-bg-success p-3">{toast.message}</div>;
  }
};

export const useToast = () => useContext(ToastContext);
