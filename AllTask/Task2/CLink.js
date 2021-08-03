function myFunction()
{
    var copyText=document.getElementById("clink");
    copyText.select();
    copyText.setSelectionRange(0,999999)
    document.execCommand("copy");
    document.getElementById('cp').innerHTML="Copied";
    
}