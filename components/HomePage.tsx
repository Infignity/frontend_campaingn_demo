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
import { proxy } from 'valtio'
import { ClipLoader } from 'react-spinners';
type FormData = {
    website_url: string;
    linkedin_url: string;
};

type Props = {}

export const state = proxy({
    task_id: ""
})

const HomePage = ({ }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        website_url: '',
        linkedin_url: '',
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
        <div className="w-full px-4 md:px-10 flex flex-col items-center justify-center mt-10">
            <Card className="w-full relative md:w-11/12 lg:w-3/4 max-w-4xl p-8 h-full shadow-md flex flex-col md:flex-row">
                {/* Left side with form */}
                <motion.div
                    className="w-full md:w-1/2"
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.form
                        onSubmit={handleFormSubmit}
                        className="w-full"
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
                                    type="text"
                                    name="linkedin_url"
                                    placeholder="Enter linkden Url"
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
                                    type="text"
                                    placeholder="Enter website url"
                                    name="website_url"
                                    value={formData.website_url}
                                    onChange={handleFormChange}
                                    className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
                                />
                            </div>
                        </div>
                        {
                            loading ? (  // Render the ClipLoader when loading
                                <div className="flex items-center justify-center">
                                    <ClipLoader size={35} color={"#123abc"} loading={loading} />
                                </div>
                            ) : (
                                // Render the submit button when not loading
                                <Button
                                    type="submit"
                                    className="w-full md:w-40 flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded hover:bg-blue-600 transition duration-300 self-center"
                                >
                                    <span className="mr-2">Submit</span>
                                    <Send className="h-4 w-4 opacity-75" />
                                </Button>
                            )}
                    </motion.form>
                </motion.div>


                {/* Right side with illustration */}
                <div className="hidden md:block md:w-1/2 ml-10">
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

