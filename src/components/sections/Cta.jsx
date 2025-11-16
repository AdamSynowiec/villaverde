import React from 'react'
import Container from '../Container'
import logo from '../../assets/images/villaverde-logo2.svg'
import { Link } from 'react-router-dom'
const Cta = () => {
    return (
        <div className='py-[50px] lg:py-[100px] bg-[#1C1D21]'>
            <Container>
                <div className="flex flex-col items-center justify-center text-center">
                    <img src={logo} alt="" />
                    <h2 className='text-[#C8A35F] font-ebgaramond-regular text-[32px] lg:text-[64px] py-[24px]'>
                        <Link to={"tel: +48 518 451 555"}>+48 518 451 555</Link>
                    </h2>
                    <p className='font-ebgaramond-regular text-[#FCFCFC] text-[26px] text-center max-w-[1200px] mx-auto'>Zadzwoń już dziś i przekonaj się, dlaczego Villa Verde to idealne miejsce dla tych, którzy cenią estetykę, komfort i najwyższą jakość życia.</p>
                </div>
            </Container>
        </div>
    )
}

export default Cta