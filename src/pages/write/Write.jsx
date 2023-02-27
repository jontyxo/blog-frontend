import { useContext, useState } from "react";
import "./write.css";
import axios from "axios"
import { Context } from "../../context/Context";
import MoonLoader from "react-spinners/MoonLoader";



export default function Write() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const [posting,setPosting]=useState(false);
  const {user}=useContext(Context)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
      title,
      username:user.username,
      desc
    }
    if(file){
      const formData=new FormData();
    
    
      formData.append("file",file)
      formData.append("upload_preset","urde6fpz")
const res=      await axios.post("https://api.cloudinary.com/v1_1/dvjc0fusx/image/upload",formData)
console.log(res)       
const photoid=res.data.public_id.split("/")[1];
        console.log(photoid);
       newPost.photo=photoid;

   



    }
    try{
      setPosting(true);
      const res=await axios.post("/api/posts",newPost);
      setPosting(false);

      window.location.replace("/post/"+res.data._id)

    }
    catch(err){

    }
  }

  return (
    <div className="write">
    {
posting &&
<div className="moonloaderWrite">
<span className="moonloaderSpan">Posting</span>

    <MoonLoader 
    color="#000"
    loading={posting}
    
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
</div>
    }
    {file && 
      <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
    }
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} 
            onChange={(e)=>setFile(e.target.files[0])}
          />
           {/* <input id="fileInput" onClick={()=>{widgetRef.current.open()}} 
           
          /> */}
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDesc(e.target.value)}

          />
        </div>
        <button className="writeSubmit" type="submit" disabled={posting}>
          Publish
        </button>
      </form>
    </div>
  );
}
