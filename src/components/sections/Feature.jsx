import React from 'react'
import Container from '../Container'

const Feature = ({ fields }) => {
    return (
        <div>
            <div id="Inwestycja" />
            <div
                className="
          min-h-svh relative 
          bg-scroll
          bg-center bg-cover bg-no-repeat
        "
                style={{
                    backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${fields?.image?.value})
          `,
                }}
            >
                <Container>
                    <div className="absolute bottom-[150px]">
                        <p className='text-shadow-sm font-cormorant-regular text-white text-[32px] md:text-[48px] lg:text-[64px]'>
                            {fields?.title?.value}
                        </p>
                    </div>
                </Container>
            </div>

            <div className="py-[50px] md:py-[100px]">
                <Container>
                    <p className='font-cormorant-regular text-[#474747] text-[26px] text-center max-w-[1200px] mx-auto'>
                        {fields?.content?.value}
                    </p>
                </Container>
            </div>

            <div className="bg-[#FCFCFC] py-[50px] md:py-[100px]">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[32px]">
                        {fields?.featureList?.value.map((item) => (
                            <div
                                className="flex items-center flex-col gap-[40px] md:px-[32px] pb-[32px] lg:pb-0"
                                key={item.id || item.text}
                            >
                                <img src={item.icon} alt="" className='h-[80px] md:h-auto' />
                                <p className='font-cormorant-regular text-[#474747] text-[23px] md:text-[26px] text-center'>
                                    {item?.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Feature
