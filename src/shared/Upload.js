import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import  Button  from "../elements/Button";
import { storage } from "./firebase";
import image, { actionCreators as imageActions} from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const fileInput=React.useRef();
    const is_uploading= useSelector(state=>state.image.uploading);

    const selectFile=(e)=>{
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.files);

        // console.log(fileInput.current.files[0]);
        const reader=new FileReader();
        const file = fileInput.current.files[0];
        reader.readAsDataURL(file);
        //읽기를 끝났을때 데이터의 결과값을 받아와야됌
        
        //읽기가끝났을때 발생하는 이벤트핸들러
        reader.onloadend=()=>{
            console.log(reader.result); //이미지 내용물
            dispatch(imageActions.setPreview(reader.result));
            // const result=window.confirm("이 사진으로 하시겠습니까?");
            // console.log(result);
        }

    };
    const uploadFB=()=>{
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    };
    return (
        <React.Fragment>
            <input onChange = {selectFile} type="file" ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB}>업로드 하기</Button>
        </React.Fragment>
    )
}

export default Upload;