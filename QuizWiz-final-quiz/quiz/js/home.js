$(document).ready(function(){

    
    const startButton = $(".start-button");
    
    const popupInfo = $(".popup-info");
    const main = $(".main");
    const loggedInUser = localStorage.getItem('loggedInUser');


    
       
    startButton.click(function(){
        if (loggedInUser) {
            setTimeout(() => {
                window.location.href = 'quiz.html';
              }, 10);
        }
        else{

            popupInfo.addClass("active");
            main.addClass("active");
        }
    });
 
    $(document).mouseup(function(e){
    
    if($(e.target).closest(popupInfo).length===0){
            popupInfo.removeClass("active");
            main.removeClass("active")
        };
    });

    


})





