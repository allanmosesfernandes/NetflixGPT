// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAe4Tlb1FUw2rfwyFExDCBZ94dvSopcVPU',
    authDomain: 'netflixgpt-2a01c.firebaseapp.com',
    projectId: 'netflixgpt-2a01c',
    storageBucket: 'netflixgpt-2a01c.firebasestorage.app',
    messagingSenderId: '48646323754',
    appId: '1:48646323754:web:b981ef843222d552cc8d53',
    measurementId: 'G-0NPWY6QKV7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Optionally, export your auth instance if you plan to use it in multiple components
export const auth = getAuth(app);

const analytics = getAnalytics(app);
