// const {Translate} = require('@google-cloud/translate').v2;
const {TranslationServiceClient} = require('@google-cloud/translate');
const translate = require('translate-google')
const { response } = require('express');
const controllerAlanzoka = module.exports = {};
const apphuggy = require('./apphuggy');

// const translate = new Translate();

        const location = 'global';
        // const text = 'good night';
        const {Translate} = require('@google-cloud/translate').v2;
        // Creates a client
        // const translate = new Translate();

        const translationClient = new TranslationServiceClient();

        const text = 'The text to translate';
        const target = 'The target language, e.g. ru';
        
        async function translateText() {
            let [translations] = await translate.translate(text, target);
            translations = Array.isArray(translations) ? translations : [translations];
            console.log('Translations:');
            translations.forEach((translation, i) => {
              console.log(`${text[i]} => (${target}) ${translation}`);
            });
          }
          
          translateText();        
        
    

