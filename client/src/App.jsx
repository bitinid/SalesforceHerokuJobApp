import React,{useState} from "react";
import { submitApplication } from "./api";
export default function App(){
 const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:"",resume:""});
 const [msg,setMsg]=useState("");
 const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
 const handleSubmit=async e=>{
  e.preventDefault();
  setMsg("Submitting application...");
  const result=await submitApplication(form);
  if(result.success) setMsg("Application submitted, Good Luck !");
  else setMsg("Error: "+(result.message||JSON.stringify(result)));
 };
 return(<div style={{padding:20,maxWidth:500,margin:"auto"}}>
  <h1>Job Application</h1>
  <form onSubmit={handleSubmit}>
   <input name="firstName" placeholder="First Name" required onChange={handleChange}/><br/>
   <input name="lastName" placeholder="Last Name" required onChange={handleChange}/><br/>
   <input name="email" placeholder="Email" type="email" required onChange={handleChange}/><br/>
   <input name="phone" placeholder="Phone" onChange={handleChange}/><br/>
   <textarea name="resume" placeholder="Resume" onChange={handleChange}></textarea><br/>
   <button type="submit">Submit</button>
  </form>
  <p>{msg}</p>
 </div>);
}
