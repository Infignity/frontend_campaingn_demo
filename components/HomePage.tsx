"use client"
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import SelectComp, { SelCompProps } from './SelectComp';
import { Card } from './ui/card';
import { ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';
import illustrate1 from "@/public/illustrate1.png"
import Image from "next/image"
import { motion } from "framer-motion"
import { buttonHoverVariant, fadeInVariant, rotateHoverVariant, slideInVariant } from '@/utils/motion';
import { scrapeUrl } from '@/utils/netwrok';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type FormData = {
    website_url: string;
    linkedin_url: string;
};

type Props = {}


const HomePage = ({ }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        website_url: '',
        linkedin_url: '',
    });

    const router = useRouter()
    const [companyData, setCompanyData] = useState<SelCompProps[]>([]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post(scrapeUrl, formData);
            //loading then push to analysis page
            router.push("/analysis")
            console.log(res)
            
        } catch (error) {
            console.error(error);
        }
    };

    // we dont neeed to get the links no more
    // const SendSelectedItems = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     const selectedItems = companyData.filter((company) => company.options);
    //     // Then send selectedItems to API
    //     try {
    //         await axios.post(scrapeUrl, selectedItems);

    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <div className="w-full px-10 flex items-center justify-center mt-10"

        >
            <Card className="flex relative flex-row w-11/12 md:w-3/4 max-w-4xl p-8 h-full shadow-md">
                {/* Left side with form */}
                <motion.div className="w-full md:w-1/2"
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}>
                    <motion.form onSubmit={handleFormSubmit} className="w-full"
                        variants={slideInVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="mb-6">
                            <label htmlFor="website_url" className="text-xl font-bold mb-2">
                                LinkedIn URL:
                            </label>
                            <div className="">
                                <Input
                                    type="url"
                                    name="linkedin_url"
                                    placeholder="Include https:// or http://"
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
                            <div className="">
                                <Input
                                    type="url"
                                    placeholder="Include https:// or http://"
                                    name="website_url"
                                    value={formData.website_url}
                                    onChange={handleFormChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-40 flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded hover:bg-blue-600 transition duration-300 self-center"
                        >
                            <span className="mr-2">Submit</span>
                            <Send className="h-4 w-4 opacity-75" />
                        </Button>
                    </motion.form>
                </motion.div>

                {/* Right side with illustration */}
                <div className="md:block flex flex-col jusify-between md:w-1/2 ml-10">
                    {/* <Illustration /> Use your illustration component here */}
                    <motion.div
                        variants={rotateHoverVariant}
                        whileHover="hover"
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-slate-300 rounded-lg p-6 h-100">
                        <Image src={illustrate1} alt="Illustration" />
                    </motion.div>
                    {/* Navigation arrow */}
                    <motion.div
                        variants={buttonHoverVariant}
                        whileHover="hover"
                        className="absolute right-0 bottom-0 mr-6">
                        <Link href="/analysis">
                            <ArrowRight className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2" />
                        </Link>
                    </motion.div>
                </div>


            </Card>
        </div>

    );
};

export default HomePage;

