import "../styles/Post.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import supabase from "../client"

const Post = (prop) => {
  return (
    <>
            <NavLink to={`/post/${prop.id}`} className="post">
                <h3 className="post-title">{prop.title}</h3>
                <p>{prop.likes} Likes</p>
                <p>Posted on {prop.created_at}</p>
            </NavLink>
    
    </>
    
  )
}

export default Post