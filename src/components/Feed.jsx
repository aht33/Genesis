import Post from "./Post"
import "../styles/Feed.css"
import { useState, useEffect } from 'react'
import supabase from '../client'

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase.from('Posts').select().order('created_at', { ascending: false });
            setPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, [])

  return (
    <div className="post-container">
        {
            posts && posts.length > 0 ? posts.map((post) => {
                console.log("title: ", post.title);
                return <Post 
                            id={post.id}
                            title={post.title} 
                            caption={post.caption} 
                            created_at={post.created_at.slice(0, 10)} 
                            image_url={post.image_url}
                            secret_key={post.secret_key}
                            likes={post.likes}
                        />
            }) : <h2>No more Posts!</h2>
        }
    </div>
  )
}

export default Feed