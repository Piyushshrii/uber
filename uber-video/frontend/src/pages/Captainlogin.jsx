import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex flex-col lg:flex-row'>
      {/* Branding section */}
      <div className='hidden lg:flex w-1/2 bg-[#10b461] text-white items-center justify-center p-10'>
        <div className='max-w-md text-center'>
           <div className="bg-white rounded-xl p-3 inline-block">
  <img
    className="w-32 mx-auto "
    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
    alt="Uber Logo"
  />
</div>
          <h2 className='text-3xl font-bold mb-4'>Captain Portal</h2>
          <p className='text-lg'>Drive. Earn. Repeat. Log in to manage your captain dashboard.</p>
        </div>
      </div>

      {/* Login Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-7'>
        <div className='w-full max-w-md'>
          <div className='lg:hidden mb-10'>
            <img
              className='w-20'
              src='https://www.svgrepo.com/show/505031/uber-driver.svg'
              alt='Uber Captain Logo'
            />
          </div>

          <form onSubmit={submitHandler} className='space-y-6'>
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
              Login
            </button>
          </form>

          <p className='text-center mt-4'>
            Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
          </p>

          <div className='mt-8'>
            <Link
              to='/login'
              className='bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin
