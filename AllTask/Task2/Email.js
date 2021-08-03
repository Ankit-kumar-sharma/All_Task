function ValidateEmail(inputText)
        {
          var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if(inputText.value.match(mailformat))
          {
            document.getElementById('message').innerHTML="Valid Email address";
            document.getElementById('inbdemo').style.outlineColor="blue";
            document.getElementById('inbdemo').style.border="2px solid blue";
            document.form1.text1.focus();
            return true;
          }
          else
          {
            document.getElementById('message').innerHTML="!Please Insert valid Email address";
            document.getElementById('inbdemo').style.outlineColor="red";
            document.getElementById('inbdemo').style.border="2px solid red";
            document.form1.text1.focus();
            return false;   
          }
        }