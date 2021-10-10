import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Counter from "../components/counter/Counter";
import styles from "../styles/Home.module.css";
import { PostService } from "./_api/Post";

const IndexPage: NextPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService()
      .getOwnPost()
      .then((res) => setPosts(res.data.posts));
  }, []);

  return (
    <div className={styles.container}>
      <h1>My posts</h1>
      {posts.map((post) => (
        <h1>{post?.content}</h1>
      ))}
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <Counter />
        <Link href="/blog">Blog</Link>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
};

export default IndexPage;
