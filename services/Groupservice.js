import API_URL from '../js/config.js';
import Mon_API from './service.js'

const API = new Mon_API()



class GroupService {
    async createGroup(group) {
        let value
        let result = true;
        const url = 'group/create'
        try {
         let postFetch =  await API.postFetch(url, group)
         if (postFetch === true){
                result = true
                return result
            }
          else if (postFetch === false)
          {
              console.log("PostFetch = false")
              result = false
              return result
          }

        } catch (e) {
            console.log("Erreur création group")
            result = false
            return result

        }

    }



    async getGroupNamesOfUser (UserId) {
        let url = 'group/usergroup/'+ encodeURIComponent(UserId)
        try{
        let result =  await API.getFetch(url)

        console.log(result)

        return result}catch (e) {
            console.log("Erreur get Group Names")
            return result

        }
    }

    async findUsergroup (UserId,GroupeId) {
        let usergroupid;

        const url = `/group/oneusergroup/`+ encodeURIComponent(UserId) + '/' + encodeURIComponent(GroupeId)
        const response = await API.getFetch(url, nom_cours);
        await response.json()
            .then((data) => {
                usergroupid = data.id
                console.log(data)
                console.log(usergroupid)
                return usergroupid;
            })
        console.log(`RETURN ${usergroupid}`)
        return usergroupid;
    }


    async quitGroup (id) {
        let url = 'group/usergroup/'+ encodeURIComponent(id)
        try{
            let result =  await API.deleteFetch(url)
            console.log(result)
            return result
        }catch (e) {
            console.log(e)
            return result

        }
    }

}
export default GroupService;
