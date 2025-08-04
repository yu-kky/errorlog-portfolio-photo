import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDhzG-q30BesXTzL6uZuGVgRek8k6WZPcc',
  authDomain: 'errorlog-dw.firebaseapp.com',
  projectId: 'errorlog-dw',
  storageBucket: 'errorlog-dw.appspot.com',
  messagingSenderId: '659717973264',
}

// Firebase アプリ初期化（初回のみ）
const firebaseApp = initializeApp(firebaseConfig)

// 使いたい機能だけ export（今は Storage）
const storage = getStorage(firebaseApp)

export { storage }
