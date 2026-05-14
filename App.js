const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');

const T_INIT = 1500; // 25 min
const T_REP = 300;   // 5 min

let tempsInitial = T_INIT;
let tempsDeRepos = T_REP;
let pause = false;
let nbDeCycles = 0;
let ChronoEnMarche = false;
let travailEnCours = true; 
let timer;

// Fonction pour formater l'affichage proprement
function majAffichage(secondes, element) {
    const min = Math.trunc(secondes / 60);
    const sec = secondes % 60;
    element.innerText = `${min} : ${sec < 10 ? '0' + sec : sec}`;
}

// Initialisation
majAffichage(tempsInitial, affichageTravail);
majAffichage(tempsDeRepos, affichagePause);
cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;

btnGo.addEventListener('click', () => {
    if (ChronoEnMarche) return; // Empêche de lancer 10 timers en même temps
    ChronoEnMarche = true;

    timer = setInterval(() => {
        if (!pause) {
            if (travailEnCours) {
                if (tempsInitial > 0) {
                    tempsInitial--;
                    majAffichage(tempsInitial, affichageTravail);
                } else {
                    travailEnCours = false; // On passe au repos
                }
            } else {
                if (tempsDeRepos > 0) {
                    tempsDeRepos--;
                    majAffichage(tempsDeRepos, affichagePause);
                } else {
                    // Fin du repos, on repart sur un cycle
                    nbDeCycles++;
                    cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;
                    tempsInitial = T_INIT;
                    tempsDeRepos = T_REP;
                    travailEnCours = true;
                    majAffichage(tempsInitial, affichageTravail);
                    majAffichage(tempsDeRepos, affichagePause);
                }
            }
        }
    }, 1000);
});

btnPause.addEventListener('click', () => {
    pause = !pause;

    btnPause.innerHTML = pause
      ? `<img src="play2.png" class="Containers-btns img"> <br> Reprendre`
      : `<img src="pause-button.png" class="Containers-btns img"> <br> Pause`;
});        

btnReset.addEventListener('click', () => {
    clearInterval(timer);
    ChronoEnMarche = false;
    pause = false;
    travailEnCours = true;
    tempsInitial = T_INIT;
    tempsDeRepos = T_REP;
    nbDeCycles = 0;
    btnPause.innerText = "Pause";
    majAffichage(tempsInitial, affichageTravail);
    majAffichage(tempsDeRepos, affichagePause);
    cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;
});