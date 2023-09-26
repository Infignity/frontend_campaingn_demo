"use client"

import React, { useCallback, useEffect } from "react";
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

subscribe(analysisStore, () => {
    localStorage.setItem("appState", JSON.stringify(analysisStore));
});

const AnalysisPage = () => {
    const router = useRouter();
    const snapshot = useSnapshot(analysisStore);

    //This ensures that the function reference remains stable between renders unless its dependencies change
    // Define fetchAnalysisData using useCallback
    const fetchAnalysisData = useCallback(async () => {
        const task_id = localStorage.getItem("task_id");

        try {
            const response = await axios.get(`${scrapeUrl}/${task_id}`);
            const data = response?.data;
            console.log(data);
            if (data.status === "completed") {
                const format_data = data.result.ai_analysis;
                const users = data.result.matched_users;

                // const details = users.map((data: any) => {
                //     return data["_source"]
                // });

                const details = users.map((data: any) => {
                    return data
                });

                console.log(details);

                analysisStore.details = details;

                // Update Valtio analysisStore
                analysisStore.analysis = format_data;
                analysisStore.loading = false;

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
    }, [router]);

    useEffect(() => {
        const storedState = localStorage.getItem("appState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            Object.assign(analysisStore, parsedState);
        }

        const task_id: any = localStorage.getItem("task_id");
        if (task_id !== snapshot.task_id) {
            snapshot.loading
            localStorage.removeItem("appState");
            fetchAnalysisData();
        }
        analysisStore.task_id = task_id

        // No specific cleanup needed, so return an empty function
        return () => { };
    }, [snapshot.task_id, fetchAnalysisData, snapshot.loading]);

    const handleRegenerate = () => {
        router.push("/stratergy")
        snapshot.details
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

            <div className="w-100 mt-10 flex align-center justify-center gap-10">

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
