import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getPosts, deletePost } from '../api';
import './PostList.css';

function PostList() {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
        setPosts(posts.filter(post => post._id !== id));
    };

    const handleEdit = (id) => {
        history.push(`/edit/${id}`);
    };

    return (
        <div className="post-list">
            <h2 className="post-list-title">Posts</h2>
            <ul className="post-list-items">
                {posts.map(post => (
                    <li key={post._id} className="post-item">
                        <Link to={`/posts/${post._id}`} className="post-link">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-excerpt">{post.content.substring(0, 50)}...</p>
                        </Link>
                        <div className="post-actions">
                            <button onClick={() => handleEdit(post._id)} className="post-edit-btn">Edit</button>
                            <button onClick={() => handleDelete(post._id)} className="post-delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/new" className="post-create-link">Create New Post</Link>
        </div>
    );
}

export default PostList;
