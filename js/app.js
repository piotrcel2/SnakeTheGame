document.addEventListener("DOMContentLoaded", function(){
    
    var errorbox = document.getElementById("errorbox");
    var startbutton = document.getElementById("startbutton");
    var levelbuttons = document.getElementsByClassName("lvl");
    var infobox = document.getElementById("infobox");
    
    var snakelength = 3;
    var points = 0;
    var direction = 1; // 1-up, 2-right, 3-down, 4-left
    var gamestart = false;
    var leveltime = 0;
    var level = 0;
    var head = [11, 7];                 // współrzędne w kolejności -Y X
    var tail1st = [12, 8];
    var tail2nd = [13, 7];
    
    var rows = document.getElementsByClassName("row");
    console.log(rows);
    
    var arena = [];
    
    arena[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];    // początkowy układ- później 'streść'
    arena[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[11] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[12] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[13] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[14] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[16] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[17] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[18] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[19] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[20] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[21] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[22] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[23] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    
    
    errorbox.classList.add("hidden");                       // schowanie errorboxa dla błędnego startu
    
    
    startbutton.addEventListener("click", function(e){      // kliknięcie start!
        
        if (level == 0){
            
            errorbox.classList.remove("hidden");
            
        } else {
            
            errorbox.classList.add("hidden");
            infobox.classList.add("hidden");
            gamestart = true;
            console.log(level + " "  + leveltime)
            snakeisrunning();
            drawasnake();
            
        }
        
        
        
        
    })
    
    
    for (var i=0; i<levelbuttons.length; i++){                  // pętla dla przycisków leveli
        
        levelbuttons[i].addEventListener("click", function(e){
        
            for (var i=0; i<levelbuttons.length; i++){
                
                levelbuttons[i].style.color = "black";          // nadanie każdemu elementowi domyślnego koloru, na wypadek gdyby już wcześniej był wybrany
                
            }
            
            this.style.color = "crimson";                       // kolorowanie wybranego levela
            
            leveltime = this.dataset.lvltime;                           // ustanowienie czasu dla levela
            level = this.dataset.lvl;
            
        })
        
    }
    
    
    
    
    function snakeisrunning(){
        var timeon = setInterval(function () {  // FUNKCJA CHODZENIA WĘŻA !!
                
            console.log("tak sobie tylko działam");
            
            
        }, leveltime); // czas wyznaczony przez lvl   
    }
    
    
    

    
    function drawasnake(){
        
        for (var i=0; i<24; i++){               // tu przejeżdża po każdym rzędzie
            
            
            
            for (var j=0; j<16; j++){           // tu przejeżdża po każdym elemencie w rzędzie
                
                //console.log(arena[i][j]); // dzięki temu wyświetli nam każdą część areny
                
                if (arena[i][j] == 1){
                    
                    
                    console.log("znalazłem część węża!");
                    console.log(rows[i].children[j]);
                    
                    rows[i].children[j].style.backgroundColor = "sienna";
                    
                } else {
                    
                    rows[i].children[j].style.backgroundColor = "antiquewhite";
                    
                }
                
                
            }
            
            
        }
        
    };
    
    
});