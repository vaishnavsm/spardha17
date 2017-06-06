$(document).ready(function(){
  
    //Good Selects
    $('select').select2({width:'100%', placeholder: "Select College", allowClear: false});
  
  
    /*
        Fullscreen background
    */
		
    $.backstretch(['./images/register/s1.jpg','./images/register/s2.jpg',
									'./images/register/s3.jpg','./images/register/s4.jpg',
									'./images/register/s5.jpg','./images/register/s6.jpg',
									'./images/register/s7.jpg'],{duration: 3000, fade: 700});
    
    $("input[type='checkbox'].form-other-college").change(function(){
      if(this.checked){
        $("input[type='text'].form-college-name").removeClass("invisible");
        $("input[type='text'].form-college-name").addClass("visible");
      }
      else{
        $("input[type='text'].form-college-name").addClass("invisible");
        $("input[type='text'].form-college-name").removeClass("visible");
      }
    });
  
});