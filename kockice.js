

var scores = [0, 0]; //ukupni score
var roundScore = 0; //score u rundi prije nego što HOLD ili 1
var activePlayer = 0; //aktivni player
var gamePlaying = true;
var winningScore = 100;


//elementi HTML-a
var kockaSlika = document.querySelector(".dice"); //diceDOM
var kockaSlika2 = document.querySelector(".dice2");
var roundScore1Display = document.querySelector("#current-1");
var roundScore0Display = document.querySelector("#current-0");
var buttonRoll = document.querySelector(".btn-roll");
var player1ScoreGlobal = document.querySelector("#score-0");
var player2ScoreGlobal = document.querySelector("#score-1");

var player1UI = document.querySelector(".player-0-panel");
var player2UI = document.querySelector(".player-1-panel");
var holdBtn = document.querySelector(".btn-hold");
var newBtn = document.querySelector(".btn-new");
var numInput = document.querySelector("#inputWinningScore")

init();
//document.querySelector("#current-" + activePlayer).textContent = dice;

//document.querySelector("#current-" + activePlayer).innerHTML = "<strong>" + dice + "</strong>";

//var x = document.querySelector("#score-0").textContent;
//console.log(x)

var count = 0;
var lastRoll = 0;
var thisRoll;


buttonRoll.addEventListener("click", function () {
    if (gamePlaying) {
        //1.random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice, dice2);
        thisRoll = dice || dice;

        // 2. Display the result

        kockaSlika.style.display = "block";
        kockaSlika.src = "dice-" + dice + ".png";
        kockaSlika2.style.display = "block";
        kockaSlika2.src = "dice-" + dice2 + ".png";

        //3.update score if the roleld number isnt 1

        if (dice !== 1 && dice2 !==1) {
            //add score
            roundScore += (dice+dice2);
            document.querySelector("#current-" + activePlayer).textContent = roundScore
            if (dice === 6 || dice2===6) {
                lastRoll = 6;
                count +=1
            } else {
                lastRoll = 0;
                count = 0;
            }
            if (thisRoll === 6 && lastRoll === 6 && count === 2) {
                scores[activePlayer] = 0;
                player1ScoreGlobal.textContent = scores[0];
                player2ScoreGlobal.textContent = scores[1];
                console.log("sestica je dva puta za redom");
                sljedeciIgrac();

            }
        } else {
            //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            //  if (activePlayer === 0) {
            // activePlayer = 1
            //  } else {
            // activePlayer = 0
            // }
            sljedeciIgrac();
        }
    }

})

holdBtn.addEventListener("click", function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;
        //update UI
        player1ScoreGlobal.textContent = scores[0];
        player2ScoreGlobal.textContent = scores[1];

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            kockaSlika.style.display = "none";
            kockaSlika2.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            player1UI.classList.remove("active");
            player2UI.classList.remove("active");
            gamePlaying = false;
            

        }
        else {
            sljedeciIgrac()
        }
    }
       
      
})

function sljedeciIgrac() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    roundScore0Display.textContent = 0;
    roundScore1Display.textContent = 0;
    player1UI.classList.toggle("active");
    player2UI.classList.toggle("active");
    kockaSlika.style.display = "none";
    kockaSlika2.style.display = "none";
}

newBtn.addEventListener("click", function () {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    roundScore0Display.textContent = 0;
    roundScore1Display.textContent = 0;
    player1ScoreGlobal.textContent = 0;
    player2ScoreGlobal.textContent = 0;
    player2UI.classList.remove("winner");
    player1UI.classList.remove("winner");
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    player1UI.classList.remove("active");
    player2UI.classList.remove("active");
    player1UI.classList.add("active");
 
})

function init() {
    gamePlaying = true;
    player1ScoreGlobal.textContent = "0";
    player2ScoreGlobal.textContent = "0";
    roundScore0Display.textContent = "0";
    roundScore1Display.textContent = "0";
    kockaSlika.style.display = "none";
    kockaSlika2.style.display = "none";
    player2UI.classList.remove("winner");
    player1UI.classList.remove("winner");
    player1UI.classList.remove("active");
    player2UI.classList.remove("active");
    player1UI.classList.add("active");
}

numInput.addEventListener("change", function () {
    winningScore = Number(this.value); 
    
})
