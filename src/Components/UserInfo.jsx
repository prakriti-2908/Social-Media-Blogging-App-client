import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/UserInfo.css";

function UserInfo() {
    const [user, setUser] = useState({});
    const [allFollowings, setAllFollowings] = useState([]);
    const [allFollowers, setAllFollowers] = useState([]);
    const [isFollowerList, setIsFollowerList] = useState(false);
    const [isFollowingList, setIsFollowingList] = useState(false);
    const [hasMoreFollowers, setHasMoreFollowers] = useState(true);
    const [hasMoreFollowings, setHasMoreFollowings] = useState(true);
    const [followerSkip, setFollowerSkip] = useState(0);
    const [followingSkip, setFollowingSkip] = useState(0);

    const LIMIT = 10;

    const fetchData = async () => {
        try {
            const response = await axios.get('/user/user-info', { withCredentials: true });
            setUser(response.data.userInfo);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const followerList = async (skipParam = 0) => {
        if (isFollowerList && skipParam === 0) return;
        try {
            const response = await axios.get(`/follow/follower-list?skip=${skipParam}`, { withCredentials: true });
            const newFollowers = response.data.followerDb;
            //console.log(newFollowers);
            if(newFollowers.length===0){
                setHasMoreFollowings(false);
            }
            setAllFollowers((prevFollowers) => [
                ...prevFollowers.filter(follower => newFollowers && !newFollowers.some(newFollower => newFollower.follower && newFollower.follower._id === follower.follower._id)),
                ...newFollowers
            ]);
            setFollowerSkip(skipParam + newFollowers.length);
            setIsFollowerList(true);
        } catch (error) {
            setHasMoreFollowers(false);
            console.log(error);
        }
    };

    const followingList = async (skipParam = 0) => {
        if (isFollowingList && skipParam === 0) return;
        try {
            const response = await axios.get(`/follow/following-list?skip=${skipParam}`, { withCredentials: true });
            const newFollowings = response.data.followingDb;
            if(newFollowings.length===0){
                setHasMoreFollowings(false);
            }
            setAllFollowings((prevFollowings) => [
                ...prevFollowings.filter(following => newFollowings && !newFollowings.some(newFollowing => newFollowing.following._id === following.following._id)),
                ...newFollowings
            ]);
            setFollowingSkip(skipParam + newFollowings.length);
            setIsFollowingList(true);
        } catch (error) {
            setHasMoreFollowings(false);
            console.log(error);
        }
    };

    const unfollow = async (userId) => {
        try {
            await axios.post('/follow/unfollow-user', { unfollowId: userId }, { withCredentials: true });
            setAllFollowings((prevFollowings) => prevFollowings.filter(following => following.following._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="userInfo">
                <h3 className="name ">{user.name}</h3>
                <h4 className="username ">Username : {user.username} </h4>
                <h4 className="email">Email : {user.email}</h4>
                <div className="userInfo-flexBtn">
                    <div>
                    <p className="count">{user.followerCount}</p>
                    <button onClick={() => followerList()}>Followers</button>
                    </div>
                    <div>
                    <p className="count">{user.followingCount}</p>
                    <button onClick={() => followingList()}>Followings</button>
                    </div>
                </div>
                {
                    isFollowerList && 
                    <div className="followList">
                        <h4>Followers</h4>
                        {
                            allFollowers.map(follower => (
                                follower.follower && (
                                    <div key={follower.follower._id} className="eachFollow">
                                        <p> {follower.follower.username} </p>
                                    </div>
                                )
                            ))
                        }
                        {hasMoreFollowers && <button onClick={() => followerList(followerSkip)}>More</button>}
                        <button onClick={() => { setIsFollowerList(false) }}>Close</button>
                    </div>
                }
                {
                    isFollowingList && 
                    <div className="followList">
                        <h4>Followings</h4>
                        {
                            allFollowings.map(following => (
                                <div key={following.following._id} className="eachFollow">
                                    <p> {following.following.username} </p>
                                    <button onClick={() => unfollow(following.following._id)}>Unfollow</button>
                                </div>
                            ))
                        }
                        {hasMoreFollowings && <button onClick={() => followingList(followingSkip)}>More</button>}
                        <button onClick={() => { setIsFollowingList(false) }}>Close</button>
                    </div>
                }
            </div>
        </>
    );
}

export default UserInfo;
