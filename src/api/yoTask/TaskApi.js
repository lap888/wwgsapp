import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
// import { Toast } from "native-base";
let TaskApi = {};


TaskApi.startTask = () => { // 
    return new Promise((resolve, reject) => {
        Send(`api/System/DoTask`, {}, 'get')
        .then((res) => {
            resolve(res)
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

TaskApi.quickenTask = () => { // 
    return new Promise((resolve, reject) => {
        Send(`api/System/QuickenTask`, {}, 'get')
        .then((res) => {
            resolve(res)
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}




export default TaskApi