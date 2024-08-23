import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api';
import './EditPost.css';

function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPost(id);
            setTitle(response.data.title);
            setContent(response.data.content);
        };
        fetchPost();
    }, [id]);

    const validateForm = () => {
        const formErrors = {};

        if (!title.trim()) {
            formErrors.title = "Title is required";
        }

        if (!content.trim()) {
            formErrors.content = "Content is required";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        await updatePost(id, { title, content });
        history.push('/');
    };

    return (
        <form onSubmit={handleSubmit} className="edit-post-form">
            <h2 className="edit-post-title">Edit Post</h2>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
            </div>
            <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-textarea"
                ></textarea>
                {errors.content && <p className="form-error">{errors.content}</p>}
            </div>
            <button type="submit" className="submit-btn">Update</button>
        </form>
    );
}

export default EditPost;
