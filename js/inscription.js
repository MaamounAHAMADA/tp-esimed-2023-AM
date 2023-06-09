import UserService from '../services/UserService.js';
const userService = new UserService();


window.addUser = function addUser() {

let email = document.getElementById("email").value;
let mdp = document.getElementById("motdepasse").value;
let nom = document.getElementById("nom").value;
let prenom = document.getElementById("prenom").value;
let pseudo = document.getElementById("pseudo").value;

const user = {
    nom : `${nom}`,
    prenom : `${prenom}`,
    motDePasse : `${mdp}`,
    pseudo : `${pseudo}`,
    email : `${email}`,
};
userService.createUser(user)
    .catch(error => {
        console.error(error);
    })

}


window.navigateOnLogin = function navigateOnLogin(){
    window.location = "index.html.html";
}