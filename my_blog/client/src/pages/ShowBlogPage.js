import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const ShowBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`/api/blogs/${id}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/api/blogs/${id}`);
    navigate("/");
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container blog-container">
      <h1 className="blog-title">{blog.title}</h1>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
      )}
      <p className="blog-content">{blog.content}</p>
      <div className="btn-group">
        <Link to={`/blogs/edit/${id}`} className="btn btn-primary">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowBlogPage;
