import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import wish from '../images/wish.svg'
import watch from '../images/watch.jpg'
import watch_1 from '../images/watch-1.jpeg'
import prodcompare from '../images/prodcompare.svg'
import view from '../images/view.svg'
import cart from '../images/add-cart.svg'

function ProductCard({ grid }) {
  const location = useLocation()

  return (
    <>
      <div
        className={`${
          location.pathname === '/product' ? `gr-${grid}` : 'col-3'
        }`}
      >
        <Link
          to={`${
            location.pathname === '/'
              ? '/product/:id'
              : location.pathname === '/product/:id'
              ? '/product/:id'
              : ':id'
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} alt="product" className="img-fluid" />
            <img src={watch_1} alt="product" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              value={3}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              At vero eos et accusamus et iusto osio dignissimos ducimis qui
              blanditiis prasentium voluptatum deleniti atque currupti quos
              dolores e quas molestias exceptuti sint occaecati cupiditate nin
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={cart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`${
          location.pathname === '/product' ? `gr-${grid}` : 'col-3'
        }`}
      >
        <Link
          to={`${
            location.pathname === '/'
              ? '/product/:id'
              : location.pathname === '/product/:id'
              ? '/product/:id'
              : ':id'
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} alt="product" className="img-fluid" />
            <img src={watch_1} alt="product" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              value={3}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              At vero eos et accusamus et iusto osio dignissimos ducimis qui
              blanditiis prasentium voluptatum deleniti atque currupti quos
              dolores e quas molestias exceptuti sint occaecati cupiditate nin
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={cart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`${
          location.pathname === '/product' ? `gr-${grid}` : 'col-3'
        }`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} alt="product" className="img-fluid" />
            <img src={watch_1} alt="product" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              value={3}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              At vero eos et accusamus et iusto osio dignissimos ducimis qui
              blanditiis prasentium voluptatum deleniti atque currupti quos
              dolores e quas molestias exceptuti sint occaecati cupiditate nin
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={cart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`${
          location.pathname === '/product' ? `gr-${grid}` : 'col-3'
        }`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={watch} alt="product" className="img-fluid" />
            <img src={watch_1} alt="product" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              value={3}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              At vero eos et accusamus et iusto osio dignissimos ducimis qui
              blanditiis prasentium voluptatum deleniti atque currupti quos
              dolores e quas molestias exceptuti sint occaecati cupiditate nin
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={cart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard
