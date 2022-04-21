import { createAction,handleActions } from "redux-actions";
import {produce} from "immer";
import { addDoc, collection, FieldValue, Firestore, getDocs, setDoc,doc } from "firebase/firestore/lite";
import {db} from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: [],
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
//   id:0,
//     user_info: {
//     user_name: "mean0",
//     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
//   },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY--MM-DD hh:mm:ss"),
};
const addPostFB = (contents="") =>{
    return async function (dispatch,getState,{history}){
        const _user = getState().user.user;
        //store에 있는거가져오는데 getstate
        const postDB = Firestore.collection(db,"post");
        const user_info={
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile:_user.user_profile
        }

        const _post ={
        ...initialPost,
        contents:contents,
        insert_dt:moment().format("YYYY--MM-DD hh:mm:ss")
        }
        // const addData= await addDoc(collection(db,"post"),{
        //     ...user_info,..._post
        // });
        await setDoc


    }
}

const getPostFB =() =>{
    return async function (dispatch,getState,{history}){
        const read_data = await getDocs(collection(db,"post"));
        let post_list=[];
        console.log(read_data);
        read_data.forEach((doc)=>{
             //데이터 맞추기 1번 방법           
            // let _post = {
            //     id:doc.id,
            //     ...doc.data()
            // };
            // let post=
            // {
            //     id:doc.id,
            //     user_info: {
            //         user_name: _post.user_name,
            //         user_profile: _post.user_profile,
            //       },
            //       image_url: _post.image_url,
            //       contents: _post.contents,
            //       comment_cnt: _post.comment_cnt,
            //       insert_dt: _post.insert_dt,
            // };

            //데이터 맞추기 2번 방법
            let _post=doc.data();
            //['comment_cnt','content',..]
            let post = Object.keys(_post).reduce((acc,cur)=>{ 
                
                if(cur.indexOf("user_") !==-1)
                {
                    return {...acc,user_info: {...acc.user_info,[cur]:_post[cur]} };
                }
                
                return {...acc,[cur]: _post[cur]};

            },{id:doc.id, user_info:{}});

            post_list.push(post);
            console.log(post_list);
            dispatch(setPost(post_list));

        });
        console.log("d");
        // console.log(docRef);
        // console.log(citiesRef);
    }

}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
          draft.list=action.payload.post_list;

        }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            
        })
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
  };
  
  export { actionCreators };