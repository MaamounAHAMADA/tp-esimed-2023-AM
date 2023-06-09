
import UserService from "../services/Userservice.js";
import GroupService from "../services/Groupservice.js";

const userService = new UserService();
const groupService = new GroupService();



window.groupNamesOfUser = async function groupNamesOfUser (idUser){
    idUser = getUserId();
    try {
        let names =  await groupService.getGroupNamesOfUser(idUser)
        await console.log(names)
        return names;
    }catch (erreur) {
        console.log("erreur group  names");
    }

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

window.UserNamesOfGroup = async function (groupId){
    groupId = getUserId();
    try {
        let pseudos =  await userService.getUserNamesOfGroup(groupId)
        await console.log(pseudos)
        return pseudos;
    }catch (erreur) {
        console.log("erreur UserNames");
    }

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

        const buttonQuit = document.createElement('button');
        buttonQuit.classList.add('button-quit');
        buttonQuit.innerText = 'Quitter ce groupe'
        buttonQuit.setAttribute('this-groupid', groupId)






        // Appeler la fonction pour récupérer les cours associés au groupe


        cardBody.appendChild(coursList);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        groupeCard.appendChild(card);
        groupesListElement.appendChild(groupeCard);
        card.appendChild(buttonQuit)

        const modal = document.getElementById('modalcours');
        buttonQuit.addEventListener('click', () => {
            modal.style.display = 'block';
            localStorage.setItem('groupId' , groupId)
        });




        const closeButton = document.querySelector('.close');
        const confirm = document.querySelector('.confirm-button');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        confirm.addEventListener('click', async  () => {

            await QuitGroup()
        });

        await  getCoursOfGroup(groupId);

    };
}

async function QuitGroup () {
    let userId = await getUserId()
    let pseu = "rayray"
    console.log (userId)
    console.log("--------")
let groupId = localStorage.getItem('groupId')

    let usergroup = await groupService.findUsergroup(userId, groupId)
    console.log (usergroup)
    await userService.getUserByPseudo(pseu)
    await groupService.quitGroup(usergroup)
    location.reload()

    console.log (`ID USERGROUP${usergroup}`)
}


async function createUsersList(users) {
    const userListElement = document.createElement('ul');
    userListElement.classList.add('list-group');


    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = user;
        listItem.onclick = () => {
        };
        userListElement.appendChild(listItem);

    });

    return userListElement
}




const button = document.getElementById('create-button');
button.style.position = 'absolute';
button.style.left = '50%';
button.style.transform = 'translateX(-50%)';


async function getCoursOfGroup(groupId) {

    try {
        console.log (`Groupe ID Début = ${groupId}`)
        const user = await userService.getUserNamesOfGroup(groupId);
        console.log (` -------------${user}------------`)
        const userListElement = await createUsersList(user);

        const groupCard = document.querySelector(`#groupesList .card[data-groupid="${groupId}"]`);

        if (groupCard) {
            console.log ("YES")
            const cardBody = groupCard.querySelector('.card-body');
            cardBody.appendChild(userListElement);

        } else {
            console.error(`PAS D'elément avec groupid ="${groupId}"`);
        }
    } catch (error) {
        console.error(`Une erreur s'est produite lors de la récupération des cours du groupe : ${error}`);
    }

}



getGroupesOfUser();
