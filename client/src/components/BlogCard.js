import React from 'react'
import { Link } from 'react-router-dom'
import blog from '../images/blog-1.jpg'

function BlogCard() {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={blog} alt="blog" className="img-fluid w-100" />
      </div>
      <div className="blog-content">
        <p className="date">01 FEB, 2023</p>
        <h5 className="title">1914 translation by H. Rackham</h5>
        <p className="desc">
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
