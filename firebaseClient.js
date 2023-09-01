import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: 'AIzaSyBhDanlI-QSqeMPXOz40KDJ9zHOrNeANTU',
    authDomain: 'couplechores.firebaseapp.com',
    projectId: 'couplechores',
    storageBucket: 'couplechores.appspot.com',
    messagingSenderId: '1045191990257',
    appId: '1:1045191990257:web:566f0394ca1c651d808250',
    measurementId: 'G-T6VT7QB2HZ'
};
  
const apps = getApps();
if (!apps.length) {
    initializeApp(firebaseConfig);
    getAnalytics(); 
}
  
export const auth = getAuth();
