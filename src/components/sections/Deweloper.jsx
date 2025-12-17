import React from 'react'
import kgdViz from '../../assets/images/kgd-wiz.png';
import { Link } from 'react-router-dom';

const Deweloper = () => {
    return (
        <section className='py-[50px] md:py-[100px] bg-[#FCFCFC]'>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-w-[720px] ml-auto px-4 mb-[50px] md:mb-0">
                    <h2 className='font-ebgaramond-regular text-[32px] md:text-[64px] mb-[24px] text-[#474747]'>KGD - Deweloper</h2>
                    <p className='font-ebgaramond-regular font-thin text-[18px] md:text-[24px] text-[#474747]'>WOLA JUSTOWSKA INWESTYCJE 2  Z O.O. stanowi część Krakowskiej Grupy Deweloperskiej (KGD) to wiodący deweloper specjalizujący się w realizacji inwestycji premium w najbardziej prestiżowych lokalizacjach Krakowa.
                        Portfolio KGD to szereg zrealizowanych z sukcesem projektów, które wyróżniają się najwyższą jakością wykonania i bezkompromisowym podejściem do detali. Każda nasza inwestycja to starannie przemyślana koncepcja, łącząca kameralny charakter z ponadczasową elegancją. Obecnie, bazując na naszym doświadczeniu, planujemy rozwój działalności w kolejnych dzielnicach Krakowa.</p>
                    <Link to={"https://kgd-group.pl/"}>
                        <button className='mt-[24px] font-ebgaramond-regular bg-[#C9AB8B] text-white py-[10px] px-[32px] rounded-[5px] text-[20px] cursor-pointer w-full md:w-auto'>Dowiedz się więcej</button>
                    </Link>
                </div>
                <div className="">
                    <img src={kgdViz} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Deweloper