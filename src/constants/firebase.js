import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

let config = {
  apiKey: "AIzaSyDXcw54xxEVJLAHYci320kbB39KE-V469A",
    authDomain: "satstreet-com.firebaseapp.com",
    databaseURL: "https://satstreet-com.firebaseio.com",
    projectId: "satstreet-com",
    storageBucket: "satstreet-com.appspot.com",
    messagingSenderId: "285466692947",
    appId: "1:285466692947:web:9bd253bb50257061f5e5a6",
    measurementId: "G-G2VV8JFXR0"
}

firebase.initializeApp(config)

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()