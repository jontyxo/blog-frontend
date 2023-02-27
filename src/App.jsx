import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { createBrowserRouter,createRoutesFromElements,Route,Link,Outlet,RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

import Contact from "./pages/contact/contact";

function App() {
  const {user}=useContext(Context)
  
  
  const router=createBrowserRouter(
    
    createRoutesFromElements(
      
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="/contact"
          element= {<Contact />} />
          <Route path="/register" element=
           {user ? <Homepage /> : <Register />} />
         <Route path="/login" element={user ? <Homepage /> : <Login />} />
         <Route path="/post/:id" element=
           {<Single />} />
         
        
      
          <Route path="/write" element={user ? <Write /> : <Login />} />
         <Route path="/settings" element=
           {user ? <Settings /> : <Login />} />
      

      </Route>
    )
  )

  return (
    // <Router>
    //   <Topbar />
    //   <Switch>
    //     <Route exact path="/">
    //       <Homepage />
    //     </Route>
    //     <Route path="/posts">
    //       <Homepage />
    //     </Route>
    //     <Route path="/register">
    //       {user ? <Homepage /> : <Register />}
    //     </Route>
    //     <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
    //     <Route path="/post/:id">
    //       <Single />
    //     </Route>
    //     <Route path="/contact">
    //       <Contact />
    //     </Route>
    //     <Route path="/write">{user ? <Write /> : <Login />}</Route>
    //     <Route path="/settings">
    //       {user ? <Settings /> : <Login />}
    //     </Route>
    //   </Switch>
    // </Router>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root=()=>{
  const {user,dispatch}=useContext(Context)

  const handleLogout=()=>{
dispatch({type:"LOGOUT"})
  }
  return (
    <>
        <div className="top">
      
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
        
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profilePic}
              alt=""
            />
            <span>Hi, {user.username}</span>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
       
      </div>
    </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
