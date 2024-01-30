$(document).ready(function(){

    
    const startButton = $(".start-button");
    const popupInfo = $(".popup-info");
    const main = $(".main")
       
    startButton.click(function(){
        popupInfo.addClass("active");
        main.addClass("active");
    });
    
    $(document).mouseup(function(e){
        if($(e.target).closest(popupInfo).length===0){
            popupInfo.removeClass("active");
            main.removeClass("active")
        };
    });

    const hamburgerIcon = $(".hamburger-menu");
    const slidingMenu = $(".sliding-header-menu-outer");
    const closeButton = $(".close-icon");


    hamburgerIcon.click(() => {
        slidingMenu.addClass("show");
    });
 
    closeButton.click(() => {
        slidingMenu.removeClass("show");
    });
    





})





