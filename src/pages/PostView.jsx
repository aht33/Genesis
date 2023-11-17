import supabase from '../client'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../styles/PostView.css"

const PostView = () => {
    const { id } = useParams();

    const [post, setPost] = useState({});

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
                setPost({title: data.title, caption: data.caption, image_url: data.image_url, likes: data.likes, created_at: data.created_at.slice(0,10)})
            }
        }
        getPost();
    }, [id])

  return (
    <div className="post-view-container">
        <h3 className="post-title">{post.title}</h3>
        <p>Caption: {post.caption}</p>
        <p>Image URL: {post.image_url}</p>
        <p>{post.likes} Likes</p>
        <p>Posted on {post.created_at}</p>
    </div>
  )
}

export default PostView