import supabase from '../client'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../styles/PostView.css"
import Navbar from '../components/Navbar'
import { ThumbsUp } from '../assets/thumbsUp'

const PostView = () => {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [key, setKey] = useState('');
    const [likes, setLikes] = useState(0);

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    }

    
    useEffect(() => {
        const getPost = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
            console.log(data);

            if(error) {
                console.error("Error fetching post: " , post);
            } else {
                setPost({title: data.title, caption: data.caption, image_url: data.image_url, secret_key: data.secret_key, likes: data.likes, created_at: data.created_at.slice(0,10)})
                setLikes(data.likes);
            }
        }
        getPost();
    }, [id])
    

    const updatePost = async (e) => {
        e.preventDefault();

        await supabase.from('Posts').update({title: post.title, caption: post.caption, image_url: post.image_url, secret_key: post.secret_key }).eq('id', id);

        window.location = "/";
    }

    const deletePost = async(e) => {
        e.preventDefault();
        console.log(post);
        console.log(e);
        console.log(key);
        if(post.secret_key == "" || (post.secret_key == key)) {
            await supabase.from('Posts').delete().eq('id', id);

            window.location = '/';
        } else {
            console.error("Error");
            alert("Incorrect key, please try again");
        }
        
    }



  return (
    <>
    <Navbar />
    <div className="parent-container">
    <div className="left-container">
        <div className="post-view-container">
                <h3 className="post-title">{post.title}</h3>
                <p>Caption: {post.caption}</p>
                <p>{post.likes} Likes</p>
                <p>Posted on {post.created_at}</p>
        </div>
        <div className="key-change-container">
            <div className="left-key-container">
                <h2>Edit the Post!</h2>
                <form onSubmit={updatePost}>
                    <label>Title:</label>
                    <br />
                    <input type="text" value={post.title} name="title" onChange={handleChange} />
                    <br />
                    <br />
                    <label>Caption:</label>
                    <br />
                    <input type="text" value={post.caption} name="caption" onChange={handleChange} />
                    <br />
                    <br />
                    <label>Image:</label>
                    <br />
                    <input type="url" value={post.image_url} name="image_url" onChange={handleChange} />
                    <br />
                    <br />
                    <button type="submit" className="edit-button">Edit Post</button>
                </form>
            </div>
            <div className="right-key-container">
                <h2>Delete the Post!</h2>
                <form onSubmit={deletePost}>
                    <label>Secret Key:</label>
                    <br />
                    <input type="password" value={key} name="key" onChange={e => setKey(e.target.value)} />
                    <br />
                    <br />
                    <button type="submit">Delete</button>
                </form>
            </div>
            <div>

            </div>
        </div>

    </div>
        <div className="image-container">
            <img src={post.image_url} alt={post.image_url} />
        </div>
    </div>
        
    </>
    
  )
}

export default PostView