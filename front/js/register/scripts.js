
jQuery(document).ready(function() {
	
    
    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
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
    		}
				else{
					$(this).removeClass('input-error');
				}
			});
    	
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], input[type="password"], input[type="tel"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], input[type="tel"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
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
				}
			});
			
    });
    
    
});
