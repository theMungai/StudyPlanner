import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <div className='login-container grid place-content-center min-h-screen border border-[#A3A3A3]'>
        <div className='border p-6 rounded-md max-w-[440px] text-center'>
          <h1 className='text-2xl text-[#0F766EFF] font-bold'>Welcome to Student Assignment Planner</h1>
          <p className='text-[#A3A3A3] text-sm mb-[50px]'>Enter your credentials to access your account</p>
          <form className='block' onSubmit={handleLogin}>
            <input className="border border-[#A3A3A3] block rounded-md w-full py-1.5 px-2.5 mb-[40px] bg-[#465A7E66] text-white outline-none placeholder:text-white/70" type="text" name="name" id="name-input" placeholder="Your name" autoComplete='off' />
            <input className='block rounded-md w-full py-1.5 px-2.5 mb-4 bg-[#121212FF] text-white' type="password" placeholder='Password' autoComplete='off' />
            <button className='block rounded-md w-full p-1.5 bg-[#0D9488FF] cursor-pointer text-white mb-[50px]' type='submit'>Login</button>
          </form>
          <p className='text-[#A3A3A3] text-[13px]'>Do you have an account? <a href='#' className='text-[#0F766EFF] font-semibold'>Sign up</a></p>
        </div>
      </div>
      <footer className='w-full bg-[#121212FF] h-8'></footer>
    </>
  );
}

export default Login;
