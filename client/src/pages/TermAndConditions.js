import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'

const TermAndConditions = () => {
  return (
    <>
      <Meta title="Terms And Conditions" />
      <BreadCrumb title="Terms And Conditions" />
      <div className="policy-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermAndConditions
