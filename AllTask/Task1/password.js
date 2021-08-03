
    $(document).ready(function() {
        $('form').on('submit', function (e) {
            e.preventDefault();

            if (!$('#email').val()) {
                if ($("#email").parent().next(".validation").length == 0) // only add if not added
                {
                    $("#email").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter email address</div>");
                }
            } else {
                $("#email").parent().next(".validation").remove(); // remove it
            }
            if (!$('#password').val()) {
                if ($("#password").parent().next(".validation").length == 0) // only add if not added
                {
                    $("#password").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter password</div>");

                }
            } else {
                $("#password").parent().next(".validation").remove(); // remove it
            }
        }); 
    });