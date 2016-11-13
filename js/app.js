document.addEventListener("DOMContentLoaded", function(){
    
    var errorbox = document.getElementById("errorbox");
    var startbutton = document.getElementById("startbutton");
    var levelbuttons = document.getElementsByClassName("lvl");
    var infobox = document.getElementById("infobox");
    var pointsbox = document.getElementById("points");
    var container = document.getElementById("container");
    var mainpointsbox = document.getElementById("pointsbox");
    
    var timeon; // deklaracja zmiennej odpowiedzialną za funkcję interwałową
    
    var points = 0;
    var direction = 1; // 1-up, 2-right, 3-down, 4-left
    var lastmovedirection = 1;  // ma zapobiec przełączeniu ruchu typu 'prawo -> dół,lewo' między ruchem węża -zapamiętuje ostatni krok
    var gamestart = false;
    var gameisover = false;
    var leveltime = 0;      // zmienna wyznaczająca czas (ms) między ruchami węża
    var level = 0;          // poziom trudności, wyznacza ilość punktów za jedzonko
    
    var snake = [];         // pierwotne współrzędne węża
    
    snake[0] = [11, 7];     // - snake[0] = głowa węża                          -- współrzędne w kolejności -Y X
    snake[1] = [12, 7];     // - snake[snake.length-2] = przedostatni element               czyli rząd -> kolumna
    snake[2] = [13, 7];     // - snake[snake.length-1] = dupa węża 
    
    
    var snakehead = snake[0];
    var snaketail = snake[snake.length-1];      // oznaczenie pierwszego i ostatniego elementu
    
    function refreshsnake(){                    // to samo co wyżej, pozwoli na proste odświeżenie, wywoływuj przy aktualizacji
        snakehead = snake[0];                   
        snaketail = snake[snake.length-1];
    }
    
    
    var snakeisfed = 0;             // 'najedzenie węża', ilość>=1 znaczy że ogon ma w danej chwili zostać w miejscu- wydłużamy węża
    var foodisplaced = false;       // zmienna pomocnicza dla losowania miejsca jedzenia
    var setfoodpls = false;         // zmienna która spowoduje wylosowanie miejsca jedzenia po wykonaniu ruchu (zapobiega pojawieniu się w                                                                                                                      miejsce ruchu)
    
    var rows = document.getElementsByClassName("row");  // wyznaczenie wszystkich rzędów mapy z drzewa dom
    
    var arena = [];
    
    arena[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];    // początkowy układ- do 'streszczenia'
    arena[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arena[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];            // '1' to część węża
    arena[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];            // '2' to jedzenie
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
    
    
    
    errorbox.classList.add("hidden");                       // schowanie errorboxa dla info o błędnym starcie
    
    
    startbutton.addEventListener("click", function(e){      // kliknięcie start!
        
        if (level == 0){                                // nie wybrano poziomu trudności
            
            errorbox.classList.remove("hidden");
            
        } else {                                        // start gry, chowamy elementy z info
            
            errorbox.classList.add("hidden");
            infobox.classList.add("hidden");
            level = parseInt(level);
            gamestart = true;
            
            placefood();            // wyznaczenie jedzonka
            drawasnake();           // narysowanie węża
            snakeisrunning();       // startuje interwał czasowy
            
        }
        
        
        
        
    })
    
    
    for (var i=0; i<levelbuttons.length; i++){                  // pętla dla przycisków leveli
        
        levelbuttons[i].addEventListener("click", function(e){
        
            for (var i=0; i<levelbuttons.length; i++){
                
                levelbuttons[i].style.color = "black";          // nadanie każdemu elementowi domyślnego koloru, na wypadek gdyby już wcześniej                                                                                                     był wybrany
                
                
                    //POPRAW PÓŹNIEJ- MA BYĆ PRZEZ NADAWANIE KLASY - PRZEZ BRAK TEGO EFEKT :HOVER DZIAŁA TYLKO RAZ!
                
            }
            
            this.style.color = "crimson";                       // kolorowanie wybranego levela
            
            leveltime = this.dataset.lvltime;                   // ustanowienie szybkości ruchu dla levela
            level = this.dataset.lvl;
            
        })
        
    }
    
    
    
    
    
    
    
    
    
    
    
    function snakeisrunning(){
        timeon = setInterval(function () {  // FUNKCJA CHODZENIA WĘŻA !!
                
            
            refreshsnake(); // odświeżenie głowy i ogona węża
            
            
            if (direction == 1){            //wąż idzie w GÓRĘ
                lastmovedirection = 1;
                
                if (snakehead[0] == 0 || arena[snakehead[0]-1][snakehead[1]] == 1) {     // uderzy głową w ścianę LUB w samego siebie - gameover
                    
                    gameover();
                    
                } else {                //tu się nie zabije
                    
                    if (arena[snakehead[0]-1][snakehead[1]] == 2){    //sprawdza czy znalazł jedzonko
                        snakeisfed = 2;
                        points += level;
                        
                        console.log(level);
                        console.log(points);
                        viewpoints();
                        
                        setfoodpls = true;  // umieszczanie jedzenia dajemy po ruchu gracza
                    }
                    
                    snake.unshift([snakehead[0]-1,snakehead[1]]); // przedkładamy 'przed' węża nowy jego element
                    
                    refreshsnake();                             // i odświeżamy. pamiętaj by usunąć ostatni, jeśli nienajedzony!
                                                                    // 'snake' zaktualizowany
                    arena[snakehead[0]][snakehead[1]] = 1;       //aktualizujemy 'arenę' (tutaj tylko krok do przodu, bez ruchu ogona!)
                    rows[snakehead[0]].children[snakehead[1]].style.backgroundColor = "sienna";   //aktualizujemy kolor mapy w nachodzonym polu
                    
                    //COFANIE OGONA PÓŹNIEJ!
                }
                    
        
                
            } else if (direction == 2){     //wąż idzie w PRAWO
                lastmovedirection = 2;
                
                if (snakehead[1] == 15 || arena[snakehead[0]][snakehead[1]+1] == 1) {
                    
                    gameover();
                    
                } else {   
                    
                    if (arena[snakehead[0]][snakehead[1]+1] == 2){  
                        snakeisfed = 2;
                        points += level;
                        viewpoints();
                        setfoodpls = true;
                    }
                    
                    snake.unshift([snakehead[0],snakehead[1]+1]);
                    refreshsnake(); 
                    arena[snakehead[0]][snakehead[1]] = 1;
                    rows[snakehead[0]].children[snakehead[1]].style.backgroundColor = "sienna"; 
                    
                }
                
            } else if (direction == 3){     //wąż idzie w DÓŁ
                lastmovedirection = 3;
                
                if (snakehead[0] == 23 || arena[snakehead[0]+1][snakehead[1]] == 1) {
                    
                    gameover();
                    
                } else {      
                    
                    if (arena[snakehead[0]+1][snakehead[1]] == 2){
                        snakeisfed = 2;
                        points += level;
                        viewpoints();
                        setfoodpls = true;
                    }
                    
                    snake.unshift([snakehead[0]+1,snakehead[1]]);
                    refreshsnake();
                    arena[snakehead[0]][snakehead[1]] = 1;
                    rows[snakehead[0]].children[snakehead[1]].style.backgroundColor = "sienna";
                    
                }
            
            } else if (direction == 4){     //wąż idzie w LEWO
                lastmovedirection = 4;
                
                if (snakehead[1] == 0 || arena[snakehead[0]][snakehead[1]-1] == 1) {
                    
                    gameover();
                    
                } else {
                    
                    if (arena[snakehead[0]][snakehead[1]-1] == 2){
                        snakeisfed = 2;
                        points += level;
                        viewpoints();
                        setfoodpls = true;
                        
                    }
                    
                    snake.unshift([snakehead[0],snakehead[1]-1]); 
                    refreshsnake(); 
                    arena[snakehead[0]][snakehead[1]] = 1; 
                    rows[snakehead[0]].children[snakehead[1]].style.backgroundColor = "sienna";
                    
                }
               
            }
            
            //dalsze poczynania węża + cofanie ogona
            
            if (snakeisfed > 0){    // tu nie cofamy ogona, bo wąż jest najedzony
                
                snakeisfed -= 1;
                
            } else {                // cofamy ogon
                
                arena[snaketail[0]][snaketail[1]] = 0;     //aktualizujemy 'arenę' - zabieramy ogon
                if ( gameisover==false ){
                    rows[snaketail[0]].children[snaketail[1]].style.backgroundColor = "antiquewhite";
                }
                snake.pop();    // aktualizacja tablicy 'snake' - usuwanie ostatniego elementu
                refreshsnake(); // aktualizujemy głowę i ogon węża
                
            }
            
            if (setfoodpls == true){    // jeśli jest prośba o rozlosowanie miejsca jedzenia- robi to i od razu poźniej POWINNO tę prośbę skasować
                
                placefood();
                setfoodpls = false;
                
            }
            

            
            
            
        }, leveltime); // czas wyznaczony przez wybrany lvl   
    }
    
    
    

    
    document.addEventListener("keydown", (function(e) {
        
        if (gamestart == true){
            
            switch(e.which) {
                    
            case 37: // lewo
                
                if (lastmovedirection != 2 && lastmovedirection != 4){
                    direction = 4;
                }
                
            break;

            case 38: // góra
                
                if (lastmovedirection != 1 && lastmovedirection != 3){
                    direction = 1;
                }
                
                    
            break;

            case 39: // prawo
                    
                if (lastmovedirection != 2 && lastmovedirection != 4){
                    direction = 2;
                }
                    
            break;

            case 40: // dół
                    
                if (lastmovedirection != 1 && lastmovedirection != 3){
                    direction = 3;
                }
                    
            break;

            default: return;
        }
            
        e.preventDefault();
            
        }
        
        
    }));
    
    
    
    
    function placefood(){           // losowanie miejsca żarełka na mapie
        
        while (foodisplaced == false) {
            
            
            var y = Math.floor(Math.random() * 23);
            var x = Math.floor(Math.random() * 15);
            
            if (arena[y][x] == 0){  
                
                arena[y][x] = 2;
                rows[y].children[x].style.backgroundColor = "olivedrab";
                foodisplaced = true;
            }
            
        }
        
        foodisplaced = false;   // na przyszłość od razu nastawiam bazowo na false
        
    }
    
    
    
    
    
    
    
    
    function drawasnake(){                      // rysowanie całego węża + żarełka choć to tylko na wszelki wypadek bo to nie działa stąd
                                                // w zasadzie działa tylko na początek więc równie dobrze mógłbym pokolorować ręcznie i byłoby szybciej
        
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
    
    
    function viewpoints(){                      // tu będziemy aktualizować punkty !!
        
        pointsbox.innerHTML = points;
        
    }
    
    
    
    function gameover(){                        // do rozbudowania
        
        gameisover = true;
        clearInterval(timeon);
        
        var x = 15;
        var y = 23;
        var gmolevel = 0;
        
        var interval1 = setInterval(function (){
            
        rows[y].children[x].style.backgroundColor = "sienna";
            
            if (gmolevel == 0){              // pierwszy dolny poziom
                x -= 1;
                if (x == 0){
                    gmolevel += 1;
                }
                
            }   else if (gmolevel == 1){
                y -= 1;
                if (y == 0){
                    gmolevel += 1;
                }
                
            }   else if (gmolevel == 2){  
                x += 1;
                if (x == 15){
                    gmolevel += 1;
                }
                
            }   else if (gmolevel == 3){
                y += 1;
                if (y == 22){
                    gmolevel += 1;
                }
                
            }   else if (gmolevel == 4){
                x -= 1;
                if (x == 1){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 5){
                y -= 1;
                if (y == 1){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 6){
                x += 1;
                if (x == 14){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 7){
                y += 1;
                if (y == 21){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 8){
                x -= 1;
                if (x == 2){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 9){
                y -= 1;
                if (y == 2){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 10){
                x += 1;
                if (x == 13){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 11){
                y += 1;
                if (y == 20){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 12){
                x -= 1;
                if (x == 3){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 13){
                y -= 1;
                if (y == 3){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 14){
                x += 1;
                if (x == 12){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 15){
                y += 1;
                if (y == 19){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 16){
                x -= 1;
                if (x == 4){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 17){
                y -= 1;
                if (y == 4){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 18){
                x += 1;
                if (x == 11){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 19){
                y += 1;
                if (y == 18){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 20){
                x -= 1;
                if (x == 5){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 21){
                y -= 1;
                if (y == 5){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 22){
                x += 1;
                if (x == 10){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 23){
                y += 1;
                if (y == 17){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 24){
                x -= 1;
                if (x == 6){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 25){
                y -= 1;
                if (y == 6){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 26){
                x += 1;
                if (x == 9){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 27){
                y += 1;
                if (y == 16){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 28){
                x -= 1;
                if (x == 7){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 29){
                y -= 1;
                if (y == 7){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 30){
                x += 1;
                if (x == 8){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 31){
                y += 1;
                if (y == 15){
                    gmolevel +=1;
                }
                
            }   else if (gmolevel == 32){
                gmolevel += 1;
                
            
            }   else {
                showpoints();
                clearInterval(interval1);
                
            }
            
            
            
        
            
        }, 6);
    
        function showpoints(){
            mainpointsbox.classList.add("pointsmax");
        }
        
        
       
        
        
        console.log("przegrałeś!");
        
    }
    
    
    
});

