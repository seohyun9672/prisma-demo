// import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'



export default function Home(props) {
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState(props.posts)
  
  useEffect(() => {
    setPosts(props.posts)
    }, [props.posts])
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    setPosts([...posts, res.data])
    }

  
  return <div>
    <h1>Home</h1>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}

<form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "400px"}}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
  </div>
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}