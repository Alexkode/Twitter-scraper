import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAovlMJmY2Axi0qqSLkXh78WDOenQdpWyw",
  authDomain: "twitter-scraper-60d11.firebaseapp.com",
  projectId: "twitter-scraper-60d11",
  storageBucket: "twitter-scraper-60d11.appspot.com",
  messagingSenderId: "434846094354",
  appId: "1:434846094354:web:27a9ccbb974d1e6bd174cb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);