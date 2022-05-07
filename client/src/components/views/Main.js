import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import "./Main.css";
// import background from "../images/blogimg.jpg";
import moment from "moment";

const Main = () =>{

    const [blogs, setBlogs] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/blogs/getAll")
            .then(res => {
                console.log(res.data);
                setBlogs(res.data.results);
            })
            .catch(err => console.log(err))
    }, [])
    console.log(blogs)

    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            {withCredentials: true}
            )
            .then(res => {
                console.log(res.data.username);
                setLoggedUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const onClickDelete = (blogId, i)=>{
        axios.delete(`http://localhost:8000/api/blogs/${blogId}/delete`)
            .then(res => {
                console.log(res);
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            })
            .catch(err => console.log(err));
            navigate("/");
    }
    const navigateLife = ()=>{
        navigate("/life");
        // console.log(window.location.href.split('/')[3]);
    }
    const navigateSociety = ()=>{
        navigate("/society");
    }
    const navigateLove = ()=>{
        navigate("/love");
    }
    const navigateFav = ()=>{
        navigate("/topLiked");
    }


    return(
        <div>
            <div className="Scroll">
                <div>
                    {
                            blogs.map((blog, index)=>{
                                return (
                                    <div key={index} className="Blogs">
                                        <div className="One-Blog">
                                            <div className="Title-Div">
                                                <Link to ={`/${blog._id}`} style={{textDecoration: "none"}}><h1 className="Link-H1">{blog.title}</h1></Link>
                                                
                                            </div>
                                            <p className="category">Blog category: {blog.categories}</p>
                                            <div className="author-likes">  
                                                <div className="author">
                                                    <div> 
                                                        {
                                                            blog.createdBy.username === loggedUser.username ?
                                                            (
                                                                <p>Blog created by: YOU |</p>
                                                            ) :
                                                            (
                                                                <p>Blog created by: {blog.createdBy.username} <span className="Line"> | </span> </p>
                                                            ) 
                                                        }
                                                    </div>
                                                    <p>Creation Date: {moment(`${blog.createdAt}`).format('l')}</p>
                                                </div>
                                                <div className="Likes">
                                                    <p>{blog.likes} Like(s)</p>
                                                </div>
                                            </div>
                                            
                                            {
                                                blog.createdBy.username === loggedUser.username ?
                                                (<div>
                                                    <button onClick={()=>navigate(`/edit/${blog._id}`)}>EDIT</button>
                                                    <button onClick={()=>onClickDelete(blog._id)}>DELETE</button>
                                                </div>
                                                ) :
                                                null
                                            }
                                            <div className="DESC">
                                                <p id="descript">{blog.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                </div>
                <div className="Categories">
                        <div className="buy-section">
                            <h1 id="txt-near-btn">CHOOSE A CATEGORY</h1>
                            <div className="SubCateg">
                                <button className="Btn" onClick={navigateLife}>LIFE</button>
                                <button className="Btn" onClick={navigateSociety}>SOCIETY</button>
                                <button className="Btn" onClick={navigateLove}>LOVE</button>
                                <button className="Btn" onClick={navigateFav}>TOP LIKED</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Main;