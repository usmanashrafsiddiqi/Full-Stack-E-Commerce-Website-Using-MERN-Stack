import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/NewsletterBox'
const About = () => {
  return (
    <div >
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />


      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className=' w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quo accusamus distinctio! Ducimus, nesciunt quae voluptatum eius omnis facilis illo exercitationem id reprehenderit, nam praesentium, quasi repudiandae necessitatibus suscipit porro.</p>
          <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem nobis, odio magni, cum corporis eligendi nostrum eveniet facere modi quisquam fugiat commodi beatae quaerat, repudiandae asperiores ipsa accusamus veritatis.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, ipsa? Minus placeat laudantium molestiae odit facilis, dolorem expedita omnis aliquam dolor iste. Aspernatur, sequi quae? Alias fugit laboriosam debitis voluptatum.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut suscipit doloremque deserunt animi totam harum omnis deleniti, reprehenderit quidem rerum.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ullam fugit! Nesciunt, obcaecati officia illo magni in exercitationem sunt!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exception Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ullam fugit! Nesciunt, obcaecati officia illo magni in exercitationem sunt!</p>
        </div>

      </div>
           
           <NewsletterBox/>
    </div>
  )
}

export default About
