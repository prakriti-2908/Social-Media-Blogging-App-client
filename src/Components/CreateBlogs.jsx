

import axios from "axios";
import { useState } from "react";
import './Styles/CreateBlogs.css';

function CreateBlogs() {
    const [title, setTitle] = useState("");
    const [textBody, setTextBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/blog/create-blog', { title, textBody }, { withCredentials: true });
            //console.log(response.data);
            // Clear form after successful submission
            setTitle("");
            setTextBody("");
            // console.log(response.data);
            if(response.data.status!==201){
                alert(response.data.error);
            }else{alert("New Voice has been posted");}
        } catch (error) {
            console.log("Error creating blog: ", error);
        }
    };

    return (
        <div className="create-blogs-container">
            <h2>Create a New Voice</h2>
            <form onSubmit={handleSubmit} className="create-blogs-form">
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Blog:
                    <textarea 
                        value={textBody} 
                        onChange={(e) => setTextBody(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateBlogs;
