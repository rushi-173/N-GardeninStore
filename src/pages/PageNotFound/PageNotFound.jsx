import React from 'react'
import FOF from "./404.png";
import { Link } from 'react-router-dom';

export function PageNotFound() {
    return (
        <div className="container-column">
            <img src={FOF} alt="not_found" style={{height:"50vh", width:"auto"}}/>
            <h2>Page Not Found</h2> <Link to="/" className="btn btn-primary">Return To Home</Link>
        </div>
    )
}

