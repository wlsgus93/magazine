import React from "react";
import styled from "styled-components";
import {Text,Grid} from "./index";

const Input = (props)=>{
    const {multiLine, label,placeholder,_onChange,type}=props;

    if(multiLine){
        return(
            <Grid>
                {label ? "":<Text margin="0px">{label}</Text>}
                <ElTextarea placeholder={placeholder} onChange={_onChange}></ElTextarea>
            </Grid>
        );


    }
    return(
        <React.Fragment>
            <Grid>
                {label ? "":<Text margin="0px">{label}</Text>}
                
                <ElInput type={type} placeholder={placeholder} onChange={_onChange}/>
            </Grid>
        </React.Fragment>
    );
}

Input.defaultProps={
    multiLine: false,
    label: 'false',
    placeholder: '텍스트 입력 부탁드림니다.',
    type:"text",
    _onChange: () => {}
};

const ElTextarea = styled.textarea`
border:1px solid #212121;
width:100%;
padding: 12px 4px;
box-sizing:border-box;
`;

const ElInput = styled.input`
border:1px solid #212121;
width:100%;
padding: 12px 4px;
box-sizing:border-box;
`;
export default Input;