import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'

const SingleProduct = () => {
  const [orderedProduct, setOrderedProduct] = useState(true)

  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="main-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
      <div className="description-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h2 className="mb-2">Customer Reviews</h2>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor={'#ffd700'}
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href="/"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor={'#ffd700'}
                      />
                    </div>
                    <div>
                      <textarea
                        cols="30"
                        rows="4"
                        className="form-control w-100"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Navdeep</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor={'#ffd700'}
                      />
                    </div>
                    <p className="mt-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper home-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard />
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleProduct
