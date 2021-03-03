// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverURL: '/api',

  firebaseConfig : {
    apiKey: "AIzaSyDvDkNC2S0d4-FN1mW-APLgwDGQCC71dR4",
    authDomain: "maunganoapp.firebaseapp.com",
    projectId: "maunganoapp",
    storageBucket: "maunganoapp.appspot.com",
    messagingSenderId: "574815464711",
    appId: "1:574815464711:web:4b7a60c744057eed68e9a2",
    measurementId: "G-KWXRKGG6RT"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
