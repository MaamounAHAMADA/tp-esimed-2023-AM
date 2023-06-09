//
import UserService from "../services/Userservice.js";
import GroupService from "../services/Groupservice.js";
const userService = new UserService();
const groupService = new GroupService();

const empty = "";
let count = 1;
let iduser = '';
let idgroup = '';
let fin_creation = false

//Vérifier qu'un user est bien identifié

window.Deconnexion = function Deconnexion() {
    localStorage.setItem('token',empty );
}

window.navigateOnAccueil = function navigateOnAccueil(){
    window.location = "accueil.html";
}


// Pour trouver l'id d'un groupe avec le nom saisi
window.idGroupeByName = async function idGroupeByName (nomduGroupe) {
    nomduGroupe = document.getElementById("nom").value
    let idGroupe = await userService.getGroupeByName(nomduGroupe)

    setTimeout(() => {
    if (idGroupe != "") {
        console.log(`Groupe avec l'id ${idGroupe}`);

    }
    return idGroupe;
    }, 400);
    idgroup = idGroupe;

}

//Trouver l'id d'un user avec le pseudo saisi
window.idUserByPseudo = async function idUserByPseudo (pseudoUser) {
    pseudoUser = document.getElementById(`user-${count}`).value
    let idUser = await userService.getUserByPseudo(pseudoUser)

    setTimeout(() => {
        if (idUser != "") {
            console.log(`Utilisateur avec l'id ${idUser}`);
        }
        return idUser;
    }, 400);
 iduser = idUser

}

// Ajouter un utilisateur dans un group grçace au pseudo de l'utilisateur et au nom du groupe
window.AddInGroupe = async  (IDuser) =>{
    if (fin_creation == false) {
        try {
            await idUserByPseudo();
        } catch (erreur) {
            console.log("erreur pseudo");
            iduser = ''
            return
        }}
        try {
            await idGroupeByName();
        } catch (erreur) {
            console.log("erreur groupe");
            idgroup = ''
            return
        }

        if (fin_creation == false) {
            IDuser =  iduser
        }
        if (fin_creation == true){
            IDuser = getUserIdConnect()
        }
      const usergroup = {
        UserId: `${IDuser}`,
        GroupId : `${idgroup}`
      };
    setTimeout(async() => {
        let addingroup = await userService.AddUserInGroup(usergroup)
        console.log(addingroup)
    }, 1500);

    function getUserIdConnect () {
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

    const inputElement = document.getElementById(`user-${count}`);
    const buttonElement = document.getElementById(`user${count}`);
    const validerIcon = document.getElementById('valider-icon');

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


// Affiche le formulaire d'ajout d'utilisateur seulement si le nom du groupe est valide et que la table groupe a pu se faire
window.displayAjout = async function displayAjout() {
    const formAjout = document.querySelector(".form-container");
    let nomDeGroupe = document.getElementById("nom").value;

    try {
        const group = {nomGroupe: `${nomDeGroupe}`};
        let creategroup = await groupService.createGroup(group)
        if (creategroup )
        {
            let confirm = "Nom de groupe valide";
            const confirmation = document.createElement("p");
            confirmation.setAttribute("class" ,'confirm');
            confirmation.innerHTML = confirm;
            $("p").appendChild(confirmation)
            console.log(`nom de Groupe valide`);
            formAjout.style.display = "block";
        }
        else {console.log( "Erreur : Impossible de créer le groupe")
        console.log(creategroup)
        }

    }catch (erreur) {
        console.log("erreur 3");
        return
    }

}

//Ajouter un nouveau champ de saisie vide pour ajouter un nouveau user au groupe avec le même fonctionnement que le champ de base
const addUserWrapper = document.querySelector('#newuser');
const addUserLink = document.querySelector('#addUserLink');

addUserLink.addEventListener('click', () => {
    count++;
    console.log(count);
    const newField = document.createElement('div');
    newField.style.display = "flex";
    newField.innerHTML = `
			<label class="new-label">Utilisateur ${count}:</label>
			<input type="text" class="form-field" name="user-${count}" id="user-${count}" placeholder="Entrez le pseudo de l'utilisateur ${count}" />
			<button type="button" id="user${count}" onclick="AddInGroupe()" style="display: block;">Ajouter</button> 
			<i class="fas fa-check-circle fa-3x hidden" id="valider-icon" style="display: none;" ></i>
		`;
    addUserWrapper.appendChild(newField);

});




// Me permet d'ajouter le user connecté au groupe qu'il a crée
window.finishCreate = async function (){
    fin_creation = true
     let UserConnect= getUserIdConnect()
     await AddInGroupe(UserConnect);
  
    setTimeout(async() => {
          window.location = 'groupes.html'
    }, 700);
}
