import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Blog() {
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(window.location.href).then(
            data => data.json()
        ).then(
            data => setBlog(data)
        ).then(
            console.log(blog)
        )
    }, []);

    function remove(id) {
        try {
            fetch("/delete/" + id, {method: 'DELETE'});
            navigate("/");
        }
        catch(e) {
            navigate("/");
        }
    }

    return (
        <div class="container-blog">
        <a class="material-icons back" href="/"><ArrowBackIcon/></a>
            <div class="blog">
                <h4 class="blog-title">{blog.title}</h4>
                <span class="icons">
                    <button className="edit" type="submit" ><a href={'/edit/'+blog._id+'/blogs'} className="text-link"><EditIcon/></a></button>
                    <button className="delete" type="submit" onClick={() => remove(blog._id)}><DeleteIcon/></button>
                </span>
                <p>{blog.edited ? "Edited" : "Posted"} at {blog.curr_time} by <em><b>{blog.author}</b></em></p>
                <p>{blog.content}</p>
            </div>
        </div>
    );
}
