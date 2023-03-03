import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard() {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-1.jpg" alt="blog" className="img-fluid" />
        </div>
        <div className="blog-content">
          <p className="date">01 FEB, 2023</p>
          <h5 className="title">1914 translation by H. Rackham</h5>
          <p className="desc">
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis
          </p>
          <Link to="/" className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
