import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";


const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', { email, password, rememberMe });

    // Example: Add validation
    if (!email || !password) {
      console.error('Email and password are required.');
      // Handle error or show a message to the user
      return;
    }

    // Example: Simulate a login request
    // You might want to use an authentication service and handle the response accordingly
    // For simplicity, this example just logs the success message
    console.log('Login successful!');
  };

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <Input
          size="md"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded-none'
        />
      </div>
      <div>
        <Input
          size="md"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" // Use secure text entry for passwords
          className='rounded-none'
        />
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            className='m-1'
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>
      </div>
      <div>
        <button onClick={handleLogin} className='flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full'>
          Sign in<ArrowRightIcon className=" w-6"/>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginForm;
