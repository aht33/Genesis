import {useEffect, useState} from 'react'
import "../styles/Home.css"
import Navbar from "../components/Navbar"
import Feed from '../components/Feed'
import CreatePost from '../components/CreatePost'

const Home = () => {
  return (
    <>
      <Navbar />
      <Feed />
      <CreatePost />
    </>
    
  )
}

export default Home