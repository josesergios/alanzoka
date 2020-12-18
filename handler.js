'use strict';
const ControllerAlanzoka = require('./ControllerAlanzoka');
const apphuggy = require('./apphuggy');
// const controllerMisc = require('./controllerMisc');

module.exports.main = event => {
    let path = event.path;
    
    return new Promise(async (resolve, reject) => {
        try{
            

             //receivedAllMessage
            if(path === "/traduzir"){ //Endpoint que recebe o webhook da huggy

                let body = JSON.parse(event.body); //variável que recebe o event do webhook
                let internal = body.messages.receivedAllMessage[0]; //variavel que recebe um valor que veio no event
                if (internal.is_internal === true) {//condição quee verifica se é mensagem interna
                    return resolve({
                        statusCode: 200,
                        body: "Mensagem já traduzida"
                    });     
                }

                let apiKey = "7e602a1aa3c3f589c12710ba380b387b"; //token da conta do cliente
                let messagemTraduzir = body.messages.receivedAllMessage[0]; // variavel que recebe o texto que será traduzido
                let chatID = messagemTraduzir.chat.id; //variável que pega o ID do chat do cliente
                let message = messagemTraduzir.body; 

                console.log("ESTA É A MENSAGEM A SER TRADUZIDA:", messagemTraduzir.body);
                let mensagemCliente = await ControllerAlanzoka.translateMessage(message); //essa variável está recebendo o retorno do método que realiza a tradução do texto
                console.log("sucesso!");
                // console.log("É MENSAGEM INTERNA?: ", internal.is_internal);
                // console.log("ESTE É O BODY COM O CHAT: ", messagemTraduzir.chat.id) 

                /*
            if(path === "/traduzir"){
                let body = JSON.parse(event.body);
                // console.log("ESTE É O BODY EVENTO: ", body.messages.receivedMessage);
                // console.log("TOKEN API HUGGY: ", body.token);//descomentar
                // console.log("ESSE É O BODY EVENTO: ", body)//descomentar
                console.log("ESSE É O TOKEN: ", body.token)//descomentar
                // let apiKey = body.token;
                let apiKey = "7e602a1aa3c3f589c12710ba380b387b";
                let messagemTraduzir = body.messages.receivedMessage[0];//descomentar
                console.log("ESTE É O BODY COM O CHAT: ", messagemTraduzir.chat.id) // descomentar
                console.log("ESTA É A MENSAGEM A SER TRADUZIDA: ", messagemTraduzir.body);//descomentar
                // console.log("ESTE É O BODY EVENTO: ", body.message);
                let chatID = messagemTraduzir.chat.id;
                let message = messagemTraduzir.body; // decomentar
                // console.log("Essa é a mensagem: ",message)
                let mensagemCliente = await ControllerAlanzoka.translateMessage(message);
                console.log("sucesso!");
                // console.log("ESTA É A MENSAGEM TRADUZIDA: ", mensagemCliente);
                
                // let mensagemTraduzida = mensagemCliente;
                // console.log("ESTA É A MENSAGEM TRADUZIDA: ", mensagemTraduzida);

                await apphuggy.sendLoopInternal(`Tradução: ${mensagemCliente}`, chatID, apiKey);
                return resolve({
                    statusCode: 200
                    // body: JSON.stringify(mensagemCliente)
                });
            }*/

                //sendedAllMessage
                /*let body = JSON.parse(event.body);
                console.log(body)
                let internal2 = body.messages.sentAllMessage[0];

                console.log("ESSA É UMA MENSAGEM INTERNA COM A TRADUÇÃO DO AGENTE: ", internal2);
                console.log("ESSA É UMA MENSAGEM INTERNA COM A TRADUÇÃO DO AGENTE: ", internal2.is_internal);

                if (internal2.is_internal === true) {
                    let apiKey = "7e602a1aa3c3f589c12710ba380b387b";

                    let messagemTraduzir = body.messages;
                    console.log("ESSA É O .sendedAllMessage", messagemTraduzir)
                    let chatID = messagemTraduzir.chat.id;
                    let message = messagemTraduzir.body; // decomentar
                    console.log("ESTE É O BODY COM O CHAT: ", messagemTraduzir.chat.id) // descomentar
                    console.log("ESTA É A MENSAGEM A SER TRADUZIDA: ", messagemTraduzir.body);//descomentar

                    let mensagemCliente = await ControllerAlanzoka.translateMessage(message);
                    console.log("sucesso!");
                    await apphuggy.sendLoop(`Tradução: ${mensagemCliente}`, chatID, apiKey);
                    return resolve({
                        statusCode: 200
                        // body: JSON.stringify(mensagemCliente)
                    });  
                }*/

                await apphuggy.sendLoopInternal(`Tradução: ${mensagemCliente}`, chatID, apiKey); //esse metodo chama uma função que envia uma mensagem interna para o agente com o texto traduzido
                return resolve({
                    statusCode: 200
                });
            }
            }
        catch(e){
            console.log("Erro na function", e);
            return reject({
                statusCode: 200,
                body: JSON.stringify("Erro")
            });
        }
    })
}