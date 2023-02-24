import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { createBrowserRouter,createRoutesFromElements,Route,Link,Outlet,RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { Context, ContextProvider } from "./context/Context";

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

  return (
    <>
        <Topbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
