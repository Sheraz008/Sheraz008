// import i18n from 'i18next';
// import detector from 'i18next-browser-languagedetector';
// import {initReactI18next} from 'react-i18next';;
// import translationEN from '../../languages/en.json';
// import translationITA from '../../languages/italian.json';
// import {I18nManager} from 'react-native';
// const resources = {
//   English: {
//     translation: translationEN,
//   },
//   Italian: {
//     translation: translationITA,
//   },
// };
// i18n
//   .use(detector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'English',
//     //lng: I18nManager.isRTL ? 'Arabic' : 'Italian',

//     fallbackLng: 'English',

//     keySeparator: false,

//     interpolation: {
//       escapeValue: false,
//     },
//   });
// export default i18n;


import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ita: {
    translation: {
        "Enter your email":"Inserisci la tua email",
        "Enter your password":"Inserisci la tua password",
        "Forgot password?":"Password dimenticata?",
        "Login":"Accedi",
        "or access with":"oppure accedi con",
        "By logging into your account,you accept our":"Accedento al tuo account,accetti i nostri",
        "General Terms and Condition":"Termini e condizioni generali",
        "and our":"e la nostra",
        "Privacy and cookie policy":"Informativa sulla privacy e cookie",
        "Don't have an account?":"Non hai un account?",
        "Register":'Registrati',
        "How can we help you ?":"Come possiamo aiutarti ?",
        "Your legel advise":"Parla subito con ",
        "is on its way":"un esperto",
        "Name":"Nome",
        "Surname":"Cognome",
        "Email":"Email",
        "Date of birth":"Data di nascita",
        "Password":"Password",
        "Confirm password":"Conferma password",
        "Already have an account?":"Hai già un account?",
        "Password recovery":"Recupera password",
        "Insert your email and we will send you a link to reset your password":"Inserisci la tua email e ti invieremo un link per reimpostare la tua password",
        "Insert your email":"Inserisci la tua email",
        "Reset password":"Reimposta password",
        "Chat":"Chat",
        "Send email":"Invia email",
        "Online consultant":"Consulenza online",
        "Proceed":"Procedi",
        "This chat doesn't guarantee a legal advice. The consultant will only lead you trough the legal guidelines.":"Questa chat non da diritto ad alcuna consulenza legale. Un consulente ti fornirà solamente un orientamento legale.",
        "Proceed":"Procedi",
        "Book an appointment online with a legal consultant. The price for 1 hour consultation is € 100,00.":"Fissa una consulenza legale online con un legale esperto. Il prezzo di 1 ora di consulenza è pari ad € 100,00.",
        "Our email response doesn't guarantee a legal advice. The consultant will only lead you trough the legal guidelines.":"Questa email non da diritto ad alcuna consulenza legale. Un consulente ti fornirà solamente un orientamento legale.",
        "This chat doesn't guarantee a legal advice. The consultant will only lead you trough the legal guidelines.":"Questa chat non da diritto ad alcuna consulenza legale. Un consulente ti fornirà solamente un orientamento legale.",
        "Please, provide you contact details in order to proceed with your legal request.":"Per favore, inserisci i tuoi dati di contatto per inviare la tua richiesta di assistenza legale.",
        "Send email":"Invia email",
        "Write here your legal request":"Scrivi qui la tua problematica legale",
        "Please, provide you contact details in order to schedule an online legal consultant.":"Per favore, inserisci i tuoi dati di contatto per fissare una consulenza legale online.",
        "Summarize your legal request and indicate your time and date preference to schedule an appointment.":"Riassumi qui la tua problematica legale e indicaci un orario e data di tua preferenza per fissare un appuntamento.",
        "Send Request":"Invia richiesta",
        "Save changes":"Salva modifiche",
        "General terms and conditions":"Termine e condizioni generali",
        "Privacy and cookie policy":"Informativa sulla privacy e cookie",
        "Contact us":"Contattaci",
        "Delete account":"Cancella account"
       
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'ita' : 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;