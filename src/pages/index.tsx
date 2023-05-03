import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getAllPosts, PostMeta } from '@/api'
import Articles from '@/components/Articles'

const inter = Inter({ subsets: ['latin'] })

export default function Home({posts}: {posts: PostMeta[]}) {
  return (
    <>
    <h1> Article </h1>
 <Articles posts={posts}/>
    </>
  )
}



export const getStaticProps = async() => {

const posts = getAllPosts().slice(0,6).map(post => post.meta)
console.log(posts)

  return {
    props:{
  posts
    }
  }
}