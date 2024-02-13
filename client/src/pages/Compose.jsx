export default function Compose() {
    return (
        <div className="body">
            <form action="/" method="post">
                <label for="author">Author : </label>
                <input type="text" name="author" id="author" required/><br/><br/>
                <label for="title">Title : </label>
                <input type="text" name="title" id="title" required/><br/><br/>
                <textarea name="content" rows="10" cols="150" placeholder="Write your blog."></textarea><br/>
                <button type="submit" value="publish">Publish</button>
            </form>
        </div>
    );
};