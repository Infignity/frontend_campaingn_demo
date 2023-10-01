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
import { ClipLoader } from 'react-spinners';


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
    <div>
      <div className='flex w-full items-center'>
        <div className='flex w-full flex-col m-[15%] '>
          <div className="flex flex-col justify-center items-left text-left">
            <h1 className="text-gray-900 font-semibold text-5xl font-inter">Let&apos;s Stay Connected</h1>
            <h3 className="text-gray-900 mt-4 mb-4 text-xl font-inter">
              To help us better connect and understand your profile,<br />
              we kindly request that you provide your website URL and LinkedIn profile URL
            </h3>


            <motion.form
              onSubmit={handleFormSubmit}
              variants={slideInVariant}
              initial="hidden"
              className='w-full flex space-x-1'
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input type="text"
                placeholder="Paste your Website URL"
                name="website_url"
                value={formData.website_url}
                onChange={handleFormChange}
              />
              {
                loading ? (  // Render the ClipLoader when loading
                  <div className="flex items-center justify-center">
                    <ClipLoader size={35} color={"black"} loading={loading} />
                  </div>
                ) : (
                  <Button type="submit" className="w-40 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-md p-2 ml-2  hover:bg-[#F2EFF8]"><Wand2 className="w-4 h-4 text-gray-900 hover:text-gray-900" /><p className="font-inter text-base p-2 text-gray-900 font-light">Generate</p></Button>
                )}
            </ motion.form >


          </div>

        </div>
        <div className='flex flex-col justify-center items-center mr-[5%]'>
          <Image src={homePage} alt="Home Page Image" width={500} height={300} />

        </div>
      </div>

    </div>


  )
}

export default HomeView