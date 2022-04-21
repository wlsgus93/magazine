//upload를 파일 업로드중 막게 해주는것 , 파일 이미지 경로 redux에 넣기
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

const UPLOADING="UPLOADING"; //업로드중인지 아닌지
const UPLOAD_IMAGE="UPLOAD_IMAGE";//업로드 액션

const uploading =createAction(UPLOADING,(uploading)=>({uploading}))// 액션생성자
const uploadImage= createAction(UPLOAD_IMAGE, (image_url)=>({image_url}));

const initialState ={
image_url:'',
uploading:false,
}
const uploadImageFB = (image)=>{
    return function(dispatch,getState,{history}){

        dispatch(uploading(true)); //업로드 시작
        const imageNameRef= ref(storage, `${image.name}`);
        const imagePathRef= ref(storage,`images/${image.name}`);
        //upload함수
        uploadBytes(imagePathRef,image)
        .then((snapshot)=>{
            console.log('Uploaded a blob or file!');
            console.log(snapshot);
            //url불러오기 함수
            getDownloadURL(imagePathRef)
            .then((url)=>{
            console.log(url);
            dispatch(uploadImage(url));//업로드 url input
        })
            
        })
    }
}

export default handleActions({
    [UPLOAD_IMAGE]:(state,action)=>produce(state,(draft)=>{
        draft.image_url=action.payload.image_url;
        draft.uploading=false;

    }),
    [UPLOADING]:(state,action)=>produce(state,(draft)=>{
        draft.uploading=action.payload.uploading;
    })

}, initialState)

const actionCreators ={
    uploadImageFB,
}
export {actionCreators}