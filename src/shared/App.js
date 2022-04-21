import './App.css';
import {Route} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configureStore";

import PostList from '../pages/PostList';
import React from 'react';
import Header from './Header';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { Grid,Button } from '../elements';
import {actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from "react-redux";
import {apiKey} from "./firebase";

import Permit from './Permit';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
// import { Button } from 'react-bootstrap';
// import { useAccordionButton } from 'react-bootstrap';


function App() {
  const dispatch = useDispatch();

  const _session_key=`firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session=sessionStorage.getItem(_session_key)?true:false;

  React.useEffect(()=>{
    if(is_session){
      dispatch(userActions.loginCheckFB());

    }


  },[]);

  return (
    <React.Fragment>
      <Grid>
      
        <Header/>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail}/> 
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button _onClick={()=>{history.push("/write");}} is_float text="+"/>
      </Permit>
    </React.Fragment>
  );
}

export default App;
