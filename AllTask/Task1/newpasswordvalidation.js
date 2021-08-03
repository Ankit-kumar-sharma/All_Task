function verifyPassword()
{  
  var pw = document.getElementById("pswd").value; 
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  //check empty password field  
  if(pw == "") 
  {  
     document.getElementById("message").innerHTML = "**Fill the password please!";  
     document.getElementById("pswd").style.border="2px solid red"; 
     return false;  
  }  
  if(document.getElementById("pswd").value.match(decimal))
  {
     document.getElementById("message").innerHTML = "Password is correct";
     return true;
  }
  else
  {
     //minimum password length validation  
     if(pw.length < 8)
     {  
        document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";  
        document.getElementById("pswd").style.border="2px solid red"; 
        return false;  
     }  
    
     //maximum length of password validation  
     if(pw.length > 15) 
     {  
        document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";  
        document.getElementById("pswd").style.border="2px solid red"; 
        return false;  
     } 
      
     document.getElementById("message").innerHTML = "**Password must contain atleast one lower letter,one upper,one numeric digit and one special char.";  
     document.getElementById("pswd").style.border="2px solid red"; 
     return false;  
        
   } 
}  
 