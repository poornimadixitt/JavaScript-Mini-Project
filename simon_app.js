let gameSeq = [];
let userSeq = [];
let highestLevel = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

//Step-1
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game has started");
        started = true;

        levelUp();
    }
});


//Step-2
function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 150);
}

function levelUp(){
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    //console.log("Random Index = ", randIdx);
    let randColor = btns[randIdx];
    //console.log("Random Color = ", randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    //console.log("Random Button = ", randBtn);

    gameSeq.push(randColor);
    console.log("Game Sequence = ", gameSeq);

    //random btn choose
    gameFlash(randBtn);
}

function checkAns(idx){
    //console.log("Current Level = ", level);

    //let idx = level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 150);
        }
    } else{
        highestLevel.push(level);
        console.log("highestLevel =", highestLevel);

        let highest = 0;
        for(let i=0; i<highestLevel.length; i++){
            if(highestLevel[i] > highest){
                highest = highestLevel[i];
            }
        }

        h2.innerHTML = `Game over. <br> Your highest score till now is ${highest}. <br> Your current score is ${level}!! <br> Press any key to restart. `;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        reset();
    }
}

function btnPress(){
    //console.log(this);
    let btn = this;

    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
