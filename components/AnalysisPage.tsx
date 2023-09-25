"use client"

import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
import { PacmanLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import axios from "axios";
import { scrapeUrl } from "@/utils/netwrok";
import { useRouter } from "next/navigation";
import { subscribe } from "valtio";
import { analysisStore } from "@/lib/state";
import { fadeInVariant } from "@/utils/motion";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { toast } from "react-toastify";

export type AnalysisProps = {
    title: string;
    content: string;
};


// export const transformApiResult = (apiResult: any) => {
//     if (!apiResult || typeof apiResult !== "object") {
//         return [];
//     }

//     const transformedResult: AnalysisProps[] = [];

//     for (const key in apiResult) {
//         if (apiResult.hasOwnProperty(key)) {
//             const title = key.replace(/^\d+\.\s*/, "");
//             const content = apiResult[key]
//                 .replace(/^\d+\.\s*/, "")
//                 .replace(/^\w*\.\s*/, "");

//             transformedResult.push({ title, content });
//         }
//     }

//     return transformedResult;
// };


// Subscribe to state changes and save to localStorage
subscribe(analysisStore, () => {
    localStorage.setItem("appState", JSON.stringify(analysisStore));
});

const AnalysisPage = () => {
    const router = useRouter();
    const snapshot = useSnapshot(analysisStore);

    useEffect(() => {
        const storedOutput = localStorage.getItem("format_data");
        if (storedOutput) {
            const parsedOutput = JSON.parse(storedOutput);
            analysisStore.analysis = parsedOutput;
            analysisStore.loading = false;
        } else {
            fetchAnalysisData();
        }
    }, []);

    const fetchAnalysisData = async () => {
        const task_id = localStorage.getItem("task_id");

        try {
            const response = await axios.get(`${scrapeUrl}/${task_id}`);
            const data = response?.data;
            console.log(data);
            if (data.status === "completed") {
                const format_data = data.result.ai_analysis;
                const users = data.result.matched_users;

                const details = users.map((data: any) => {
                    return data.data;
                });

                console.log(details);
                analysisStore.details = details;
                localStorage.setItem("details", JSON.stringify(details));

                // Update Valtio analysisStore
                analysisStore.analysis = format_data;
                analysisStore.loading = false;

                localStorage.setItem("format_data", JSON.stringify(format_data));
            } else if (data.status === "pending") {
                console.log("Loading analysis...");
                toast.success("Loading Analysis");
                setTimeout(fetchAnalysisData, 3000);
            }
        } catch (error) {
            console.error("Error fetching analysis data:", error);
            toast.error("An error Occurred", error as any);
        }
        if (!task_id) {
            router.push("/");
        }
    };
    // Handler for regenerating the analysis
    const handleRegenerate = () => {
        router.push("/stratergy")
    };



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

                        {snapshot.loading ? (
                            <div className="flex justify-between gap-10 align-center items-center">
                                <PacmanLoader
                                    color="#404c4a"
                                    loading
                                    size={50}
                                    className=""
                                />
                                <p className="text-gray-600">Spilling the Tea</p>
                            </div>

                        ) : (
                            <>

                                <div >
                                    <motion.h3
                                        variants={fadeInVariant}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.6 * 0.2 }}
                                        className="text-2xl font-semibold"
                                    >

                                    </motion.h3>
                                    <motion.pre
                                        variants={fadeInVariant}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.8 * 0.2 }}
                                        className="text-gray-600 text-left"
                                    >
                                        {snapshot.analysis}
                                    </motion.pre>
                                </div>

                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
            {/* <div className="absolute right-0 bottom-0 mr-10 md:mt-50 p-3">
                <Link href="/stratergy">
                    Next
                    <ArrowRight className="text-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer rounded-full bg-slate-300 p-2" />
                </Link>
            </div> */}
            <div className="w-100 mt-10 flex align-center justify-center gap-10">
                {/* <motion.h1
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
        </motion.form> */}
                <motion.div
                    variants={fadeInVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {/* Button to regenerate analysis */}
                    <Button onClick={handleRegenerate}>
                        <p className="p-3">Next</p> <ArrowRight className="h-3 w-4 opacity-2" />
                    </Button>
                </motion.div>
            </div>


        </>
    );
};

export default AnalysisPage;
