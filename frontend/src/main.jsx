import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContext } from "./utils/UserContext.js";



const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  

  return (
    <UserContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <App />
    </UserContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode >
    <AppWrapper />
  </React.StrictMode>
);
