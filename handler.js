'use strict';
const ControllerAlanzoka = require('./ControllerAlanzoka');
const apphuggy = require('./apphuggy');

module.exports.main = event => {
    let path = event.path;
    
    return new Promise(async (resolve, reject) => {
        try{
            if(path === "/traduzir"){
                let body = JSON.parse(event.body);
                // console.log("ESTE É O BODY EVENTO: ", body.messages.receivedMessage);
                // console.log("TOKEN API HUGGY: ", body.token);//descomentar
                // console.log("ESSE É O BODY EVENTO: ", body)//descomentar
                console.log("ESSE É O TOKEN: ", body.token)//descomentar
                // let apiKey = body.token;
                let apiKey = "7e602a1aa3c3f589c12710ba380b387b";
                let messagemTraduzir = body.messages.receivedAllMessage[0];//descomentar
                console.log("ESTE É O BODY COM O CHAT: ", messagemTraduzir.chat.id) // descomentar
                console.log("ESTA É A MENSAGEM A SER TRADUZIDA: ", messagemTraduzir.body);//descomentar
                // console.log("ESTE É O BODY EVENTO: ", body.message);
                let chatID = messagemTraduzir.chat.id;
                let message = messagemTraduzir.body; // decomentar
                // console.log("Essa é a mensagem: ",message)
                let mensagemCliente = await ControllerAlanzoka.translateMessage(message, chatID, apiKey);
                console.log("sucesso!");
                // console.log("ESTA É A MENSAGEM TRADUZIDA: ", mensagemCliente);
                
                // let mensagemTraduzida = mensagemCliente;
                // console.log("ESTA É A MENSAGEM TRADUZIDA: ", mensagemTraduzida);

                await apphuggy.sendLoopInternal(`Tradução: ${mensagemCliente}`, chatID, apiKey);
                
                return resolve({
                    statusCode: 200
                    // body: JSON.stringify(mensagemCliente)
                });
            }
        }catch(e){
            console.log("Erro na function", e);
            return reject({
                statusCode: 500,
                body: JSON.stringify("Erro")
            });
        }
    })
}