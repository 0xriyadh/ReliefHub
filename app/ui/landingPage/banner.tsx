import React from 'react'


interface BannerProps {
  title: string;
  subtitle?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  return (
    <div className=" px-60 text-center mt-20 transition delay-200 duration-500">
      <div
        id="badge"
        className="mb-4 inline-block rounded-3xl border border-gray-400 p-1.5"
      >
        Discover NutriTrack!
      </div>
      <h1 className="  mb-4 text-6xl font-black font-bold">
        {title}
      </h1>

      <h3 className="font-grey-800 text-lg">
        {subtitle}
      </h3>
    </div>
  )
}

export default Banner;