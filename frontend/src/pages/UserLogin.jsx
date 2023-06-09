import React, { useReducer, useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import formReducer from '../reducers/formReducer'
import { USERS_URL } from '../utils/allUrls'
import { CUSTOM_HEADERS } from '../utils/axiosHeaders'

const UserLogin = () => {

  const initialFormState = { email: '', password: '' }
  const [formState, formDispatch] = useReducer(formReducer, initialFormState)
  const [invalidLoginError, setInvalidLoginError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const userData = await axios.post(`${USERS_URL}/login`, {
      email: formState.email,
      password: formState.password
    },
      CUSTOM_HEADERS
    )

    setIsLoading(false)
    if (userData.data._id) {
      dispatch({ type: 'LOGIN_USER', payload: userData.data._id })
      setInvalidLoginError(false)
      navigate('/user')
    } else {
      setInvalidLoginError(true)
    }
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    formDispatch({
      type: 'input',
      field: e.target.name,
      payload: e.target.value
    })
  }


  const gradientCustom = {
    background: "linear-gradient(109.6deg, rgb(187, 0, 212) 11.2%, rgb(32, 38, 238) 91.1%)"
  }

  return (
    <section className="h-100 w-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">Hyper Wasabi</h4>
                    </div>

                    {invalidLoginError ? <div className='text-center p-3 mb-4' style={{ backgroundColor: 'lightpink', color: 'darkred' }}>
                      Incorrect Email or Password
                    </div> : null}

                    <form onSubmit={onSubmit}>
                      {/* <h6 className="mb-4">Please login to your account</h6> */}

                      <div className="form-outline mb-4">
                        <label className="form-label mx-1" htmlFor="form2Example11">Username</label>
                        <input type="email" id="form2Example11" className="form-control" value={formState.email} onChange={(e) => { handleInputChange(e) }} name='email'
                          placeholder="Username or Email Address" />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label mx-1" htmlFor="form2Example22">Password</label>
                        <input type="password" id="form2Example22" className="form-control" value={formState.password} onChange={(e) => { handleInputChange(e) }} name='password' />
                      </div>

                      <div className="d-flex flex-column text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg mb-3 border-0" style={gradientCustom} type="submit">Log in</button>
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" className="btn btn-outline-danger">Create new</button>
                      </div>

                    </form>

                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center" style={gradientCustom}>
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;