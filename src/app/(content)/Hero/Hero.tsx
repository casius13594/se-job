"use client"
import Image from 'next/image'
import { CustomButton } from '.';

const Hero = () => {
  const handleScroll = () => {

  }

  return (
    <div className="Hero">
      <div className="pt-36 padding-x">
        <div className="hero__container-1 flex flex-row justify-between 
        pt-16 padding-x mt-2 bg-light-green rounded-3xl">
          <div className="flex-1">
                <h1 className="hero__title text-red">Expand network</h1>
                <h1 className="hero__title text-green">Explore your potential</h1>
                <p className="hero__subtitle">Where to find your career prospect? How to communicate between employee and employer</p>
                <div className="flex flex-row space-x-3">
                  <CustomButton
                    title="Know more"
                    containerStyles="bg-green text-white min-w-[153px] mt-10"
                    handleClick={handleScroll}
                  />
                  <CustomButton
                    title="About us"
                    containerStyles="bg-red text-white min-w-[153px] mt-10"
                    handleClick={handleScroll}
                  />
                </div>
          </div>
          
          <div className="hero__image mt-9" style={{height:389, width:608, borderRadius: '25px', overflow: 'hidden'}}>
            <Image src="/hero.png" alt="hero" layout="fill" objectFit="cover" className="object-contain"/>
          </div>
        </div>
        
        <div className="hero__container-2 flex flex-row justify-between 
        padding-y padding-x -mt-28 bg-green rounded-b-3xl" style={{height:450}}>
          <div className="hero__container-2__left flex flex-col flex-1 ">
            <div className="hero__container-2__left-top flex-1 flex flex-row items-center">
              <div className="relative w-20 h-44">
                <Image
                  src="/rectangle_hero_left.png"
                  alt="arrow_left"
                  fill
                  className="object-contain"
                />
              </div>
              <CustomButton
                title="Brilliant fields"
                containerStyles="text-white text-5xl mt-10 font-bold"
              />
            </div>
            <div className="hero__container-2__left-mid flex-1 flex flex-col items-end">
              <CustomButton
                title="AI"
                containerStyles="text-white text-7xl mt-10 font-extrabold"
              />
            </div>
            <div className="hero__container-2__left-bot flex-1 flex flex-col items-center">
              <CustomButton
                title="Logistic"
                containerStyles="text-white text-5xl mt-10"
              />
            </div>
          </div>
          <div className="hero__container-2__mid flex-1 flex flex-col items-center">
            <CustomButton
              title="IT"
              containerStyles="flex-1 text-white text-9xl mt-10 font-extrabold"
            />
            <CustomButton
              title="Art"
              containerStyles="flex-1 text-white text-7xl mt-10 font-light"
            />
          </div>
          <div className="hero__container-2__right flex-1 flex flex-col">
            <div className="hero__container-2__right-top flex-1 flex flex-row items-end">
                <CustomButton
                  title="Finance"
                  containerStyles="text-white text-8xl mt-10 font-bold"
                />
            </div>
            <div className="relative w-20 h-44 place-self-end">
              <Image
                src="/rectangle_hero_right.png"
                alt="arrow_right"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero