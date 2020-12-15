'use strict';
const ControllerAlanzoka = require('./ControllerAlanzoka');
// const controllerAlanzoka = new ControllerAlanzoka();

module.exports.main = event => {
    let path = event.path;
    
    return new Promise(async (resolve, reject) => {
        try{
            if(path === "/traduzir"){
                let body = JSON.parse(event.body);
                console.log("ESTE É O BODY EVENTO: ", body.message);
                let message = body.message;
                // console.log("Essa é a mensagem: ",message)
                let mensagemCliente = await ControllerAlanzoka.translateMessage(message);
                console.log("sucesso!");
                
                return resolve({
                    statusCode: 200,
                    body: JSON.stringify(mensagemCliente)
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