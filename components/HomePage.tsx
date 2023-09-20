"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import FormComponent from './FormComponent';
import { scrapeUrl } from '@/utils/netwrok';

interface FormData {
    website_url: string;
    linkedin_url: string;
  };

interface CompanyProps {
   home: { url: string}
  }
interface RespData {
    company_url : CompanyProps
}

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    website_url: '',
    linkedin_url: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(scrapeUrl, formData);
      const company_data = res.data.company_data
      console.log(res.data.company_data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-100 w-100 flex flex-col items-center justify-center p-10">
      <div className="w-100 flex flex-col items-center gap-4">
        <FormComponent
          label="LinkedIn Link"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={(value) => setFormData({ ...formData, linkedin_url: value })}
        />
        <FormComponent
          label="Website Link"
          placeholder="Website URL"
          value={formData.website_url}
          onChange={(value) => setFormData({ ...formData, website_url: value })}
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          onClick={handleSubmit}
        >
          <Send className="h-4 w-4 opacity-2" />
        </Button>
      </div>
      <div className="w-100 flex flex-wrap items-center gap-4 mt-10">
        <form className="w-full">
          <Input
            placeholder="Enter LinkedIn URL"
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
          />
        </form>
      </div>
      <div className="w-full flex justify-end mt-10">
        <Link href="/analysis">
          <ArrowRight className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
