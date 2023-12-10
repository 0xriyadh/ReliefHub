import React from 'react';
import Image from 'next/image';
import Banner from '../ui/landingPage/banner';
import Button from '../ui/landingPage/button';
import ProductShowcase from '../ui/landingPage/productShowcase';
import ShowcaseCard from '../ui/landingPage/showcaseCard';
import Accordion from '../ui/landingPage/accordion';
import Footer from '../ui/landingPage/footer';

function LandingPage() {
  return (
    <div className="flex flex-col pt-20">
      <div className="w-100 h-4"></div>
      <Banner title="The effortless way to plan
         your meals with the power 
          of Notion." subtitle="Streamline your nutrition journey and achieve your health goals with
          ease."/>

      <div className='flex flex-row justify-center mt-20 space-x-3 font-bold'>
        <Button text='Sign Up' isActive={false} />
        <Button text='Sign In' isActive={true} />
      </div>

      <Image
        className=" w-full px-20 drop-shadow-xl"
        src="/nutritrack-hero-banner.png"
        width={512}
        height={512}
        objectFit="fit"
        alt="bannerImg"
      ></Image>
      <Banner title="Simplify Your Nutrition Journey with NutriTrack" subtitle="Hey there! Welcome to NutriTrack, the ultimate nutrition meal planner powered by Notion. We've got some awesome features lined up to make your nutrition journey a piece of cake (pun intended). Check them out:" />

      <ProductShowcase imgSrc='/features1.png' title='Shopping List' subtitle="We've got your grocery shopping covered! NutriTrack includes a handy shopping list feature. As you plan your meals, the template automatically generates a comprehensive shopping list. No more forgotten items or aimless wandering in the supermarket. Shopping for healthy ingredients has never been easier!" isReverse={false} />

      <ProductShowcase imgSrc='/features1.png' title='Effortless Planning' subtitle='Say goodbye to meal planning stress! With NutriTrack, planning your meals becomes a breeze. Our user-friendly Notion template lets you create customized daily or weekly meal plans effortlessly. Enjoy a balanced and nutritious diet without the hassle.' isReverse={true} />

      <Banner title="Master Your Meal Planning and Nutrition Journey" subtitle="Our comprehensive Notion template designed to empower you on your meal planning and nutrition journey. With our user-friendly features, customizable layouts, and seamless recipe integration, taking control of your meals has never been easier." />

      <div className='flex flex-row items-start px-40'>


        <ShowcaseCard imgSrc='/features1.png' title='Customizable Layouts' subtitle='Personalize your meal planning experience with our flexible layouts. Tailor your sections, categories, and tabs to suit your unique style and organization preferences. Our template adapts to your needs, providing a seamless and personalized planning experience.' />

        <ShowcaseCard imgSrc='/features1.png' title='Progress Tracking' subtitle="Celebrate your wins and stay motivated on your nutrition journey. NutriTrack allows you to monitor your progress with weight, measurements, and other key metrics. Track your improvements over time and see the positive impact of your healthy choices." />


      </div>

      <Banner title="Got some burning questions about NutriTrack? No worries! We've got the answers you need" />

      <Accordion />

      <Footer />



    </div>
  );
}

export default LandingPage;
