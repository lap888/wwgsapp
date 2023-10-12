import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let TeamApi = {};


TeamApi.getTeamInfo = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Team/Info`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data)
            }else {
                Toast.tip(res.message)
                reject(res)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



export default TeamApi