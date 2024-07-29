import axios from 'axios';


function Home() {

    const fetchAllBlogs = async() => {
        console.log("inside fetchAllBlogs");
        
        try {
            const response = await axios.get('http://localhost:8000/blog/get-all-blogs');
            console.log(response);
        } catch (error) {
            
        }
    }

    return(
        <>
            <h2>home hehe</h2>
            <button onClick={fetchAllBlogs}>Fetch</button>
        </>
    )
}

export default Home;