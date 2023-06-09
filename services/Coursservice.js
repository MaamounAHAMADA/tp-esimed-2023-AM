import Mon_API from './service.js'



const API = new Mon_API()


class CoursService {
async AddCoursInGroup(groupcours){
    const url = 'cours/groupcours'
    await API.postFetch(url, groupcours)
}

    async AddAffirmationInCours(affirmationcours){
        const url = 'cours/affirmationcours'
        await API.postFetch(url, affirmationcours)
    }


    async createCours(cours) {
        const url = 'cours/createcours'
        try {
             await API.postFetch(url, cours)
        } catch (e) {
            console.log(e)
        }
    }

    async createAffirmation(affirmation) {
        const url = 'cours/createaffirmation'
        try {
            await API.postFetch(url, affirmation)
        } catch (e) {
            console.log(e)
        }
    }

async getCoursById (id){
    const url = `cours/`+ encodeURIComponent(id)
    try {
   let  cours =   await API.getFetch(url)
        return cours
    } catch (e) {
        console.log(e)
    }

}

    async getAffirmationById (id){
        const url = `cours/affirmation/searchbyid/`+ encodeURIComponent(id)
        try {
            let  affirmation =   await API.getFetch(url)
            console.log(affirmation)
            return affirmation
        } catch (e) {
            console.log(e)
        }

    }

    async getIdAffirmationByPhrase(phrase){

        let id_Affirmation;
        const url =`/cours/affirmation/`+ encodeURIComponent(phrase)
        const response = await API.getFetch(url)
        await response.json()
            .then((data) => {
                id_Affirmation = data.id
                return id_Affirmation;
            })
        return id_Affirmation;
    }
    async getCoursByName(nom_cours) {
        let id_Cours;
        const url = `/cours/search/`+ encodeURIComponent(nom_cours)
        const response = await API.getFetch(url, nom_cours);
        await response.json()
            .then((data) => {
                id_Cours = data.id
                return id_Cours;
            })
        return id_Cours;
    }

    async getAffirmationsOfCours (CourId){
        let url = 'cours/affirmationcours/'+ encodeURIComponent(CourId)
        try{
            let result =  await API.getFetch(url);
            console.log(result)
            return result
        }catch (e) {
            console.log("3")
            return result
        }
    }



    async deleteFalseAffirmatons (CourId) {
        let url = 'cours/affirmations/'+ encodeURIComponent(CourId)
        try{
            let result =  await API.deleteFetch(url)
            console.log(result)
            return result}catch (e) {
            console.log(e)
            return result

        }
    }

    async getCoursNamesOfGroup (GroupId) {
        let url = 'cours/groupcours/'+ encodeURIComponent(GroupId)
        try{
            let result =  await API.getFetch(url)

            console.log(result)

            return result}catch (e) {
            console.log("3")
            return result

        }
    }


    async changeStatut(CoursId, statut) {
        let url = 'cours/update/' + encodeURIComponent(CoursId);
        try {
            const body = {
                statut: statut
            };
            const response = await API.putFetch(url, body);
            if (response) {
                console.log('Le statut du cours a été modifié avec succès');
                console.log(response);

            } else {
                console.log('La modification du statut du cours a échoué');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la modification du statut du cours', error);

        }
    }


    async putTrue(affirmationId) {
        let url = 'cours/affirmation/puttrue/' + encodeURIComponent(affirmationId);
        try {
            await API.putFetch(url);
                console.log('Vrai inséré avec succès');
            }
         catch (error) {
            console.error('Une erreur s\'est produite lors de linsertion', error);

        }
    }




    async putFalse(affirmationId) {
        let url = 'cours/affirmation/putfalse/' + encodeURIComponent(affirmationId);
        try {
             await API.putFetch(url);
                console.log('Faux avec succès');
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la mise de faux', error);
        }
    }


}

export default CoursService;