
import UserService from "../services/Userservice.js";
import GroupService from "../services/Groupservice.js";
import CoursService from "../services/Coursservice.js";

const userService = new UserService();
const groupService = new GroupService();
const coursService = new CoursService();

const createButton = document.querySelector('.create-button');
const modal = document.getElementById('modalcours');
const closeButton = document.querySelector('.close');
const terminer = document.querySelector('.finish-button');
let idgroupe ='';
let idcours ='';

//Afficher le formulaire de création de groupe (modal)
createButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

//Faire disparaître le modal de création de groupe si click sur 'Close' ou 'Terminer'
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
terminer.addEventListener('click', () => {
    modal.style.display = 'none';
});

//Récupérer l'id de l'User connecté


//
window.idCoursByName = async function idCoursByName (nomduCours) {
    nomduCours = document.getElementById("nomCours").value
    let idCours = await coursService.getCoursByName(nomduCours)

    setTimeout(() => {
        if (idCours != "") {
            console.log(`Cours avec l'id ${idCours}`);

        }
        return idCours;
    }, 600);
    idcours = idCours;

}


window.idGroupByName = async function idGroupByName (nomduGroupe) {
    nomduGroupe = document.getElementById("select-list").value
    let idGroupe = await userService.getGroupeByName(nomduGroupe)

    setTimeout(() => {
        if (idGroupe != "") {
            console.log(`Groupe avec l'id ${idGroupe}`);

        }
        return idGroupe;
    }, 400);
    idgroupe = idGroupe;

}


//Récuperer le nom tous les groupes dans lesquels "idUser" apparaît
window.groupNamesOfUser = async function groupNamesOfUser (idUser){
    idUser = getUserId();
    try {
      let names =  await groupService.getGroupNamesOfUser(idUser)
       await console.log(names)
        return names;
    }catch (erreur) {
        console.log("erreur 2");
    }

}

window.CoursNamesOfGroup = async function (groupId){
    groupId = getUserId();
    try {
        let names =  await coursService.getCoursNamesOfGroup(groupId)
        await console.log(names)
        return names;
    }catch (erreur) {
        console.log("erreur 2");
    }

}


//Je récupère tous les noms des groupes dans lesquels le User connecté apparaît pour pouvoir faire une une liste dans un menu déroulant
const noms = await groupNamesOfUser();
const tableau = Object.values(noms);
const selectElement = document.getElementById('select-list');

console.log (tableau)
// Parcours des noms et création des options
tableau.forEach(function(valeur) {
    const optionElement = document.createElement("option");
    optionElement.textContent = valeur;
    selectElement.appendChild(optionElement);
});



//Ajouter un cours dans un groupe en créant une table table de jointure 'coursGroup'
window.AddCoursInGroupe = async  () =>{

    const nomdeCours = document.getElementById('nomCours').value;
    try {
        const cours = {nom_cours: `${nomdeCours}`};
        await coursService.createCours(cours);
        console.log("Cours Créé")
    }catch (erreur) {
        console.log("COURS NON CREE");
        return
    }

    const groupeChoisi = document.getElementById('select-list').value;
    try {
        await idGroupByName(groupeChoisi);
        console.log (groupeChoisi)
    } catch (erreur) {
        console.log (groupeChoisi)
        console.log("Id group Non trouvé");
        idgroupe = ''
        return
    }

    try {
        await idCoursByName();
    } catch (erreur) {
        console.log("erreur 1");
        idcours = ''
        return
    }


    window.getUserId = function getUserId () {
        const token = localStorage.getItem('token');
        console.log (token)
// Décoder la partie de contenu du JWT en Base64
        const base64Url = token.split('.')[1];
        console.log (base64Url)
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        console.log (base64)
        const decodedToken = JSON.parse(window.atob(base64));
        console.log (decodedToken)

// Extraire l'identifiant de l'utilisateur
        const userId = decodedToken.id
        console.log('ID de l\'utilisateur connecté :', userId);
        return userId
    }

    //Création de la table de jointure coursGroup
    const groupcours = {
        CourId: `${idcours}`,
        GroupeId: `${idgroupe}`
    };
    setTimeout(async () => {

        let addingroup = await coursService.AddCoursInGroup(groupcours)
        console.log(addingroup)
    }, 1500);

}

//Permet de mettre le bouton au centre
const button = document.getElementById('create-button');
button.style.position = 'absolute';
button.style.left = '50%';
button.style.transform = 'translateX(-50%)';



  async function QuizzAccess (coursTitle) {

      const CoursId = await coursService.getCoursByName(coursTitle);
      localStorage.setItem('coursId', CoursId);
      localStorage.setItem('courName', coursTitle);
      window.location = 'Quizz.html';
  }

















async function getGroupesOfUser() {

    const noms = await groupNamesOfUser();
    const tableau = Object.values(noms);
    createGroupesList(tableau);

}






async function createGroupesList(groupes) {
    const groupesListElement = document.getElementById('groupesList');


    for (const groupe of groupes) {

        const groupeCard = document.createElement('div');
        groupeCard.classList.add('col-md-4');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-4', 'p0');

        let groupId = await userService.getGroupeByName(groupe)
        try {
            card.setAttribute('data-groupid', groupId);
            console.log("SetAttributeFait")
        }
        catch (e) {
            console.log(e)
        }
        console.log(groupId)
        console.log (groupe)
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerText = groupe;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const coursList = document.createElement('ul');
        coursList.classList.add('list-group');


        cardBody.appendChild(coursList);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        groupeCard.appendChild(card);
        groupesListElement.appendChild(groupeCard);

        await  getCoursOfGroup(groupId);

    };
}

// Fonction pour créer la liste des cours d'un groupe
async function createCoursList(cours) {
    const coursListElement = document.createElement('ul');
    coursListElement.classList.add('list-group');


     cours.forEach(cour => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = cour;
         listItem.onclick = () => {
             QuizzAccess(cour); // Appelle la fonction quizzAccess
         };
       coursListElement.appendChild(listItem);

    });

     return coursListElement
}






async function getCoursOfGroup(groupId) {

    try {
        console.log (`Groupe ID Début = ${groupId}`)
        const cours = await coursService.getCoursNamesOfGroup(groupId);
        console.log (` -------------${cours}------------`)
        const coursListElement = await createCoursList(cours);

        const groupCard = document.querySelector(`#groupesList .card[data-groupid="${groupId}"]`);


        if (groupCard) {
            console.log ("YES")
            const cardBody = groupCard.querySelector('.card-body');
            cardBody.appendChild(coursListElement);

        } else {
            console.error(`PAS D'elément avec groupid ="${groupId}"`);
        }
    } catch (error) {
        console.error(`Une erreur s'est produite lors de la récupération des cours du groupe : ${error}`);
    }

}



getGroupesOfUser();





