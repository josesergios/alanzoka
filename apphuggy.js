const apphuggy = module.exports = {};
const request = require('request');

apphuggy.sendLoopInternal = function(txt, chatID, apiKey){
    return new Promise((resolve, reject) => {
        request(
            {
                method: 'POST',
                url: 'https://api.huggy.io/v2/chats/' + chatID + '/messages',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({text: txt, isInternal: true})
            }, function (error, response, body) {
                
                // console.log('API KEY:', apiKey);
                console.log(`Huggy API message status: ${response.statusCode}, corpo: ${body}, chatID: ${chatID}`);
                console.log('Status msg:', response.statusCode);
                
                if (response.statusCode >= 400 || error) return reject(response.statusCode);
                
                // return resolve(response.statusCode);
                return resolve({
                    statusCode: 200
                });
            }
        );
    });
};

// apphuggy.sendLoop = function(txt, chatID, apiKey){
//     return new Promise((resolve, reject) => {
//         request(
//             {
//                 method: 'POST',
//                 url: 'https://api.huggy.io/v2/chats/' + chatID + '/messages',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Authorization': 'Bearer ' + apiKey
//                 },
//                 body: JSON.stringify({text: txt, isInternal: false})
//             }, function (error, response, body) {
                
//                 // console.log('API KEY:', apiKey);
//                 console.log(`Huggy API message status: ${response.statusCode}, corpo: ${body}, chatID: ${chatID}`);
//                 console.log('Status msg:', response.statusCode);
                
//                 if (response.statusCode >= 400 || error) return reject(response.statusCode);
                
//                 // return resolve(response.statusCode);
//                 return resolve({
//                     statusCode: 200
//                 });
//             }
//         );
//     });
// };