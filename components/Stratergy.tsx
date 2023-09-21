"use client"
import React, { useState } from "react";
import { motion } from 'framer-motion'
import { buttonVariants, fadeInVariant, rotateHoverVariant } from "@/utils/motion";
import Image from "next/image"
import illustrate1 from "@/public/illustrate1.png"


// Define TypeScript interfaces for props and state
interface DataItem {
    id: number;
    name: string;
    job_title: string;
    company: {
        name: string;
    };
}

// interface DummyDataComponentProps {
//     data: DataItem[];
// }

const generateEmail = (name: string, jobTitle: string, companyName: string): string => {
    // Logic fro retrieveing
    return `Dear ${name},\n\nI am writing to you regarding the position of ${jobTitle} at ${companyName}.`;
};

const DummyDataComponent = ({ id, name, job_title, company }: DataItem) => {
    const [generatedEmails, setGeneratedEmails] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleGenerateEmail = (name: string, jobTitle: string, companyName: string) => {
        const email = generateEmail(name, jobTitle, companyName);
        setGeneratedEmails([...generatedEmails, email]);
        setCurrentIndex(generatedEmails.length); // Move to the newly generated email
    };

    const prevEmail = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextEmail = () => {
        if (currentIndex < generatedEmails.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center mt-10">
            <motion.div
                key={id}
                className="flex relative flex-col w-full gap-4 md:w-3/4 max-w-4xl p-8 h-auto md:h-100 shadow-md"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {/* Content */}
                {["Name: ", "Job Title: ", "Company: "].map((label, index) => (
                    <motion.p
                        key={index}
                        variants={fadeInVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-gray-600"
                    >
                        {label} {index === 0 ? name : index === 1 ? job_title : company.name}
                    </motion.p>
                ))}

                <motion.button
                    initial="hidden"
                    animate="visible"
                    variants={buttonVariants}
                    onClick={() => handleGenerateEmail(name, job_title, company.name)}
                    className="w-full md:w-40 flex items-center justify-center px-4 py-2 bg-slate-700 text-white rounded-sm hover:scale-110 transition duration-300"
                >
                    Generate Email
                </motion.button>
                {generatedEmails.length > 0 && (
                    <div>
                        <motion.h2
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-2xl font-semibold"
                        >
                            Generated Emails
                        </motion.h2>
                        <div className="space-y-4">
                            <motion.div
                                variants={fadeInVariant}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-white p-4 border rounded"
                            >
                                <p>{generatedEmails[currentIndex]}</p>
                            </motion.div>
                            <div className="flex justify-between">
                                <motion.button
                                    onClick={prevEmail}
                                    className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariants}
                                >
                                    &lt;
                                </motion.button>
                                <p>{currentIndex + 1}/{generatedEmails.length}</p>
                                <motion.button
                                    onClick={nextEmail}
                                    className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={buttonVariants}
                                >
                                    &gt;
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Remove illustration on small devices */}
            <div className="hidden md:block md:w-1/2 ml-10">
                <motion.div
                    variants={rotateHoverVariant}
                    whileHover="hover"
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="md:none bg-slate-300 rounded-lg p-6 h-auto md:h-100"
                >
                    <Image src={illustrate1} alt="Illustration" />
                </motion.div>
            </div>
        </div>



    );
};

export default DummyDataComponent;
