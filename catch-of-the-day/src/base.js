import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBIYfOm1UZOAiGtlwHtU0gmuK-GJaujMR8",
    authDomain: "catch-of-the-day-andrei-e13d6.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-andrei-e13d6.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// Named export
export { firebaseApp }

// Default export
export default base;