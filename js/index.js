import API_URL from './config.js';
import UserService from "../services/Userservice.js";

const userService = new UserService();


window.inscription = function inscription() {
    window.location = 'inscription.html';
 }


 window.validateLogin = function validateLogin() {

     let email = document.getElementById("email").value;
     let mdp = document.getElementById("mdp").value;
     const user = {
         motDePasse : `${mdp}`,
         email : `${email}`
         };
     let auth =  userService.auth(user);

 }
















