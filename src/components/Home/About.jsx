import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="bg-primary p-[10px] ">
      <div className="w-[80%] mx-auto text-center">
        <h1 className=" text-white font-bold text-xl my-[30px]">
          About Us
        </h1>
        <p className='text-white my-2'>Lorem ipsum dolor sit amet consectetur. Egestas urna odio nisl justo pellentesque ipsum. Et metus ut mauris cras. Aliquet dictum donec morbi ornare sed et lobortis nulla sed. Amet hac justo consectetur a id. Orci integer leo cursus sed viverra feugiat scelerisque a blandit. Eu cursus consectetur maecenas eleifend praesent molestie fusce ut platea. Euismod aenean sem nunc sagittis pellentesque sagittis semper vel et. Gravida leo commodo erat etiam. Est duis convallis feugiat eleifend metus diam. Id risus nascetur id venenatis id sem. Est id eget nec iaculis vitae sed id ut malesuada.</p>
       <Link to="/register"> <button className='border-2 mt-2 border-secondary px-20 py-2 mb-8 text-secondary'>Sign up</button></Link>
      </div>



    </div>
  )
}
