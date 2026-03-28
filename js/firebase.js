// ═══════════════════════════════════════════
// Nurture Paradise — Firebase Configuration
// js/firebase.js
// ═══════════════════════════════════════════

  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
  import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

  async function loadFirebaseConfig() {
    const res = await fetch('/config/firebase');
    if (!res.ok) throw new Error('Missing Firebase config from server');
    return res.json();
  }

  async function initFirebase() {
    try {
      const FIREBASE_CONFIG = await loadFirebaseConfig();
      const app  = initializeApp(FIREBASE_CONFIG);
      const auth = getAuth(app);
      const db   = getFirestore(app);
      window._fb = {
        auth, db,
        createUserWithEmailAndPassword, signInWithEmailAndPassword,
        signOut, onAuthStateChanged, updateProfile,
        doc, setDoc, getDoc, updateDoc,
        collection, addDoc, getDocs, deleteDoc,
        query, orderBy, serverTimestamp
      };
      window.dispatchEvent(new Event('firebase-ready'));
      return true;
    } catch(e) {
      console.error('Firebase init error:', e);
      return false;
    }
  }

  // Keep initFirebase available for the setup overlay
  window._initFirebase = initFirebase;

  // Auto-init on load
  initFirebase();
