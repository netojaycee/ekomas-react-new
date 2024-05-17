import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import facebookIcon from '../assets/images/facebookIcon.png'
import googleIcon from '../assets/images/googleIcon.png'
import { Link } from 'react-router-dom';

export default function Register() {
  return (
      <div className='flex flex-col bg-gray-300 w-full mx-auto justify-center p-10'>
      <div className="flex flex-col gap-3 bg-white md:w-[500px] w-[90%] mx-auto p-5 rounded-md shadow-md">
      <h2 className="text-center text-xl font-bold">Create Account</h2>


        <RegisterForm />
        {/* <div className='flex flex-row my-5 items-center'>
          <hr className='border-t border-gray-300 w-full' />
          <p className='mx-2'>or</p>
          <hr className='border-t border-gray-300 w-full' />
        </div> */}

        <div className='flex flex-col gap-3'>
          {/* <button className='flex flex-row py-3 px-10 bg-[#FC6767] rounded-sm items-center justify-center'>
            <img src={googleIcon} alt="" /> Sign up with Google
          </button>
          <button className='flex flex-row py-3 px-10 bg-[#6095CA] justify-center items-center rounded-sm'>
            <img src={facebookIcon} alt="" />  Sign up with Facebook
          </button> */}
        </div>

        <p className=' text-center'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div></div>
  );
}
