import {useEffect, useState} from 'react';


export default function Edit() {
    const [blog, setBlog] = useState({});
    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        fetch(window.location.href).then(
            data => data.json()
        ).then(
            data => {
                setBlog(data.blog)
                setRedirect(data.redirect)
            } 
        )
    }, []);

    let ur = "/save/" + redirect;
    
    function handleChange(event) {
        setBlog((prev) => {
            return {
                ...prev,
                [event.target.name]:event.target.value,
            }
        });
    }


    return (
        <div className="body">
            <form action={ur} method='post'>
                <label htmlFor="author">Author : </label>
                <input type="text" name="author" id="author" value={blog.author || ' '} onChange={handleChange} required/><br/><br/>
                <label htmlFor="title">Title : </label>
                <input type="text" name="title" id="title" value={blog.title || ' '} onChange={handleChange} required/><br/><br/>
                <textarea name="content" rows="10" cols="150" value={blog.content || ' '} onChange={handleChange}/><br/>
                <button type="submit" value={blog._id} name="id">Save</button>
            </form>
        </div>

    );
};