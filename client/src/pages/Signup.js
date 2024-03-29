import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

function Signup() {
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form className="d-flex flex-column gap-15">
                <CustomInput type="text" name="name" placeholder="Name" />
                <CustomInput type="email" name="email" placeholder="Email" />
                <CustomInput type="tel" name="email" placeholder="Email" />
                <CustomInput
                  className="mt-1"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="">
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Signup
