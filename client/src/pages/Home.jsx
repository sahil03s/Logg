import {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api").then(
            data => data.json()
        ).then(
            data => setData(data)
        )
    });

    function remove(id) {
        fetch("/delete/" + id, {method: 'DELETE'})
    }
    

    return (
        <>
        {data.map((blog) => {
                const ur = '/edit/'+blog._id+'/index';
                return (
                    <div className="container-blog" key={blog._id}>
                        <div className="blog">
                            <h4 className="blog-title">{blog.title}</h4>
                            <span className="icons">
                                
                                <button className="edit" type="submit" ><a href={ur} className="text-link"><EditIcon/></a></button>
                                <button className="delete" type="submit" onClick={() => remove(blog._id)}><DeleteIcon/></button>
                            </span>
                            <p> {blog.edited ? "Edited" : "Posted"} at {blog.curr_time} by <em><b>{blog.author}</b></em></p>
                            
                            <p>
                            {blog.content.length < 450 
                            ? blog.content : 
                            <p><span>{blog.content.substr(0,450) + "....."}</span><a href={"/blogs/" + blog._id}>Read More</a></p>
                            }
                            </p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

