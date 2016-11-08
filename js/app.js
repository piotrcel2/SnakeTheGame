document.addEventListener("DOMContentLoaded", function(){
    
    var errorbox = document.getElementById("errorbox");
    var startbutton = document.getElementById("startbutton");
    var levelbuttons = document.getElementsByClassName("lvl");
    var infobox = document.getElementById("infobox");
    var pointsbox = document.getElementById("points");
    
    var timeon; // deklaracja zmiennej odpowiedzialną za funkcję interwałową
    
    var points = 0;
    var direction = 1; // 1-up, 2-right, 3-down, 4-left
    var lastmovedirection = 1;  // ma zapobiec przełączeniu ruchu typu 'prawo -> dół,lewo między ruchem węża) zapamiętuje ostatni krok
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
                rows[snaketail[0]].children[snaketail[1]].style.backgroundColor = "antiquewhite";
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
                                                // w zasadzie działa tylko na początek więc później zrób to ręcznie!!
        
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
        console.log("przegrałeś!");
        clearInterval(timeon);
        
    }
    
    
    
});

