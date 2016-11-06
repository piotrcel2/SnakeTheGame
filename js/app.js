document.addEventListener("DOMContentLoaded", function(){
    
    var errorbox = document.getElementById("errorbox");
    var startbutton = document.getElementById("startbutton");
    var levelbuttons = document.getElementsByClassName("lvl");
    var infobox = document.getElementById("infobox");
    
    var snakelength = 3;
    var points = 0;
    var direction = 1; // 1-up, 2-right, 3-down, 4-left
    var gamestart = false;
    var level = 0;
    var head = [8, 12];
    var tail = [8, 14];
    
    var rows = [];
    
    
    errorbox.classList.add("hidden");                       // schowanie errorboxa dla błędnego startu
    
    
    startbutton.addEventListener("click", function(e){      // kliknięcie start!
        
        if (level == 0){
            
            errorbox.classList.remove("hidden");
            
        } else {
            
            errorbox.classList.add("hidden");
            infobox.classList.add("hidden");
            console.log(level); 
        }
        
        
        
        
    })
    
    
    for (var i=0; i<levelbuttons.length; i++){                  // pętla dla przycisków leveli
        
        levelbuttons[i].addEventListener("click", function(e){
        
            for (var i=0; i<levelbuttons.length; i++){
                
                levelbuttons[i].style.color = "black";          // nadanie każdemu elementowi domyślnego koloru, na wypadek gdyby już wcześniej był wybrany
                
            }
            
            this.style.color = "crimson";                       // kolorowanie wybranego levela
            
            level = this.dataset.lvl;                           // ustanowienie levela
            console.log("wybierasz level " + this.dataset.lvl); 
            
        });
        
    }
    
    
    
    
    
    
    
    
    
    function resetboard(){
        
        
    }
    
    
    
    
    
    function drawasnake(){
        
        
    };
    
    
});