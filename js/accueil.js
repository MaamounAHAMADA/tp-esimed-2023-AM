const empty = "";



const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const content = document.querySelector('.content');

let currentIndex = -1;
const texts = [
    "Mon cours est EN COURS DE SAISIE : <br><br>C'est la première phase d'un cours. Il faut saisir tous ce que tu penses savoir <br>à propos du cours choisi, " +
    " phrase par phrase.<br><br> Un bouton est disponible pour ajouter autant d'affirmations que tu veux. <br> <br>Cette phase se fait individuellement.<br> Le quizz sera généré avec ces phrases.",
    "Mon cours est EN QUIZZ : <br> Le quizz est généré ! <br><br>Répond individuellement par VRAI ou FAUX à chaque affirmation",
    "Mon cours est EN RESULTAT : <br><br> Les affirmations de chacun sont affichées <br> Le nombre de personnes ayant répondu VRAI et FAUX aussi<br><br> Concertez-vous, discutez pour vous mettre d'accord.<br><br> Il est possible de relancer une SAISIE" +
    " si vous êtes pas satisfaits des résultats. <br>Il faudra cliquer sur le bouton correspondant.<br><br> Pour le statut leçon finale,<br> SEULS les affirmations ayant reçues 100% de réponse VRAI seront affichées.<br> Une leçon finale n'est plus modifiable.",
    "Mon cours est EN LECON FINALE : <br><br> Le cours est consultable par tous les membre du groupe et à tout moment !"
];

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        content.innerHTML = texts[currentIndex];
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < texts.length - 1) {
        currentIndex++;
        content.innerHTML = texts[currentIndex];
    }
});

const button = document.getElementById('button-accueil');
button.style.position = 'absolute';
button.style.left = '50%';
button.style.transform = 'translateX(-50%)';










function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("TOKEN VIDE")
       window.location = "index.html";
        return  false;
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        return decoded.exp > Date.now() / 1000;
    } catch (err) {
        return false;
    }
}

window.Deconnexion = function Deconnexion()
{
    localStorage.setItem('token',empty );
}

window.navigateOnCreateGroupe = function navigateOnCreateGroupe(){
    window.location = "createGroup.html";
}


window.confirmDeconnexion = function confirmDeconnexion() {
    $(document).ready(function() {
        $(".logout").click(function() {
            $("#myModal").modal();
        });
    });
}


