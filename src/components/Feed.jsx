import Post from "./Post"
import "../styles/Feed.css"
import { useState, useEffect } from 'react'
import supabase from '../client'

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [orderByRecent, setOrderByRecent] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            console.log("status: " + orderByRecent);
            const { data } = await supabase.from('Posts').select().order('created_at', { ascending: orderByRecent} );
            setPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, [orderByRecent])

    const handleToggle = () => {
        setOrderByRecent(!orderByRecent);
    }



  return (
    <>
        <div className="search-container">
        <h2 className="search-title">Search</h2>
        <input className="search" type="text" onChange={e => setSearchTitle(e.target.value)} />
        </div>
    <div className="order-container">
        <button className="order-button" onClick={handleToggle}>Ordered By {orderByRecent ? "Oldest" : "Most Recent"}</button>
    </div>
    <div className="post-container">
        {/* Filter by search */}
        {
            posts && posts.length > 0 ? posts.filter(
                post => {
                    if(searchTitle == "") return post;
                    else if(post.title.toLowerCase().includes(searchTitle.toLowerCase())) {
                        return post;
                    }
                }
            ).map((post) => {
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
    </>
  )
}

export default Feed