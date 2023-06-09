import API_URL from '../js/config.js';

const API = new Mon_API()

 class UserService {


    async auth (user) {

        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                console.log(data.token);
               window.location = 'accueil.html';

            })
    }






     async getUserNamesOfGroup (GroupId) {
         let url = 'group/usergroup/bygroup/'+ encodeURIComponent(GroupId)
         try{
             let result =  await API.getFetch(url)

             console.log(result)

             return result}catch (e) {
             console.log(e)
             return result

         }
     }



     async getUserByPseudo(pseudoUser) {
       // const token = localStorage.getItem('token')
        let id_User;
         const url = `/users/searchby/`+ encodeURIComponent(UserId) + '/' + encodeURIComponent(pseudoUser)
         const response = await API.getFetch(url, pseudoUser);
         await response.json()
            .then((data) => {
            id_User = data.id
                console.log(`${id_User}`)
            return id_User;
        })

        return id_User;
    }


     async getGroupeByName(nomGroupe) {
         let id_Groupe;
         const url = `/group/`+ encodeURIComponent(nomGroupe)
         const response = await API.getFetch(url, nomGroupe);
         await response.json()
             .then((data) => {
                 id_Groupe = data.id
                 return id_Groupe;
             })
         return id_Groupe;
     }

    async createUser(user) {

        const url = 'users'
        await API.postFetch(url, user)
    }

     async AddUserInGroup(user) {

             const url = 'group/usergroup'
             await API.postFetch(url, user)
         }



}

export default UserService;
