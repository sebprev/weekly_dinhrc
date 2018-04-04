const projetElem = document.getElementById('projet');
const personnesElem = document.getElementById('personnes');
const progress = document.getElementById('pbar');
const time = document.getElementById('time');
const imgLeft = document.getElementById('imgLeft');
const imgRight = document.getElementById('imgRight');

const previous = document.getElementsByClassName('previous')[0].addEventListener('click', function(event) {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
        start();
    }
});

const next = document.getElementsByClassName('next')[0].addEventListener('click', function(event) {
    if ((currentIndex + 1) < data.length) {
        currentIndex = currentIndex + 1;
        start();
    }
});

let timerProgress = undefined;

let currentIndex = 0;

const tmpFunc = function() {
    setTimeout(() => {
        start();
    }, 1000);
}

const start = function() {
    if (currentIndex === 0) {
        imgLeft.className = "cache";
    }
    else if ((currentIndex + 1) === data.length) {
        imgRight.className = "cache";
    }
    else {
        imgLeft.className = "";
        imgRight.className = "";
    }
    clearInterval(timerProgress);
    timerProgress = undefined;

    const currentProjet = data[currentIndex];
    changeProjet(currentProjet);
    initTimer(currentProjet.duree);
}

const changeProjet = function(projet) {
    projetElem.innerText = projet.projet;
    personnesElem.innerText = projet.personnes;
}

const initTimer = function(secondes) {
    let i = 0;
    let val = 1 / secondes * 100;
    let currentVal = 0;

    if (secondes === 0) {
        time.innerText = "00:00";
        progress.style.width = '100%';
        progress.innerText ='100%';
    }
    else {
        time.innerText = ("" + Math.floor(((secondes - i) / 60))).padStart(2, "0") + ":" + ("" + ((secondes - i) % 60)).padStart(2, "0");
    
        timerProgress = setInterval(function() {
            i = i + 1;
            currentVal = currentVal + val;
            progress.style.width = Math.round(currentVal) + '%';
            progress.innerText = Math.round(currentVal) + '%';
    
            time.innerText = ("" + Math.floor(((secondes - i) / 60))).padStart(2, "0") + ":" + ("" + ((secondes - i) % 60)).padStart(2, "0");
            if (i === secondes) {
                clearInterval(timerProgress);
                timerProgress = undefined;
            }
        }, 1000);
    }

}

// Ployfill pour le PADSTART
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length);
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}