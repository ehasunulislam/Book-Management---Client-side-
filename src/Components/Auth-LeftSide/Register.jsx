import Link from 'next/link'
import React from 'react'


const Register = () => {
  return (
    <div className='text-white mt-8 flex justify-center items-center flex-col'>
      <p className='mb-6'>Already have Account? Login now.</p>

      <Link href="/login" className="btn border border-white px-8 py-3 rounded-[10px] hover:bg-white hover:text-black transition-colors">Login now</Link>
    </div>
  )
}

export default Register
