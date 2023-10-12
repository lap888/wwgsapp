import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let HomeApi = {};

// HomeApi.getEquityDetail = (mobile) => { // mobile
//     return new Promise((resolve, reject) => {
//         Send(`api/GetUserByMobile?mobile=${mobile}`, {}, 'get')
//         .then((res) => {
//             if (res.code == 200) {
//                 resolve(res)
//             }else {
//                 Toast.tipTop(res.message)
//             }
//         })
//         .catch((err) =>{
//             reject(err)
//             console.log('err', err)
//         })
//     })
// }


// HomeApi.setContact = (params) => { // mobile
//     return new Promise((resolve, reject) => {
//         Send(`api/SetContact`, params)
//         .then((res) => {
//             if (res.code == 200) {
//                 resolve(res)
//             }else {
//                 Toast.tipTop(res.message)
//             }
//         })
//         .catch((err) =>{
//             reject(err)
//             console.log('err', err)
//         })
//     })
// }



export default HomeApi