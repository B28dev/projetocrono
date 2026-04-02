import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const appCheckSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const appCheckDebugToken = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN;

if (typeof window !== 'undefined' && import.meta.env.DEV && appCheckDebugToken) {
  // true => auto-generate debug token in console; string => fixed debug token.
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckDebugToken === 'true' ? true : appCheckDebugToken;
}

export const appCheck = typeof window !== 'undefined' && appCheckSiteKey
  ? initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  })
  : null;

export default app;
