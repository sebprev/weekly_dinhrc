const projetElem = document.getElementById('projet');
const nomPersonnesElem = document.getElementById('nomPersonnes');
const imgPersonnesElem = document.getElementById('imgPersonnes');
const progress = document.getElementById('pbar');
const time = document.getElementById('time');
const imgLeft = document.getElementById('imgLeft');
const imgRight = document.getElementById('imgRight');
const dateNow = document.getElementsByClassName("date")[0];
const timeNow = document.getElementsByClassName("time")[0];

let changementEnCours = undefined;

document.getElementById('btnStart').addEventListener('click', function(event) {
    document.getElementsByClassName('previous')[0].addEventListener('click', function(event) {
        if ((currentIndex > 0) && !changementEnCours) {
            currentIndex = currentIndex - 1;
            setChangementEnCours();
            start();
        }
    });

    document.getElementsByClassName('next')[0].addEventListener('click', function(event) {
        if (((currentIndex + 1) < data.length) && !changementEnCours) {
            currentIndex = currentIndex + 1;
            setChangementEnCours();
            start();
        }
    });

    start();
});

// Pour éviter qu'un dbl click (ou 2 clicks rapides) soit fasse 2 fois "suivant"
const setChangementEnCours = function() {
    changementEnCours = setTimeout(() => {
        clearTimeout(changementEnCours);
        changementEnCours = undefined;
    }, 1000);
}

let timerProgress = undefined;

let currentIndex = 0;

const start = function() {
    progress.className = "progress-bar";
    time.style.color = "white";

    if (currentIndex === 0) {
        imgLeft.className = "cache";
        imgRight.className = "";
    } else if ((currentIndex + 1) === data.length) {
        imgLeft.className = "";
        imgRight.className = "cache";
    } else {
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
    nomPersonnesElem.innerText = projet.personnes;
    let nomImage = 'Quelquun.png';
    if (projet.images) {
        nomImage = projet.images;
    }
    imgPersonnesElem.className = "";
    imgPersonnesElem.src = 'img/personnes/' + nomImage;
}

const initTimer = function(secondes) {
    let i = 0;
    let val = 1 / secondes * 100;
    let currentVal = 0;

    if (secondes === 0) {
        time.innerText = "00:00";
        setProgressValue('100%');
    } else {
        time.innerText = ("" + Math.floor(((secondes - i) / 60))).padStart(2, "0") + ":" + ("" + ((secondes - i) % 60)).padStart(2, "0");
        setProgressValue('0%');

        timerProgress = setInterval(function() {
            i = i + 1;
            currentVal = currentVal + val;
            setProgressValue(Math.round(currentVal) + '%');

            time.innerText = ("" + Math.floor(((secondes - i) / 60))).padStart(2, "0") + ":" + ("" + ((secondes - i) % 60)).padStart(2, "0");
            if (i === secondes) {
                clearInterval(timerProgress);
                timerProgress = undefined;
                progress.className = "progress-bar bg-danger";
                time.style.color = "red";
            }
            else if (i >= (secondes - 10)) {
                progress.className = "progress-bar bg-warning";
                time.style.color = "orange";
            }
        }, 1000);
    }

}

const setProgressValue = function(value) {
    progress.style.width = value;
    progress.innerText = value;
}

const initClock = function() {
    const d = new Date();
    dateNow.innerHTML = d.toLocaleDateString();
    timeNow.innerHTML = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    setInterval(function() {
        const d = new Date();
        timeNow.innerHTML = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    }, 1000);

}

// Polyfill pour le PADSTART
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
