import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/Profile.css";
import UserInfo from "./UserInfo";

function Profile() {
    const [blogs, setBlogs] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ title: "", textBody: "", _id: "" });

    async function fetchMyBlogs(skipParam = 0) {
        try {
            const response = await axios.get(`/blog/get-my-blogs?skip=${skipParam}`, { withCredentials: true });
            const newBlogs = response.data.blogs;

            if (newBlogs.length === 0) {
                setHasMore(false);
            } else {
                setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
                setSkip(skipParam + newBlogs.length);
            }
            //console.log(response);
        } catch (error) {
            alert('no more voice');
            setHasMore(false);
            console.log("error: ", error);
        }
    }

    async function deleteBlog(blogId) {
        try {
            const response = await axios.post('/blog/delete-blog', { blogId }, { withCredentials: true });
            setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
            //console.log(response.data);
        } catch (error) {
            console.log("Error deleting blog: ", error);
        }
    }

    async function editBlog(e) {
        e.preventDefault();
        try {
            const response = await axios.post('/blog/edit-blog', { 
                editId: currentBlog._id, 
                title: currentBlog.title, 
                textBody: currentBlog.textBody 
            }, { withCredentials: true });
            setBlogs((prevBlogs) => prevBlogs.map(blog => blog._id === currentBlog._id ? { ...blog, title: currentBlog.title, textBody: currentBlog.textBody } : blog));
            setIsEditing(false);
            //console.log(response.data);
        } catch (error) {
            console.log("Error editing blog: ", error);
        }
    }

    const openEditForm = (blog) => {
        setCurrentBlog(blog);
        setIsEditing(true);
    }

    const confirmDelete = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlog(blogId);
        }
    }

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    return (
        <>
            <UserInfo/>
            <hr />
            <h2 className="heading">Your soul's voice</h2>
            <div className="myBlogs">
                <div className="blogCard-container">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <h3>Title : {blog.title}</h3>
                            <div className="userName"><sup> By : {blog.userId.username}</sup></div>
                            <hr />
                            <p className="textBody">{blog.textBody}</p>
                           
                            <div className="creationTime"> <sub>Created At : {new Date(parseInt(blog.creationDateAndTime)).toDateString()},  {new Date(parseInt(blog.creationDateAndTime)).toLocaleTimeString()}</sub></div>
                            <div className="dltEditBtn">
                                
                            <button onClick={() => confirmDelete(blog._id)}><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => openEditForm(blog)}><i className="fa-solid fa-pen-to-square"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMore && <button onClick={() => fetchMyBlogs(skip)}>Show More</button>}
            </div>
            {isEditing && (
                <div className="edit-form">
                    <h2>Edit Blog</h2>
                    <form onSubmit={editBlog}>
                        <label>
                            Title:
                            <input 
                                type="text" 
                                value={currentBlog.title} 
                                onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })} 
                                required 
                            />
                        </label>
                        <label>
                            Blog:
                            <textarea 
                                value={currentBlog.textBody} 
                                onChange={(e) => setCurrentBlog({ ...currentBlog, textBody: e.target.value })} 
                                required 
                            />
                        </label>
                        <div className="flexBtn">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}


export default Profile;
