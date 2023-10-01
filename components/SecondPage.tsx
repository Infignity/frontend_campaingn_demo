"use client"

import React, { useCallback, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { ChevronRight, MousePointerSquareDashed } from 'lucide-react'
import SecondPageBar from './SecondPageBar'
import { Button } from './ui/button'
import { fadeInVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { PacmanLoader } from 'react-spinners'
import { subscribe, useSnapshot } from 'valtio'
import { analysisStore } from '@/lib/state'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { scrapeUrl } from '@/utils/netwrok'
import { toast } from 'react-toastify'

type Props = {}
export type AnalysisProps = {
    title: string;
    content: string;
};

subscribe(analysisStore, () => {
    localStorage.setItem("appState", JSON.stringify(analysisStore));
});


function mapDataByKey(data: any, key: any) {
    const dataByKey = data[key].map((item:any) => item);
    return dataByKey.join('\n');
  }
  
  
const SecondPage = () => {
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
                console.log(format_data)

                // const details = users.map((data: any) => {
                //     return data["_source"]
                // }); 
                const Problems = format_data["Problems Addressed"];
                const Buyer = format_data["Buyer Persona"]
                  // Call the function to map any key
                const problemsIdentified = mapDataByKey(Problems, "Problems Identified");
                const solutionsOffered = mapDataByKey(Problems, "Solutions Offered");
                const demographics = mapDataByKey(Buyer, "Demographics");
                const behaviour = mapDataByKey(Buyer, "Behavioral Traits");
                const motivation = mapDataByKey(Buyer, "Motivations & Goals");

  

                  // You can now use the mapped data as variables
                console.log("Problems Identified:", problemsIdentified);
                console.log("Solutions Offered:", behaviour);
                console.log("Demographics:", motivation);


                const details = users.map((data: any) => {
                    return data
                });

                console.log(details);

                analysisStore.details = details;

                // Update Valtio analysisStore
                analysisStore.analysis.problemsIdentified = problemsIdentified;
                analysisStore.analysis.solutionsOffered = solutionsOffered;
                analysisStore.analysis.demographics = demographics;
                analysisStore.analysis.behaviour = behaviour;
                analysisStore.analysis.motivation = motivation;

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
            <SecondPageBar />



            <div className="mt-4"></div>
            <div className='flex w-full font-inter  items-center overflow-auto gap-10 p-8'>
                <Card className=' w-full bg-[#FAFAFA]  p-10 hover:bg-[#F2EFF8] '>
                    <div >
                        <p className='flex items-center font-semibold text-lg gap-3 w-full p-3'><span className='bg-[#E6DAFF] rounded-full p-2'><MousePointerSquareDashed className="text-[#5B0AE1]" size={20} /></span>Analysis</p>

                    </div>

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

                                    <motion.pre
                                        variants={fadeInVariant}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.8 * 0.2 }}
                                        className="text-gray-600 text-left"
                                    >
                                        <h2>Problems Addressed</h2>
                                        
                                    </motion.pre>
                                </div>

                            </>
                        )}
                    </CardContent>

                </Card>

            </div>
            
        </>
    )
}

export default SecondPage