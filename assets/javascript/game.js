var albumArray = ["alligator", "baboon", "bats", "cats","cheetah","chipmunk","cougar","dog","dolphin","elephant","kittens","lion",
                  "monkey","penguin","puppy","rhino","squirrel","whale","wolf","zebra"];
var letterSelectedArray = [];
var numberOfWins = 0;
var numberofgueses = 12;
var letterPosition = [];
var finalword = [];
var computerGuess = "";
var wordchr = "#word"
var gameFinished = false;
var snd = new Audio;


var albumProperty = {
    // Properties of albumProperty object.
    alligator: "This is Alligator!!!",
    baboon: "This is Baboon!!!",
    bats: "This is Bat!!",
    cats: "These are cute Cats!!!",
    cheetah: "This is Cheetah!!!",
    chipmunk: "This is Chipmonk!!!",
    cougar: "This is Cougar!!",
    dog: "This is Dog!!!",
    dolphin: "This is Dolphin!!!",
    elephant: "This is Elephant!!!",
    kittens: "These are Kittens!!",
    lion: "This is Lion!!!",
    monkey: "This is Monkey!!!",
    penguin: "This is Penguin!!!",
    puppy: "These are cute Puppies!!!",
    rhino: "This is Rhino!!",
    squirrel: "This is Squirrel!!!",
    whale: "This is Whale!!!",
    wolf: "This is Wolf!!!",
    zebra: "These are Zebra!!",
  
    soundArray: ["assets/wav/alligator3.wav",
        "assets/wav/baboon.wav",
        "assets/wav/batschatter.wav",
        "assets/wav/cats.wav",
        "assets/wav/Cheetah.wav",
        "assets/wav/Chipmonk.wav",
        "assets/wav/cougar.wav",
        "assets/wav/dog.wav",
        "assets/wav/dolphin.wav",
        "assets/wav/elephant.wav",
        "assets/wav/kitten.wav",
        "assets/wav/lion.wav",
        "assets/wav/monkey.wav",
        "assets/wav/penguin.wav",
        "assets/wav/pup.wav",
        "assets/wav/rhino.wav",
        "assets/wav/squirrel.wav",
        "assets/wav/whale.wav",
        "assets/wav/wolf.wav",
        "assets/wav/zebra.wav"],            

    imageArray: ["assets/images/alligator-910.jpg",
        "assets/images/baboon.jpg",
        "assets/images/bats.jpg",
        "assets/images/cats.jpg",
        "assets/images/cheetah.jpg",
        "assets/images/chipmunks.jpg",
        "assets/images/Cougar.jpg",
        "assets/images/dog.jpg" ,              
        "assets/images/dolphine.jpg", 
        "assets/images/elephant.jpg",
        "assets/images/kittens.jpg",
        "assets/images/lion.jpg",
        "assets/images/monkey.jpg",
        "assets/images/penguins.jpg",
        "assets/images/puppies.jpg",
        "assets/images/rhino.jpg",
        "assets/images/squirrel.jpg" ,              
        "assets/images/whale.jpg", 
        "assets/images/wolves.jpg",
        "assets/images/zebra.jpg"],                       

    soundFunction: function (indexnum) {
        document.getElementById("animal-image").style.cssText = "display: block";
        document.getElementById("animal-image").src = this.imageArray[indexnum];
        var soundSource = this.soundArray[indexnum];
        snd = new Audio(soundSource);
        snd.play();
      
    }
};

//get computer guess
var computerGuessWord = function () {
    this.computerGuess = albumArray[Math.floor(Math.random() * albumArray.length)];
    console.log("in computerGuess :" + computerGuess);

};



//displays number of guesses remaining and words filled
var displayData = function () {
    document.querySelector("#guessRemaining").textContent = numberofgueses;
    document.querySelector("#letterArray").textContent = letterSelectedArray;
};


//displays letters user already selected
var displayLetters = function (userlet) {
    for (var i = 0; i < letterPosition.length; i++) {
        if (letterPosition[i] !== "") {
            var wordindex = letterPosition[i]
            wordchr = ""; wordchr = "#word";
            wordchr = wordchr + wordindex;
            finalword[wordindex] = userlet;
            document.querySelector(wordchr).textContent = userlet;
        }
    }
};

//saves letter positions in ComputerGuessed
var checkletterInPropery = function (userletter) {
    letterPosition = [];
    var pos = computerGuess.indexOf(userletter);
    while (pos > -1) {
        letterPosition.push(pos);
        pos = computerGuess.indexOf(userletter, pos + 1);
    }
};

//checks for Win
var checkWin = function () {
    var checkfinalwork = "";
    for (var i = 0; i < finalword.length; i++) {
        checkfinalwork = checkfinalwork + finalword[i];
    }

     if (checkfinalwork === computerGuess) {
        numberOfWins += 1;
        document.querySelector("#nameOfAnimal").textContent = albumProperty[checkfinalwork];
        document.querySelector("#userWins").textContent = numberOfWins;
        var soundindex = 0;
        soundindex = albumArray.indexOf(checkfinalwork);
        if (soundindex !== -1) {
            albumProperty.soundFunction(soundindex);
        }

        gameFinished = true;

    }
};

//checks for Lost
var checkLose = function () {
    if (numberofgueses === 0) {
        document.querySelector("#nameOfAnimal").textContent = "You Lost!!!!";
        var soundindex = 0;
        document.getElementById("animal-image").style.cssText = "display: block";
        document.getElementById("animal-image").src = "assets/images/lost.jpg";
        snd = new Audio( "assets/wav/fail-trombone-01.wav");
        snd.play();
       
        gameFinished = true;
    }
};


//Check User letter and reduce guesses
var checkUserLetter = function (userlet) {
    if (numberofgueses > 0) {
        if (letterSelectedArray.indexOf(userlet) === -1) {
            letterSelectedArray.push(userlet);
            numberofgueses -= 1;
        }
    }
};

//Reset Game
var resetGame = function () {
    letterSelectedArray = [];
    numberofgueses = 12;
    finalword = [];

    for (var i = 0; i < computerGuess.length; i++) {
        wordchr = ""; wordchr = "#word"; wordchr = wordchr + i;
        document.querySelector(wordchr).textContent = "-";
    }
    
    document.getElementById("animal-image").style.cssText = "display: none";
    document.getElementById("animal-image").src = "";
    document.querySelector("#nameOfAnimal").textContent = "";
    snd.pause();
    displayData();
    computerGuessWord();
};

//GAME STARTUP //
computerGuessWord();

document.onkeyup = function (event) {
    if (gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        var userLetter = String.fromCharCode(event.keyCode).toLowerCase();
        checkUserLetter(userLetter);
        displayData();
        checkletterInPropery(userLetter);
        displayLetters(userLetter);
        checkWin();
        checkLose();
    }
};
