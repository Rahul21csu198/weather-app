// function a(callback) {
//     function b(callback) {
//         function c(callback) {
//             function d(callback) {
//                 callback(4, null)
//             }
//             d(callback)
//         }
//         c(callback)
//     }
//     b(callback)
// }

// a((data, err) => {
//     console.log(data, err)
// })


function a() {
 return new Promise((resolve, reject) => {
    resolve(1)
 })   
}

a().then((data) => console.log("Data -", data)).catch(err => console.log("Error -", err))