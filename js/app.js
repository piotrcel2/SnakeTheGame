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
    
    var snakeisfed = 0;             // każda '1' zatrzymuje na jeden ciągnięcie się ogona
    var foodisplaced = false;
    
    var rows = document.getElementsByClassName("row");
    
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
            
            placefood();
            drawasnake();
            snakeisrunning();
            
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
                
            //console.log("tak sobie tylko działam"); // funkcja wywoływana co każdy krok!
            
            
        
            
            
            

            
            
            
        }, leveltime); // czas wyznaczony przez lvl   
    }
    
    
    

    
    document.addEventListener("keydown", (function(e) {
        
        if (gamestart == true){
            
            switch(e.which) {
                    
            case 37: // lewo
                
                if (direction != 2 && direction != 4){
                    direction = 4;
                }
                
            break;

            case 38: // góra
                
                if (direction != 1 && direction != 3){
                    direction = 1;
                }
                
                    
            break;

            case 39: // prawo
                    
                if (direction != 2 && direction != 4){
                    direction = 2;
                }
                    
            break;

            case 40: // dół
                    
                if (direction != 1 && direction != 3){
                    direction = 3;
                }
                    
            break;

            default: return;
        }
            
        e.preventDefault();
            
        }
        
        
    }));
    
    
    
    
    //  Math.floor((Math.random() * 10) + 1)    -random number
    
    function placefood(){           // losowanie miejsca żarełka na mapie
        
        while (foodisplaced == false) {
            
            
            var x = Math.floor(Math.random() * 23);
            var y = Math.floor(Math.random() * 15);
            
            if (arena[x][y] == 0){
                
                arena[x][y] = 2;
                rows[x].children[y].style.backgroundColor = "olivedrab";
                foodisplaced = true;
            }
            
        }
        
    }
    
    
    
    
    function drawasnakelite(){
        
        
    }
    
    
    
    function drawasnake(){                      // rysowanie całego węża + żarełka choć to nie będzie działało tutaj
        
        for (var i=0; i<24; i++){               // tu wyliczy każdy rząd
            
            for (var j=0; j<16; j++){           // tu wyliczy każdy element każdego rzędu
                
                //console.log(arena[i][j]); // dzięki temu wyświetliłoby nam każdą część areny logicznie - 0/1  /2 (żarełko)
                
                if (arena[i][j] == 1){
                    
                    rows[i].children[j].style.backgroundColor = "sienna";
                    
                } else if (arena[i][j] == 2){
                    
                    rows[i].children[j].style.backgroundColor = "olivedrab";
                    
                } else {
                    
                    rows[i].children[j].style.backgroundColor = "antiquewhite";
                
                }
                
                
            }
            
            
        }
        
    };
    
    
    
    
});