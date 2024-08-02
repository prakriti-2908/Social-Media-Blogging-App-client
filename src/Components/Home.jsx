import axios from 'axios';
import { useEffect, useState } from 'react';
import './Styles/Home.css';


function Home() {
    const [blogs, setBlogs] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [following, setFollowing] = useState({});
    const [user,setUser] = useState([]);

    const fetchAllBlogs = async (skipParam = 0) => {
        // console.log("inside fetchAllBlogs");

        try {
            const userr = await axios.get('/user/user-info');
            setUser(userr);
            const response = await axios.get(`/blog/get-all-blogs?skip=${skipParam}`, { withCredentials: true });
            const newBlogs = response.data.allBlogs;
            
            if (newBlogs.length === 0) {
                setHasMore(false);
            } else {
                setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
                setSkip(skipParam + newBlogs.length);
            }
        } catch (error) {
            setHasMore(false);
            alert('No more voice');
            console.log("error: ", error);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const handleFollow = async (userId) => {
        try {
            if (following[userId]) {
                // Unfollow
                await axios.post('/follow/unfollow-user', { unfollowId: userId }, { withCredentials: true });
            } else {
                // Follow
                await axios.post('/follow/follow-user', { followingUserId: userId }, { withCredentials: true });
            }
            setFollowing((prevFollowing) => ({
                ...prevFollowing,
                [userId]: !prevFollowing[userId]
            }));
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <>
            <h2 className='heading'>Let's Explore Everyone's Souls Voice</h2>
            <div className="blogs-container">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-card">
                        <h3 className='blog-title'> Title : {blog.title}</h3>
                        
                        <hr />
                        <p className='textBody'>{blog.textBody}</p>
                        <div className="nameOfUser"><sup>By : {blog.userId.username}</sup></div>
                        {/* <p><strong>User ID:</strong> {blog.userId}</p> */}
                        <div className="createTime"><sub>Posted At : {new Date(parseInt(blog.creationDateAndTime)).toDateString()},  {new Date(parseInt(blog.creationDateAndTime)).toLocaleTimeString()}</sub></div>
                        { user.data.userInfo._id !== blog.userId._id  && <button onClick={() => handleFollow(blog.userId._id)}>
                            {following[blog.userId._id] ? 'Unfollow' : 'Follow'}
                        </button> }
                    </div>
                ))}
            </div>
            {hasMore && (
                <button onClick={() => fetchAllBlogs(skip)}>Show More</button>
            )}
        </>
    );
}

export default Home;
