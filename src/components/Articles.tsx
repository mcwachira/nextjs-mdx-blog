import React from 'react'
import { PostMeta } from '@/api'
import Link from 'next/link'
const Articles = ({posts}: {posts: PostMeta[]}) => {
  return (
   <ul>
  {posts.map((post) => (<li key={post.slug}>
    <div>
        <Link href={`/posts/${post.slug}`}> {post.title}</Link> 
        </div>
        <p>
    {post.excerpt}
  </p>

<p>
    {post.tags.map((tag) => <Link key={tag} href={`/tags/${tag}`}> {tag}</Link>)}
</p>
  </li>)
  )}

  </ul>
  )
}

export default Articles