import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='h-screen flex flex-col lg:flex-row'>
      {/* Branding panel */}
      <div className='hidden lg:flex w-1/2 bg-[#10b461] text-white items-center justify-center p-10'>
        <div className='max-w-md text-center'>
          <div className='bg-white rounded-xl p-3 inline-block mb-6'>
            <img
              className='w-32 mx-auto'
              src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
              alt='Uber Logo'
            />
          </div>
          <h2 className='text-3xl font-bold mb-4'>Join Us Today!</h2>
          <p className='text-lg'>Create your account to get started with our platform.</p>
        </div>
      </div>

      {/* Signup form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-7'>
        <div className='w-full max-w-md'>
          <div className='lg:hidden mb-10'>
            <img
              className='w-16'
              src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
              alt='Uber Logo'
            />
          </div>

          <form onSubmit={submitHandler} className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium mb-2'>What's your name</h3>
              <div className='flex gap-4'>
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                  type='text'
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                  type='text'
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                type='email'
                placeholder='email@example.com'
              />
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input
                className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type='password'
                placeholder='password'
              />
            </div>

            <button className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'>
              Create account
            </button>
          </form>

          <p className='text-center mt-4'>
            Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link>
          </p>

          <div className='mt-8'>
            <p className='text-[10px] leading-tight text-center'>
              This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
