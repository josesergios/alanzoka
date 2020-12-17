// const {Translate} = require('@google-cloud/translate').v2;
const {TranslationServiceClient} = require('@google-cloud/translate');
const translate = require('translate-google')
const { response } = require('express');
const controllerAlanzoka = module.exports = {};
const apphuggy = require('./apphuggy');

// const translate = new Translate();


module.exports.translateMessage = async (message) =>{

    return new Promise((resolve, reject) =>{
            const location = 'global';
        // const text = 'good night';

        const translationClient = new TranslationServiceClient();

        async function translateText() {
        // Construct request
        const request = {
            parent: `projects/hackathon-huggy-2020/locations/${location}`,
            contents: [message],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: 'en',
            targetLanguageCode: 'pt',
        };

        try {
            // Run request
            const [response] = await translationClient.translateText(request);
            
            for (const translation of response.translations) {
            console.log(`Tradução: ${translation.translatedText}`);
            }

            let res = response.translations[0]
            let result = res.translatedText

            return resolve(
                 result
            )

        } catch (error) {
            console.error(error.details);
        }
        }
        
        translateText();
        

        
    })
}   
