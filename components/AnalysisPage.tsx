"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Send } from "lucide-react"
import Link from "next/link"

import { motion } from "framer-motion";
import { fadeInVariant, slideInVariant } from "@/utils/motion"
import axios from "axios"
import { scrapeUrl } from "@/utils/netwrok"
import { useEffect, useState } from "react"
import { PacmanLoader } from "react-spinners";


const sections = [
    {
        title: "Summary of the Company",
        content:
            "Midas Furniture is a reputable furniture company known for its high-quality and stylish furniture offerings. With a focus on providing both residential and commercial customers with top-tier furniture solutions, Midas Furniture has established itself as a trusted name in the industry.",
    },
    {
        title: "Buyer Persona:",
        content:
            "Midas Furniture's typical buyer persona is the discerning consumer who values aesthetics, durability, and functionality in their furniture choices. This persona appreciates well-crafted furniture that complements their interior design and lifestyle preferences. They may be homeowners looking to furnish their living spaces or business owners seeking furniture solutions for offices and commercial spaces.",
    },
    {
        title: "Pain Points",
        content:
            "Quality Assurance Buyers are concerned about the quality of furniture, wanting assurance that their investment will stand the test of time.  Compatibility: Customers often face challenges in finding furniture that perfectly matches their interior design and style. Budget Considerations: Some customers may have budget constraints and seek cost-effective yet quality furniture options. Delivery and Assembly: Concerns about the delivery process and furniture assembly can be pain points for buyers. Sustainability: There is a growing demand for eco-friendly and sustainable furniture options, and customers may look for these choices.",
    },
    {
        title: "Target Market",
        content:
            "Homeowners: Individuals and families looking to furnish their homes with stylish and functional furniture. Interior Designers: Professionals in need of high-quality furniture to enhance their interior design projects.  Clients: Businesses, offices, and hospitality industry clients seeking durable and aesthetically pleasing furniture for their spaces. Eco-Conscious Consumers: Buyers who prioritize sustainable and environmentally friendly furniture options.",
    },
];

type AnalysisProps = {
    title: string
    content: string
}

export const transformApiResult = (apiResult: any) => {
    if (!apiResult || typeof apiResult !== 'object') {
        return [];
    }

    const transformedResult: AnalysisProps[] = [];

    for (const key in apiResult) {
        if (apiResult.hasOwnProperty(key)) {
            const title = key.replace(/^\d+\.\s*/, '');
            const content = apiResult[key].replace(/^\d+\.\s*/, '')
                .replace(/^\w*\.\s*/, '');

            transformedResult.push({ title, content });
        }
    }

    return transformedResult;
};


const AnalysisPage = () => {
    const [analysis, setAnalysis] = useState<AnalysisProps[]>([]);
    const [loading, setLoading] = useState(true);

    const task_id = localStorage.getItem("task_id");

    const fetchAnalysisData = async () => {
        try {
            const response = await axios.get(`${scrapeUrl}/${task_id}`);
            const data = response?.data;
            console.log(data)
            if (data.status === 'completed') {
                const format_data = data.result.ai_analysis
                console.log(format_data)
                const desiredOutput = transformApiResult(format_data);
                console.log(desiredOutput);
                setAnalysis(desiredOutput);
                setLoading(false);
            } else if (data.status === 'pending') {
                console.log('Loading analysis...');
                // setError to be displayed on frontend
                setTimeout(fetchAnalysisData, 1000);
            }
        } catch (error) {
            console.error('Error fetching analysis data:', error);
        }
    };

    useEffect(() => {
        fetchAnalysisData();
    }, []);

        

    return (
        <>
            <div className="mt-10 w-full h-full flex justify-center items-center align-center">
                <Card className="w-3/5 h-full shadow-md">
                    <CardHeader>
                        <motion.h1
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold"
                        >
                            Analysis
                        </motion.h1>
                        <motion.p
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-600"
                        >
                            ChatGpt Output
                        </motion.p>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center gap-10 align-center items-center">
                            <PacmanLoader 
                            color="#404c4a"
                            loading
                            size={50}
                            className=""
                          /> <p className="text-gray-600">Spilling the Tea</p>
                          </div>
                        ) : (
                            <>
                                {analysis.map((section, index) => (
                                    <div key={index}>
                                        <motion.h3
                                            variants={fadeInVariant}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                                            className="text-2xl font-semibold"
                                        >
                                            {section.title}
                                        </motion.h3>
                                        <motion.p
                                            variants={fadeInVariant}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                                            className="text-gray-600"
                                        >
                                            {section.content}
                                        </motion.p>
                                    </div>
                                ))}
                            </>
                        )}


                    </CardContent>
                </Card>
            </div>
            {/* <div className="w-100 mt-10 flex align-center justify-center gap-10">
                <motion.h1
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold"
                >
                    Update GPT Prompt
                </motion.h1>
                <motion.form
                    variants={slideInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-2/5"
                >
                    <Input placeholder="Enter reform prompt" />
                </motion.form>
                <motion.div
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button className="ml-2">
                        <Send className="h-4 w-4 opacity-2" />
                    </Button>
                </motion.div>
            </div> */}
            <div className="absolute right-0 bottom-0 mr-10 p-3">
                <Link href="/stratergy">
                    Next
                    <ArrowRight className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2" />
                </Link>
            </div>
        </>
    );
};

export default AnalysisPage;
