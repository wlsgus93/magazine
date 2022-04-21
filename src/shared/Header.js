// import { Button } from "bootstrap";
import React from "react";
import {Grid,Text,Button} from "../elements";
import { getCookie,deleteCookie } from "D:/sparta_react/magazin-basic/src/shared/Cookie.js";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import {apiKey} from "./firebase";
import {history} from "../redux/configureStore";

const Header = (props) => {

    const is_login= useSelector((state)=> state.user.is_login);
    const _session_key=`firebase:authUser:${apiKey}:[DEFAULT]`;
    
    const dispatch = useDispatch();
    // console.log(sessionStorage.getItem(_session_key));

    const is_session=sessionStorage.getItem(_session_key)?true:false;
    // const [is_login, setIsLogin]= React.useState(false);
    
    // React.useEffect(()=>{

    //     let cookie= getCookie("is_login");

    //     console.log("cook");
    //     console.log(cookie);
    //     console.log("asdf")
    //     if(cookie){
    //         setIsLogin(true);
    //     }
    //     else
    //     {
    //         setIsLogin(false);
    //     }
    // },[]);

    if (is_login &&is_session)
    {
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                
                <Grid>
                    <Text size="24px" bold>김진현</Text>
                </Grid>

                <Grid is_flex>
                    <Button text="내정보"></Button>
                    <Button text="알림"></Button>
                    <Button text="로그아웃" _onClick={()=>{
                        dispatch(userActions.logoutFB())}}></Button>
                    {/* 색깔 받아와서 하기 ㄱㄱ */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
    }
    else{
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text size="24px" bold>김진현</Text>
                </Grid>

                <Grid is_flex>
                    <Button text="로그인" _onClick={() => {
                        history.push('/login');
                        console.log("로그인함");
                    }}></Button>
                    <Button text="회원가입" _onClick={()=>{
                        history.push('/signup');
                    }}></Button>
                    {/* 색깔 받아와서 하기 ㄱㄱ */}
                </Grid>
            </Grid>
        </React.Fragment>
    );
            }
}

Header.defaultProps={}


export default Header;