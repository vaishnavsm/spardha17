
var SERVER = 'http://127.0.0.1:8000/serv/';

jQuery(document).ready(function() {
	    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
				
    $('.login-form').on('submit', function(e) {
			
			var isClean = true;
			e.preventDefault();
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
					isClean=false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
			
			$(this).find('input.form-username').each(function(){
				var x = $(this).val();
				var atpos = x.indexOf("@");
    		var dotpos = x.lastIndexOf(".");
    		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        		$(this).addClass('input-error');
						isClean=false;
    		}
				else{
					$(this).removeClass('input-error');
				}
			});
    	if(isClean){
				loginPlayer($(this).find('#form-username').val(),$(this).find("#form-login-password").val());
			}
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], input[type="password"], input[type="tel"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
			
			e.preventDefault();
    	
			var isClean = true;
			var isRegdCollege = true;
			var college = -1;
			
    	$(this).find('input[type="text"], input[type="password"], input[type="tel"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
					if(!$(this).hasClass("form-college-name")) isClean=false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
			$(this).find('input.form-email').each(function(){
				var x = $(this).val();
				var atpos = x.indexOf("@");
    		var dotpos = x.lastIndexOf(".");
    		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        		$(this).addClass('input-error');
						isClean=false;
    		}
				else{
					$(this).removeClass('input-error');
				}
			});
			
			$(this).find('input.form-phone').each(function(){
				var IndianMobileRegex = /^(\+91|0)?([7-9][0-9]{9})$/
				if(IndianMobileRegex.test($(this).val())){
					$(this).removeClass('input-error');
				}
				else{
					$(this).addClass('input-error');
					isClean=false;
				}
			});
			
			$(this).find('.form-college-group').each(function(){
				if($(this).find('input[type=checkbox]').prop('checked')==false){
					isRegdCollege = true;
					var $sel = $(this).find('select');
					if($sel.val()==""){
							isClean=false;
						}
					else{
						college = $sel.val();
					}	
				}
				else{
					isRegdCollege = false;
						var $text = $(this).find('input[type=text]');
						if($text.val()==""){
							isClean=false;
						}
						else{
							college = $text.val();
						}
					}				
			});
			
			if(isClean){
				console.log("Ready!");
				if(!isRegdCollege){
					$.ajax({dataType: "json", type: "POST", url: SERVER+"college/model/", data:JSON.stringify({"CollegeName":college}), 
					success: function(response){
							console.log("response: %o",response);
							$("select.form-college").append("<option value='"+response["CollegeID"]+"'>"+response["CollegeName"]+"</option>");
							registerPlayer($(this).find("#form-name").val(),$(this).find("#form-email").val(),$(this).find("#form-password").val(), $(this).find("#form-phone").val(), response["CollegeID"]);
					}, 
					error: function(response){
							alert("College Registration Failed!");
							console.log("Response: %o",response);
					}});
				}else{
					registerPlayer($(this).find("#form-name").val(),$(this).find("#form-email").val(),$(this).find("#form-password").val(), $(this).find("#form-phone").val(), college);
				}
			}
			
    });
    
		
    
});


function registerPlayer(name, email, password, phone, college){
	$.ajax({dataType:"json", type: "POST", url: SERVER+"register/", data:JSON.stringify({"PlayerName":name, "Email":email, "Password": password, 
																																											 "PhoneNumber":phone, "CollegeID":college}),
					success: function(response){
						alert("Registration Success!");
						console.log("Response(Success): %o",response);
					},
				 	error: function(response){
						alert("Registration Failed!");
						console.log("Response(Fail): %o",response);
					}});
}

function loginPlayer(email, password){
	$.ajax({dataType:"json", type: "POST", url: SERVER+"login/", data:JSON.stringify({"Email":email, "Password": password}),
					success: function(response){
						Cookies.set('token',response['token'],{expires:1});
						console.log("Response(Success): %o",response);
						window.location="index.htm";
					},
				 	error: function(response){
						if(response.status==404){
							alert("Username or Password Incorrect");
						}
						else{alert("Login Failed!");}
						console.log("Response(Fail): %o",response);
					}});
}