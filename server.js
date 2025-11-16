const express=require("express");
const fetch=require("node-fetch");
const path=require("path");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
const CLIENT_ID=process.env.SF_CLIENT_ID;
const CLIENT_SECRET=process.env.SF_CLIENT_SECRET;
const USERNAME=process.env.SF_USERNAME;
const PASSWORD=process.env.SF_PASSWORD;
const SECURITY_TOKEN=process.env.SF_SECURITY_TOKEN;
const LOGIN_URL="https://login.salesforce.com";
const APEX_REST_URL=process.env.SF_API_URL;
app.post("/api/submit", async(req,res)=>{
 try{
  const tokenResp=await fetch(`${LOGIN_URL}/services/oauth2/token`,{
   method:"POST",
   headers:{"Content-Type":"application/x-www-form-urlencoded"},
   body:new URLSearchParams({
    grant_type:"password",
    client_id:CLIENT_ID,
    client_secret:CLIENT_SECRET,
    username:USERNAME,
    password:PASSWORD+SECURITY_TOKEN
   })
  });
  const tokenData=await tokenResp.json();
  if(!tokenData.access_token) return res.status(500).json(tokenData);
  const apexResp=await fetch(APEX_REST_URL,{
   method:"POST",
   headers:{
    "Authorization":`Bearer ${tokenData.access_token}`,
    "Content-Type":"application/json"
   },
   body:JSON.stringify(req.body)
  });
  const result=await apexResp.json();
  res.json(result);
 }catch(err){console.error(err); res.status(500).json({error:err.message});}
});
app.use(express.static(path.join(__dirname,"client","build")));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"client","build","index.html")));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));