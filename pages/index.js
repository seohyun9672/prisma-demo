// import { prisma } from '../server/db/client'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(props.posts);
  const scollToRef = useRef();
  const onInput = (e) => setTitle(e.target.value);
  const onClear = () => {
    setTitle("");
    setContent("")
  };
  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/posts", { title, content });
    setPosts([...posts, res.data]);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Home</h1>
      <hr></hr>
      <div className={styles.container}>
        <h2>Write A Post!</h2>
        <form
          
          className={styles.form}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <input
            onInput={onInput}
            className={styles.input}
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            value={content}
            placeholder="Write something..."
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={styles.button} type="submit" onClick={() => {scollToRef.current.scrollIntoView(), onClear}}>Submit</button>
        </form>
      </div>

      <div className={styles.container} ref={scollToRef}>

        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3>{post.title}</h3>
            <hr></hr>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
