import React from 'react';
import facebookIcon from '../../assets/images/facebookIcon.png'
import googleIcon from '../../assets/images/googleIcon.png'
import LoginForm from '../PageComponents/Auth/LoginForm';

export default function Login() {
  return (
      <div className='flex flex-col w-[80%] md:[50%] lg:w-[30%] mx-auto justify-center h-screen'>
        <div className='flex flex-col gap-3'>
          <button className='flex flex-row py-3 px-4 md:px-10 bg-[#FC6767] rounded-sm items-center justify-center'>
            <img src={googleIcon} alt="" /> Sign in with Google
          </button>
          <button className='flex flex-row py-3 px-10 bg-[#6095CA] justify-center items-center rounded-sm'>
            <img src={facebookIcon} alt="" />  Sign in with Facebook
          </button>
        </div>
        <div className='flex flex-row my-5 items-center'>
          <hr className='border-t border-gray-300 w-full' />
          <p className='mx-2'>or</p>
          <hr className='border-t border-gray-300 w-full' />
        </div>



        <LoginForm />

        <p className='my-5 text-center'>
          Don't have an account? <a href='/register'>Register here</a>
        </p>
      </div>
  );
}
