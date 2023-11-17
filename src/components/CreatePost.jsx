import { useState, useEffect } from 'react'
import supabase from "../client"
import "../styles/CreatePost.css"

const CreatePost = () => {
    const [post, setPost] = useState({ title:'', caption:'', image_url:'', secret_key:'', likes: 0 });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value});
    }

    const createPost = async (e) => {
        e.preventDefault();
        console.log("event", e);

        const { data, error } = await supabase.from('Posts').insert([post]);

        if(error) {
            console.error("Error: ", error);
        }

        window.location = '/';
    }

  return (
    <div className="form-container">
        <form onSubmit={createPost}>
            <label>Title</label>
            <br />
            <input type="text" value={post.title} name="title" onChange={handleChange} required />
            <br />
            <br />
            <label>Caption</label>
            <br />
            <input type="text" value={post.caption} name="caption" onChange={handleChange} />
            <br />
            <br />
            <label>Image URL</label>
            <br />
            <input type="url" value={post.image_url} name="image_url" onChange={handleChange} />
            <br />
            <br />
            <label>Secret Key</label>
            <br />
            <input type="text" value={post.secret_key} name="secret_key" onChange={handleChange} />
            <br />
            <br />
            <button type="submit">Post</button>
        </form>
    </div>
  )
}

export default CreatePost