import { useEffect,useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import "./homepage.css";
import axios from "axios"

export default function Homepage() {
  const[posts,setPosts]=useState([]);
  const [loading,setLoading] = useState(false);
  
  
  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await axios.get("/api/posts")
      console.log(response.data)
      setPosts(response.data)
    setLoading(false);

     
    }
    setLoading(true);
   fetchPosts();
  },[])

 
  return (
    <>
      <Header />
      {loading && 
      <span>dnfabjabalbdj</span>
      }
      <h1 className="h1home">Recent Blogs...</h1>
      <div className="home">
        <Posts posts={posts} />
      
      </div>
    </>
  );
}
