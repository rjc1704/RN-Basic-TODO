import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDAudl8YrFv2dW1ZPtS0w3OWIOLnoG72wE",
  authDomain: "rn-todo-64128.firebaseapp.com",
  projectId: "rn-todo-64128",
  storageBucket: "rn-todo-64128.appspot.com",
  messagingSenderId: "821982136335",
  appId: "1:821982136335:web:d7d29bb676a0f62385fb7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
