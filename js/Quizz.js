import UserService from "../services/Userservice.js";
import GroupService from "../services/Groupservice.js";
import CoursService from "../services/Coursservice.js";

const coursService = new CoursService();

let count = 1;
let nbaffirmation = 1;


window.AffirmationOfCours = async function AffirmationOfCours (){

    try {
        let phrases =  await coursService.getAffirmationsOfCours(CoursId)
        await console.log(phrases)
        return phrases;
    }catch (erreur) {
        console.log(erreur);
    }

}

const CoursId = localStorage.getItem('coursId')
const CoursName = localStorage.getItem('courName')
let idaffirmation ='';
let cours = await coursService.getCoursById(CoursId)
let statut = cours.statut
let title = document.getElementById('title')
title.innerText = `${CoursName}`

if (statut == 1 )
{
    console.log("Statut = 1")

    statut = document.getElementById('statut1')
    statut.style.display = 'block';
    window.idAffirmationByPhrase = async function idAffirmationByPhrase (Affirmation) {
        Affirmation = document.getElementById(`affirmation-${count}`).value
        let idAffirmation = await coursService.getIdAffirmationByPhrase(Affirmation)

        setTimeout(() => {
            if (idAffirmation != "") {
                console.log(`Affirmation avec l'id ${idAffirmation}`);

            }
            return idAffirmation;
        }, 400);
        idaffirmation = idAffirmation;

    }



    window.AddAffirmation1 = async function (affirmation) {

        affirmation = document.getElementById(`affirmation-${count}`).value;
        try {
            const cours = {phrase: `${affirmation}`};
            await coursService.createAffirmation(cours);
            console.log("Affirmation Créé")
        }catch (erreur) {
            console.log("Affirmation NON CREE");
            return
        }

        try {
            console.log(affirmation)
            await idAffirmationByPhrase(affirmation);

        } catch (erreur) {
            console.log (erreur)
            console.log("Id affirmation Non trouvé");
            idaffirmation = ''
            return
        }

        const affirmationcours = {
            AffirmationId: `${idaffirmation}`,
            CourId : `${CoursId}`
        };
        setTimeout(async() => {
            let addincours = await coursService.AddAffirmationInCours(affirmationcours)
            console.log(addincours)
        }, 1500);
        const inputElement = document.getElementById(`affirmation-${count}`);
        const buttonElement = document.getElementById(`ajouter-button${count}`);
        const validerIcon = document.getElementById(`valider-icon${count}`);

        // Vérifier si l'input est vide
        if (inputElement.value.trim() === '') {
            return;
        }

        // Appliquer les changements
        buttonElement.style.display ="none"
        inputElement.classList.add('input-background');
        inputElement.readOnly = true;
        validerIcon.style.display ="block"

    }


    const addAffirmationWrapper = document.querySelector('#newaffirmation');

    const addAffirmationLink = document.querySelector('#addUserLink');



    addAffirmationLink.addEventListener('click', () => {
        count++;
        console.log(count);
        const newField = document.createElement('div');
        newField.style.display = "flex";
        newField.innerHTML = `
			<input type="text" class="form-field" name="affirmation-${count}" id="affirmation-${count}" placeholder="Affirmation ${count}" />
			<button type="button" id="ajouter-button${count}" onclick="AddAffirmation1()" style="display: block;">Valider</button> 
			<i class="fas fa-check-circle fa-3x hidden" id="valider-icon${count}" style="display: none;"></i>
		`;
        addAffirmationWrapper.appendChild(newField);

    });

    const button = document.createElement('button');
    button.innerText = "Saisie terminée";
    button.classList.add('btn', 'btn-primary', 'create-button');
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
// Ajout du bouton à la fin du corps de la page
    statut.appendChild(button);

    const newstatut = 2;
    const modal = document.getElementById('modaletape');
    const closeButton = document.querySelector('.close');
    const suivant = document.querySelector('.suivant');
    const annuler = document.querySelector('.non');
        button.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    annuler.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    suivant.addEventListener('click',async () => {
        modal.style.display = 'none';
        let new_statut =  await coursService.changeStatut(CoursId , newstatut);
        console.log(CoursId)
        console.log(  `newStatut =${new_statut}`)

        location.reload();
    });



}

if (statut == 2 )
{
    console.log("Statut = 2")
    statut = document.getElementById('statut2')
    statut.style.display = 'block';



   let affirmations =  await AffirmationOfCours()

        affirmations.forEach(affirmation => {
            // Créez une carte pour chaque affirmation
            nbaffirmation ++;
            const card = document.createElement('div');
            card.classList.add('card');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = `${affirmation}`;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = affirmation.phrase;


            const vraiBtn = document.createElement('button');
            vraiBtn.classList.add(`btn`, 'btn-success');
            vraiBtn.textContent = 'Vrai';
            vraiBtn.id = `btnV${nbaffirmation}`

            const fauxBtn = document.createElement('button');
            fauxBtn.classList.add(`btn`, 'btn-danger');
            fauxBtn.textContent = 'Faux';
            fauxBtn.id = `btnF${nbaffirmation}`

            // Ajoutez les éléments à la carte
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            cardBody.appendChild(vraiBtn);
            cardBody.appendChild(fauxBtn);

            card.appendChild(cardBody);


            document.getElementById('statut2').appendChild(card);

            // Gérer les événements des boutons Vrai et Faux
           let vrai = document.getElementById(`btnV${nbaffirmation}`)
            vrai.addEventListener("click", async function() {

                cardBody.style.backgroundColor = 'rgba(34, 139, 34, 0.45)';
                console.log("Bouton Vrai cliqué !");

               let  id_affirmation = await coursService.getIdAffirmationByPhrase(affirmation)
                await coursService.putTrue(id_affirmation)


            });

            let faux =document.getElementById(`btnF${nbaffirmation}`)
            faux.addEventListener("click", async function() {
                // Logique du bouton Faux
                console.log("Bouton Faux cliqué !");
                cardBody.style.backgroundColor = 'rgba(206, 34, 10, 0.45)'
                console.log(affirmation)
                let  id_affirmation = await coursService.getIdAffirmationByPhrase(affirmation)
                await coursService.putFalse(id_affirmation)
            });
        });





    const button = document.createElement('button');
    button.innerText = "Quizz terminé";
    button.classList.add('btn', 'btn-primary', 'create-button');
// Ajout du bouton à la fin du corps de la page
    document.body.appendChild(button);

    let newstatut = 3;

    const modal = document.getElementById('modaletape');
    const closeButton = document.querySelector('.close');
    const suivant = document.querySelector('.suivant');
    const annuler = document.querySelector('.non');
    button.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    annuler.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    suivant.addEventListener('click',async () => {
        modal.style.display = 'none';
        let new_statut =  await coursService.changeStatut(CoursId , newstatut);
        console.log(CoursId)
        console.log(  `newStatut =${new_statut}`)

        location.reload();
    });


}

if (statut == 3 )
{
    statut = document.getElementById('statut3')
    statut.style.display = 'block';
    console.log("3")

    let affirmations = await AffirmationOfCours()


    affirmations.forEach(async (affirmation) => {

        let id_affirmation = await coursService.getIdAffirmationByPhrase(affirmation)
        let thisaffirmation = await coursService.getAffirmationById(id_affirmation)
        let nb_vrai = thisaffirmation.nombre_vrai
        let nb_faux = thisaffirmation.nombre_faux
        // Créez une carte pour chaque affirmation
        nbaffirmation++;
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        if (nb_vrai == 0 && nb_faux > 0) {
            cardBody.style.backgroundColor = 'rgba(215, 30, 5, 0.65)'
        }
        else if (nb_faux == 0 && nb_vrai >0)
        {
            cardBody.style.backgroundColor = 'rgba(26, 151, 30, 0.65)'
        }

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `${affirmation}`;

        const cardVrai = document.createElement('p');
        cardVrai.classList.add('card-text');
        cardVrai.textContent = `Réponse vrai :${nb_vrai}`;

        const cardFaux = document.createElement('p');
        cardFaux.classList.add('card-text');
        cardFaux.textContent = `Réponse faux :${nb_faux}`;


        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardVrai);
        cardBody.appendChild(cardFaux);
        card.appendChild(cardBody);
        document.getElementById('statut3').appendChild(card);
    })
    const buttonrestart = document.createElement('button');
    buttonrestart.innerText = "Relancer une saisie";
    buttonrestart.classList.add('btn', 'btn-primary', 'create-button');

// Ajout du bouton à la fin du corps de la page
    document.body.appendChild(buttonrestart);
    const button = document.createElement('button');
    button.innerText = "Leçon finale";
    button.classList.add('btn', 'btn-primary', 'create-button');

// Ajout du bouton à la fin du corps de la page
    document.body.appendChild(button);
    const modal = document.getElementById('modaletape');
    const modal2 = document.getElementById('modalrestart');
    const closeButton = document.querySelector('.close');
    const suivant = document.querySelector('.suivant');
    const annuler = document.querySelector('.non');
    const annuler2 = document.querySelector('.annuler');

    const newstatut = 1

    buttonrestart.addEventListener('click', () => {
        modal2.style.display = 'block';
    });

    suivant.addEventListener('click',async () => {
        modal2.style.display = 'none';
        let new_statut =  await coursService.changeStatut(CoursId , newstatut);
        console.log(CoursId)
        console.log(  `newStatut =${new_statut}`)

        location.reload();
    });
    annuler2.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const statutFin = 4



        button.addEventListener('click', () => {
            modal.style.display = 'block';
            let modalbody = document.querySelector(".textesuivant")
            let question = document.querySelector(".question")
            let conseil = document.querySelector(".conseil")
            conseil.style.display = 'none' ;
            question.style.display = 'none'
            modalbody.innerText = "Seuls les affirmations ayant reçues 100% de réponses 'VRAI' figureront dans la leçon finale. Les autres affirmations seront supprimés"
            let modalHeader = document.querySelector("#myModalheader")
            modalHeader.style.backgroundColor = 'rgba(138, 43, 226, 0.58)'
          let modalTitle =  document.querySelector(".modal-title");
            modalTitle.style.display = 'none';
            modalHeader.innerHTML = "Leçon finale"
        });
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        annuler.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        suivant.addEventListener('click',async () => {

             await coursService.deleteFalseAffirmatons(CoursId);
             let new_statut =  await coursService.changeStatut(CoursId , statutFin);

            console.log(CoursId)
            console.log(  `newStatut =${new_statut}`)
            location.reload();
        });



}

if (statut == 4 )
{
    const nomcours = document.getElementById('title')
   const nomducours = nomcours.textContent
    console.log("4")
    statut = document.getElementById('statut4')
    statut.style.display = 'block';

    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerText = nomducours;
    cardHeader.style.backgroundColor = 'rgba(138, 43, 226, 0.58)'

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const affirmationList = document.createElement('ul');
    affirmationList.classList.add('list-aff');

    cardBody.appendChild(affirmationList);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    document.getElementById('statut4').appendChild(card);

    let affirmations = await AffirmationOfCours()


    affirmations.forEach(async (affirmation) => {

        const cardTitle = document.createElement('li');
        cardTitle.classList.add('card-title');
        cardTitle.classList.add('list-group-item');
        cardTitle.textContent = `${affirmation}`;

        affirmationList.appendChild(cardTitle);
    })
}

window.confirmDeconnexion = function confirmDeconnexion() {

    $(document).ready(function(){
        $(".logout").click(function(){
            $("#myModal").modal();
        });
    });
}

window.Deconnexion = function Deconnexion()
{
    localStorage.setItem('token',empty );
}
