import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/Trash.css";

function Trash() {
    const [trashedBlogs, setTrashedBlogs] = useState([]);

    async function fetchTrashedBlogs() {
        try {
            const response = await axios.get('/blog/trashed-blogs', { withCredentials: true });
            setTrashedBlogs(response.data["trashed blogs"]); // Corrected to use "trashed blogs"
            //console.log(response);
        } catch (error) {
            console.log("Error fetching trashed blogs: ", error);
        }
    }


    const restoreBlog = async (blogId) => {
        // console.log("inside restore blog , blog id - ",blogId)
        try {
            const response = await axios.post('/blog/restore-blog', { blogId }, { withCredentials: true });
            console.log("response restore - ",response);
            setTrashedBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
            // console.log(response.data);
        } catch (error) {
            console.log("Error in restoring blog: ", error);
        }
    }


    const confirmRestore = (blogId) => {
        //console.log("inside confirm restre, blog id - ",blogId);
        if(window.confirm("Restore voice ? ")){
            restoreBlog(blogId);
        }
    }

    useEffect(() => {
        fetchTrashedBlogs();
    }, []);

    return (
        <>
            <h2 className="heading">What your soul didn't like ? </h2>
            <div className="trashed-blogs">
                <div className="blogCard-container">
                    {trashedBlogs.map((blog) => (
                        <div key={blog._id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <div className="userName"><sup> By : {blog.userId.username}</sup></div>
                            <hr />
                            <p className="textBody">{blog.textBody}</p>
                            {/* <p><strong>User ID:</strong> {blog.userId}</p> */}
                            {/* <div className="createTime"><sub>{new Date(parseInt(blog.creationDateAndTime)).toLocaleString()}</sub></div> */}
                            <div className="createTime"><sub>Deleted At : {new Date(parseInt(blog.deletionDateAndTime)).toDateString()},  {new Date(parseInt(blog.deletionDateAndTime)).toLocaleTimeString()}</sub></div>
                            <button onClick={()=>{confirmRestore(blog._id)}}>Restore</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Trash;
