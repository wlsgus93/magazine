import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {setCookie,deleteCookie,getCookie} from "../../shared/Cookie"

import {auth} from "../../shared/firebase";

import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword ,setPersistence ,browserSessionPersistence ,signOut   } from "firebase/auth";



//1. 액션생성함수 //액션타입
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"

//2. 액션 생성 함수 만들기
// const logIn = createAction(LOG_IN, (user) => ({ user }));  2-11
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//3. initialstate 만들기(default)
const initialState = {
    user: null,
    is_login: false,
  };

const user_initial = {
    user_name:'jinh',
};


//middleware actions
// const loginAction = (user)=> {
//     return function (dispatch, getState, {history}){
//         console.log(history);
//         console.log("chunckasdfasdfasdf")
//         dispatch(setUser(user));
//         history.push('/');
//     }
// }
const signupFB = (id,pwd,user_name) =>{
    return function (dispatch, getState, {history}){
        
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
    // Signed in
            const user = userCredential.user;
            console.log(user);
            updateProfile(auth.currentUser, {
                displayName: user_name
              }).then(() => {

                dispatch(setUser({user_name:user_name,id:id,user_profile:'',uid:user.uid}));
                history.push('/');
                // Profile updated!
                // ...
              }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                // An error occurred
                // ...
              });

    // ...
  })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
    // ..
  });

    }
}
const LoginFB = (id,pwd) =>{
    return function (dispatch, getState, {history}){

        setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          signInWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
        // Signed in
            const user = userCredential.user;
            dispatch(setUser({id:id, user_name:auth.currentUser.displayName,user_profile:"",uid:user.uid}));
            console.log(user);
            history.push("/");
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
        });
          return signInWithEmailAndPassword(auth, id, pwd);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
    }
}
const loginCheckFB=()=>{
    return function (dispatch, getState, {history}){
        auth.onAuthStateChanged((user)=>{
            if(user){
                dispatch(setUser({id:user.email, user_name:user.displayName,user_profile:"",uid:user.uid}));
            }
            else{
                dispatch(logOut());
            }
        })
    }
}
const logoutFB=()=>{
    return function (dispatch, getState, {history}){
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(logOut());
            history.replace('/');
          }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
          });
    }

}
  //4. reducer 만들기


  export default handleActions(
    {
      [SET_USER]: (state, action) =>
        produce(state, (draft) => {
            setCookie("is_login", "success");
            draft.user = action.payload.user;
            draft.is_login = true;
        }),
          [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        }),
      [GET_USER]: (state, action) => produce(state, (draft) => {}),
    },
    initialState
  );

  const actionCreators = {
    // logIn, 2-11
    getUser,
    logOut,
    // loginAction, 2-12
    signupFB,
    LoginFB,
    loginCheckFB,
    logoutFB,
  };
  
  export { actionCreators };