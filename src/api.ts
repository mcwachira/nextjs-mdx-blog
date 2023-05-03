import path from 'path'
import fs from 'fs'
import {globSync , sync,glob} from 'glob'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'posts')

console.log(POSTS_PATH)

export const getSlugs = (): string[] => {

    const paths = sync(`${POSTS_PATH}/*.mdx`)
   //console.log(paths) // 

    return  paths.map((path) => {

        const parts = path.split('/')

        const fileName = parts[parts.length -1]

        const [slug, _ext] = fileName.split('.')
        


        return slug
    })


    
}

export const getAllPosts = () => {


   const posts =  getSlugs().map((slug) => getPostFromSlug(slug)).sort((a, b) => {
    if(a.meta.date > b.meta.date) return 1;
    if(a.meta.date < b.meta.date) return -1;
    return 0;
   }).reverse()


   return posts
} 

interface Post {
    content:string;
    meta:PostMeta;
}

export interface PostMeta {
    excerpt:string;
    slug:string;
    title:string;
    tags:string[];
    date:string;

}


export const getPostFromSlug = (slug:string): Post => {


    const postPath = path.join(POSTS_PATH, `${slug}.mdx`)
  console.log(postPath)

  const source = fs.readFileSync(postPath)

  const {content, data:frontmatter} = matter(source)

  console.log(content, frontmatter)

  return {
    content,
    meta:{
        slug,
        excerpt:frontmatter.excerpt,
        title:frontmatter.title ?? slug,
        tags:(frontmatter.tags ?? []).sort(),
        date:(frontmatter.date ?? new Date()).toString(),
    }
  }
}