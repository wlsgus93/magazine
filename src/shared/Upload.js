import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import  Button  from "../elements/Button";
import { storage } from "./firebase";
import { actionCreators as imageActions} from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const fileInput=React.useRef();
    const is_uploading= useSelector(state=>state.image.uploading);

    const selectFile=(e)=>{
        console.log(e);
        console.log(e.target);
        console.log(e.target.files);

        console.log(fileInput.current.files[0]);
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