"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ArrowRight, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { scrapeUrl } from '@/utils/netwrok';
import SelectComp, { SelCompProps } from './SelectComp';
import Link from 'next/link';

type FormData = {
    website_url: string;
    linkedin_url: string;
};

// type CompanyData = {
//     options: string[]; 
// };

type Props = {
};

const animatedComponents = makeAnimated();

const HomePage = ({ }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        website_url: '',
        linkedin_url: '',
    });

    const [companyData, setCompanyData] = useState<SelCompProps[]>([]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post(scrapeUrl, formData);
            const companyData = res.data.company_data;
            setCompanyData(companyData);
        } catch (error) {
            console.error(error);
        }
    };

    const SendSelectedItems = async (e: React.FormEvent) => {
        e.preventDefault()
        const selectedItems = companyData.filter((company) => company.options);
        // Then send selectedItems to API
        try {
            await axios.post(scrapeUrl, selectedItems);

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center mt-10">
            <form onSubmit={handleFormSubmit} className="w-full max-w-md">
                <div className="mb-6">
                    <label htmlFor="website_url" className="text-xl font-bold mb-2">
                        Linkden URL:
                    </label>
                    <div className="relative">
                        <Input
                            type="url"
                            name="linkedin_url"
                            placeholder='Include https:// or http://'
                            value={formData.linkedin_url}
                            onChange={handleFormChange}
                            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="linkedin_url" className="text-xl font-bold mb-2">
                        Website URL:
                    </label>
                    <div className="relative">
                        <Input
                            type="url"
                            placeholder='Include https:// or http://'
                            name="website_url"
                            value={formData.website_url}
                            onChange={handleFormChange}
                            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-40 flex align-center justify-center items-center px-4 py-2 bg-slate-900 text-white rounded hover:bg-blue-600 transition duration-300 self-center"
                    onClick={handleFormSubmit}
                >
                    <span className="mr-2">Submit</span>
                    <Send className="h-4 w-4 opacity-75" />
                </Button>
            </form>
            <div className="mt-10">
                {companyData.map((company, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-lg font-semibold">WEB URLS</h2>
                        <SelectComp options={company.options} />
                    </div>
                ))}
                <Button
                    className="w-80 flex align-center justify-center items-center px-4 py-2 bg-slate-900 text-white rounded hover:bg-blue-600 transition duration-300 self-center"
                    onClick={SendSelectedItems}
                >
                    <span className="mr-2">Send Selected Items</span>
                    <Send className="h-4 w-4 opacity-75" />
                </Button>
            </div>

            <div className="w-full flex justify-end mt-10 mr-20">
                <Link href="/analysis">
                    <ArrowRight className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer" />
                </Link>
            </div>
        </div>

    );
};

export default HomePage;
