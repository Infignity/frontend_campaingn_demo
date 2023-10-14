"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import homePage from "@/public/homePage.png";
import { Input } from './ui/input';
import { Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { proxy } from 'valtio';
import axios from 'axios';
import { scrapeUrl } from '@/utils/netwrok';
import { motion } from 'framer-motion';
import { slideInVariant } from '@/utils/motion';
import { HashLoader } from 'react-spinners';
import styles from './css/styles.module.css'

type Props = {}

type FormData = {
  website_url: string;
};


export const state = proxy({
  task_id: ""
})



const HomeView = (props: Props) => {

  const [formData, setFormData] = useState<FormData>({
    website_url: '',
  });

  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(scrapeUrl, formData);
      const taskID = res.data;
      state.task_id = taskID;
      localStorage.setItem("task_id", state.task_id);
      router.push("/analysis");
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={`relative ${styles.hero}`}>


        {/* <div className='flex w-full items-center' >
        <div className='flex w-full flex-col m-[15%] '>
          <div className="flex flex-col justify-center items-left text-left">

            <h1 className="text-gray-900 font-semibold text-5xl font-inter">Company&apos;s Website</h1>
            <h3 className="text-gray-500 mt-4 mb-4 text-lg font-inter font-light">
              To help us better connect and understand your profile,<br />
              we kindly request that you provide your website URL and LinkedIn profile URL
            </h3>


            <form
              onSubmit={handleFormSubmit}
              className='w-full flex space-x-1'
            >
              <Input type="text"
                placeholder="https://magicpitch.ai"
                name="website_url"
                value={formData.website_url}
                onChange={handleFormChange}
              />
              {
                loading ? (
                  <div className="flex items-center justify-center">
                    <HashLoader size={35} color={"#5B0AE1"} loading={loading} />
                  </div>
                ) : (
                  <Button type="submit" className="w-40 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-md p-2 ml-5  hover:bg-violent-500"><Wand2 className="w-4 h-4 text-white" /><p className="font-inter text-base p-2 text-white font-light">Submit</p></Button>
                )}
            </ form >


          </div>

        </div>
        <div className='flex flex-col justify-center items-center mr-[5%]'>
          <Image src="https://illustrations.popsy.co/violet/keynote-presentation.svg" alt="Home Page Image" width={1500} height={1500} />

        </div>
      </div> */}

      {/* Home Page Code With Email images - Digvijay Kadam */}
        <div className="flex justify-center  items-center gap-20 m-8 scroll-my-10">
          <div className="p-6">
            <div className=' flex  flex-col '>
              <a href="" className='text-[#5B0AE1]  py-3'>Learn More about &rarr;</a>
              <h1 className="text-4xl font-bold mb-4 py-2">Company&apos;s Website</h1>
              <p className="text-lg text-gray-700 mb-4 py-2">To help us better connect and understand your profile,<br />
                we kindly request that you provide your website URL and LinkedIn profile URL</p>
              <form
                onSubmit={handleFormSubmit}
                className='w-medium flex space-x-1 w-100'
              >
                <Input type="text"
                  placeholder="https://magicpitch.ai"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleFormChange}
                  className='px-4 py-7 '
                />
                {
                  loading ? (
                    <div className="flex items-center justify-center ">
                      <HashLoader size={35} color={"#5B0AE1"} loading={loading} />
                    </div>
                  ) : (
                    <Button type="submit" className="w-40 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-md px-4 py-7  ml-5  hover:bg-violent-500"><Wand2 className="w-4 h-4 text-white" /><p className="font-inter text-base p-2 text-white font-light">Submit</p></Button>
                  )}
              </ form >
            </div>

          </div>
          <div className={styles.image}>
            <Image
              src="https://www.magicpitch.ai/images/gmail_4.svg"
              alt="Home Page Image"
              width={160}
              height={50}
              style={{
                boxShadow: '0px 5px 15px rgba(91, 10, 225, 0.35)',
                borderRadius: '10px',
              }}
            />
          </div>


        </div>
        <div className="flex justify-center flex-col items-center overflow-hidden ">
          <Image
            src="https://www.magicpitch.ai/images/gmail_1.svg"
            alt="Home Page Image"
            width={700}
            height={250}
            className='border-b-4'
          />
  
        </div>
        <hr />
      </div>
              <hr />
      <p className='text-center text-gray py-6'><a href="">Terms & conditions</a>  |  <a href="">Policies</a></p>
    </div>



  )
}

export default HomeView
