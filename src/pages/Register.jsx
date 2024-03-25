import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import facebookIcon from '../assets/images/facebookIcon.png'
import googleIcon from '../assets/images/googleIcon.png'

export default function Register() {
  return (
      <div className='flex flex-col w-[80%] lg:w-[30%] mx-auto justify-center h-screen'>


        <RegisterForm />
        <div className='flex flex-row my-5 items-center'>
          <hr className='border-t border-gray-300 w-full' />
          <p className='mx-2'>or</p>
          <hr className='border-t border-gray-300 w-full' />
        </div>

        <div className='flex flex-col gap-3'>
          <button className='flex flex-row py-3 px-10 bg-[#FC6767] rounded-sm items-center justify-center'>
            <img src={googleIcon} alt="" /> Sign up with Google
          </button>
          <button className='flex flex-row py-3 px-10 bg-[#6095CA] justify-center items-center rounded-sm'>
            <img src={facebookIcon} alt="" />  Sign up with Facebook
          </button>
        </div>

        <p className='my-5 text-center'>
          Already have an account? <a href='/login'>Sign In</a>
        </p>
      </div>
  );
}
