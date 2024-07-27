import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="home-overlay">
          <h1>Welcome to My Page</h1>
        </div>
      </div>
      <div className="container mt-5">
       
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4" key={blog._id}>
              <div className="card mb-4 shadow-sm">
                <img
                  src={blog.imageUrl}
                  className="card-img-top"
                  alt={blog.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
