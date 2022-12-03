import { useState, useEffect } from "react";
import Post from "../Post/Post";
import LinearProgress from '@mui/material/LinearProgress';
import cls from "./PostList.module.scss";

const PostList = ({showAlert, listUpdate}) => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({isLoading: true, isEmpty: true});

  const getPosts = async () => {
    try {
      const request = await fetch("/api/getAllElements");
      const info = await request.json();

      if (request.ok) {
        return info;
      } else {
        showAlert("error", info);
        throw Error();
      }
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    setStatus({isLoading: true, isEmpty: true});

    getPosts().then(data => {
      if (data) {
        setPosts(data.payload);
        setStatus(prev => {
          return { prev, isLoading: false };
        })
      }
    });
  }, [listUpdate])

  useEffect(() => {
    if (posts.length === 0 && !status.isLoading) {
      setStatus(prev => {
        return { prev, isEmpty: true }
      })
    }
  }, [posts])

  const deletePost = async id => {
    setStatus(prev => {
      return {prev, isLoading: true}
    })

    try {
      const request = await fetch(`/api/delete/${id}`, {
        method: "DELETE"
      });

      const info = await request.json();

      if (request.ok) {
        setPosts(prev => {
          const newArray = [...prev];
          const index = newArray.findIndex(item => item._id === id);
          newArray.splice(index, 1);
          return newArray;
        })

        showAlert("success", info);
      } else {
        showAlert("error", info);
        throw Error();
      }
    } catch(error) {
      console.log(error)
    } finally {
      setStatus(prev => {
        return {prev, isLoading: false}
      })
    }
  }

  const renderStatus = () => {
    const {isLoading, isEmpty} = status;

    if (isLoading) {
      return <LinearProgress />
    } else if (isEmpty) {
      return <span className={cls["empty-notice"]}>Список пуст</span>
    }
  }

  return (
    <div className={cls.root}>
      { renderStatus() }
      {
        posts.length > 0
        && posts.map(item => (
            <Post
              key={item._id}
              id={item._id}
              date={item.date}
              longUrl={item.longUrl}
              shortUrl={item.shortUrl}
              clickCount={item.clickCount}
              onDeletePost={deletePost}
            />
          ))
      }
    </div>
  )
}

export default PostList;