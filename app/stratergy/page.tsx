"use client"
import Stratergy from '@/components/Stratergy'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion"
import { buttonVariants, fadeInVariant } from '@/utils/motion';
import { ArrowBigLeftDash, ArrowLeft, ArrowRight } from 'lucide-react';



type Props = {}


// Dummy data for testing
const dummyData = [
    {
        id: 23,
        name: "John Doe",
        job_title: "Software Engineer",
        company: {
            name: "Tech Corp",
        },
    },
    {
        id: 12,
        name: "Jane Smith",
        job_title: "Marketing Manager",
        company: {
            name: "Marketing Solutions Inc.",
        },
    },
    {
        id: 18,
        name: "Bob Johnson",
        job_title: "Sales Representative",
        company: {
            name: "SalesTech LLC",
        },
    },
];

const TestDummyDataComponent = () => {
    return (
        <div className="mt-10 w-full h-full flex justify-center items-center align-center">
            <Card className="w-full m-3 h-full shadow-md">
                <CardHeader>
                    <motion.h1
                        variants={fadeInVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold"
                    >
                        Data Points
                    </motion.h1>
                    <motion.p
                        variants={fadeInVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600"
                    >
                        Output
                    </motion.p>
                </CardHeader>
                <CardContent>

                    {/* Render the DummyDataComponent with the test data */}
                    {dummyData.map((item, index) => (
                        <div key={item.id}>

                            <Stratergy id={item.id} name={item.name} job_title={item.job_title} company={item.company} />
                        </div>

                    ))}
                </CardContent>

                <CardFooter className=" items-center justify-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                        className="w-2/5 flex items-center justify-center px-4 py-2 bg-slate-700 text-white rounded-sm hover:scale-110 transition self-center duration-300"
                    >
                        <Link href="/" className="flex items-center">
                            <ArrowLeft className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2 mr-2" />
                            Upload URLS
                        </Link>
                    </motion.div>
                </CardFooter>

            </Card>
        </div>
    );
};

export default TestDummyDataComponent;
