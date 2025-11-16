import React from 'react'
import logo from '../assets/images/villaverde-logo2.svg'

const LoaderPage = () => {
    return (
        <div className='bg-[#1c1d21] w-full h-svh flex items-center justify-center'>
            <img src={logo} alt="" className='opacity-50'/>
        </div>
    )
}

export default LoaderPage