import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    // Reset form
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='h-screen flex flex-col lg:flex-row'>
      {/* Branding section */}
      <div className='hidden lg:flex w-1/2 bg-[#10b461] text-white items-center justify-center p-10'>
        <div className='max-w-md text-center'>
          <div className='bg-white rounded-xl p-3 inline-block mb-6'>
            <img
              className='w-32 mx-auto rounded-lg'
              src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
              alt='Uber Logo'
            />
          </div>
          <h2 className='text-3xl font-bold mb-4'>Captain Signup</h2>
          <p className='text-lg'>Drive with us. Fill out your profile and start earning today.</p>
        </div>
      </div>

      {/* Signup Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-7 overflow-y-auto'>
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
              <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                type='password'
                placeholder='password'
              />
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
              <div className='flex gap-4 mb-4'>
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                  type='text'
                  placeholder='Vehicle Color'
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                  type='text'
                  placeholder='Vehicle Plate'
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>
              <div className='flex gap-4'>
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                  type='number'
                  placeholder='Capacity'
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg'
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value='' disabled>Select Type</option>
                  <option value='car'>Car</option>
                  <option value='auto'>Auto</option>
                  <option value='moto'>Moto</option>
                </select>
              </div>
            </div>

            <button className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'>
              Create Captain Account
            </button>
          </form>

          <p className='text-center mt-4'>
            Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
          </p>

          <p className='text-[10px] mt-6 leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and{' '}
            <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
