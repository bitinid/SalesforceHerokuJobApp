export async function submitApplication(formData){
 const resp=await fetch("/api/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)});
 return resp.json();
}