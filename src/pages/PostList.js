import React from "react";
// import styled from "styled-components";

import Post from "../components/Post";

import {useSelector,useDispatch} from "react-redux";
import { actionCreators as postActions} from "../redux/modules/post";
const PostList = (props) => {
    const post_list=useSelector((state)=>state.post.list);
    const dispatch=useDispatch();
    console.log(post_list);


    React.useEffect(()=>{
        console.log("useeffect");
        dispatch(postActions.getPostFB());

    },[]);

    return (
        <React.Fragment>
            {/* <Post/> */}
            {post_list.map((p,idx)=>{
                return <Post key={p.id} {...p}/>
            })}
        </React.Fragment>
    );
}

Post.defaultProps = {
    user_info:{
        user_name: "jinhyun",
        user_profile: "Link"
    },
    image_url:"Link",
    contents: "waow",
    insert_dt:"2022 03 14"

}

export default PostList;