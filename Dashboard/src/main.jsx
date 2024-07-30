import React,{useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContext } from './utils/UserContext.js'

const AppWrapper =()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  console.log(isAuthenticated);

  return(
  <UserContext.Provider value={{isAuthenticated,setIsAuthenticated,admin, setAdmin}}>
 <App />
  </UserContext.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>,
)
