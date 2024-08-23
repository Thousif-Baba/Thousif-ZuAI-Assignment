import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../api';
import './NewPost.css';

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});
    const history = useHistory();

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

        await createPost({ title, content });
        history.push('/');
    };

    return (
        <form onSubmit={handleSubmit} className="new-post-form">
            <h2 className="new-post-title">Create New Post</h2>
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
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );
}

export default NewPost;
