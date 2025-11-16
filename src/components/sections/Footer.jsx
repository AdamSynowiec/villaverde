import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='h-[100px] bg-[#1C1D21]'>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 flex items-center h-[100px]">
                    <div className="text-center lg:text-left font-ebgaramond-regular text-[#FCFCFC] text-[20px]">
                        <span>Copyright by VillaVerde 2025</span>
                    </div>
                    <div className="text-center lg:text-right">
                        <ul className='flex flex-row justify-center lg:justify-end divide-x font-ebgaramond-regular text-[#FCFCFC] text-[20px]'>
                            <li className='px-2'>
                                <Link to={"/polityka-prywatnosci"}>Polityka prywatności </Link></li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer