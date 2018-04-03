var previous = document.getElementsByClassName('previous')[0].addEventListener('click', function(event) {
    console.log('Click sur le précédent');
});

var next = document.getElementsByClassName('next')[0].addEventListener('click', function(event) {
    console.log('Click sur le précédent');
});

var timerProgress = undefined;

var initTimer = function(secondes) {
    var progress = document.getElementById('pbar');

    var i = 0;

    timerProgress = setInterval(function() {
        i = i + 1;
        progress.style.width = i + '%';
        progress.innerText = i + '%';
    }, 1000);

}