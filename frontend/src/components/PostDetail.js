import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api';
import './PostDetail.css';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPost(id);
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    if (!post) return <p className="loading">Loading...</p>;

    return (
        <div className="post-detail">
            <h2 className="post-detail-title">{post.title}</h2>
            <p className="post-detail-content">{post.content}</p>
        </div>
    );
}

export default PostDetail;
