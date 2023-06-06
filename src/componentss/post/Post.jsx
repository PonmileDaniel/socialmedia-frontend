import  './post.css'
import { Delete, MoreVert } from '@material-ui/icons'
import { useState, useEffect, useContext} from 'react'
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { URL } from '../../App'

export default function Post({ post }) {
 const [like,setlike] = useState(post.likes.length)
 const [islike,setislike] = useState(false)

 //This is to handle each user of the Post
 const [menuOpen, setMenuopen] = useState(false);

 //To handle the delete open and Close 
 const [user, setUser] = useState({});

 const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//For the like
const {user:currentUser} = useContext(AuthContext);

//

useEffect(() =>{
  setislike(post.likes.includes(currentUser._id))
}, [currentUser._id,post.likes]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${URL}/users?userId=${post.userId}`);
      setUser(response.data); // Pass the fetched data to the 'setPosts' function
    } catch (error) {
      console.log(error);
      // Handle the error here
    }
  };
 
  fetchUser();
}, [post.userId]);


//This is to Handle the Like nd Love And Functionality 
const likeHandler = ()=>{
  try{
    axios.put(`${URL}/post/` + post._id+ "/like" , {userId:currentUser._id});
  }
  catch(err){
    console.log(err)
  }
  setlike(islike ? like - 1 : like + 1)
  setislike(!islike )
};


const handleDelete = async () => {
  try {
    await axios.delete(`${URL}/post/${post._id}`, {
      data: { userId: currentUser._id },
    });
    console.log('Post has been deleted');
    window.location.reload();
    // Perform any necessary actions after deleting the post
  } catch (error) {
    console.log(error);
    // Handle the error here
  }
};




  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop"> 
         <div className="postTopLeft">

          <Link to={`profile/${user.username}`}>
          <img className="postProfileImg"

          //This Part is to place a pics if there is no user pics
           src= { user.profilePicture ? PF + user.profilePicture : PF + "person/noavatar.jpg"} alt="" /> 
           </Link>
        <span className="postUsername"> {user.username} </span>
        <span className="postDate"> {format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
            <MoreVert onClick={() => setMenuopen(!menuOpen)}/>
            {/* {menuOpen && <button onClick={handleDelete}>Delete</button>} */}
           { menuOpen &&     <Delete onClick={handleDelete}/>}

        </div>
        </div>
        <div className="postCenter">
<span className="postText"> {post?.desc}</span>
<img className="postImg" src={PF+post.img} alt="" />
        </div>
        
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className="likeIcon" src={`${PF}heart.png`} onClick = {likeHandler} alt="" />
                <img className="likeIcon" src={`${PF}like.png`} onClick = {likeHandler}  alt="" />
                <span className="postLikeCounter">{like}people Liked it </span>
            </div>
            <div className="postButtomRight">
                <span className="postCommonText">{post.comment} Comments</span>
            </div>
            </div>
      </div>
    </div>
  )
}
