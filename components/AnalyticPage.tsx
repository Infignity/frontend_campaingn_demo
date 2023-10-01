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
import AnalysisCard from './AnalysisCard'
import Link from 'next/link'
import { extractItems } from '@/lib/utils'

type Props = {}
export type AnalysisProps = {
    title: string;
    content: string;
};

subscribe(analysisStore, () => {
    localStorage.setItem("appState", JSON.stringify(analysisStore));
});



  

const Analytics = () => {
    const router = useRouter();
    const snapshot = useSnapshot(analysisStore);

    const fetchAnalysisData = useCallback(async () => {
        const task_id = localStorage.getItem("task_id");

        try {
            const response = await axios.get(`${scrapeUrl}/${task_id}`);
            const data = response?.data;
            console.log(data);

            if (data.status === "completed") {
                const format_data = data.result.ai_analysis;
                const filter_data = data.result.campaign_data;
                const users = data.result.matched_users;
                console.log(filter_data)
                console.log("=======================")
                console.log(format_data)
                
        
                
                const problemsIdentified = extractItems(format_data, "Problems Identified")
                const solutionsOffered = extractItems(format_data, "Solutions Offered") 
                const demographics = extractItems(format_data, "Demographics")
                const behaviour = extractItems(format_data, "Behavioral Traits")
                const motivation = extractItems(format_data, "Motivations & Goals")
                const segmentation = extractItems(format_data, "Segmentation")
                const marketSize = extractItems(format_data, "Market Size & Growth")
                const potential = extractItems(format_data, "Potential Reach")

                // console.log("Solutions Offered:", solutionsOffered); Segmentation Market Size & Growth
                // console.log("Demographics:", motivation);Potential Reach
                const reason = extractItems(filter_data, "Reason");
                const keyword = extractItems(filter_data, "Keywords");

                const details = users.map((data: any) => data);


                analysisStore.details = details;
                analysisStore.analysis.problemsIdentified = problemsIdentified;
                analysisStore.analysis.solutionsOffered = solutionsOffered;
                analysisStore.analysis.demographics = demographics;
                analysisStore.analysis.behaviour = behaviour;
                analysisStore.analysis.motivation = motivation;
                analysisStore.analysis.segmentation = segmentation
                analysisStore.analysis.marketSize = marketSize
                analysisStore.analysis.potential = potential


                analysisStore.filters.reason = reason;
                analysisStore.filters.keyword = keyword;

                console.log(analysisStore.analysis)


                analysisStore.loading = false;

            } else if (data.status === "pending") {
                console.log("Loading analysis...");
                toast.success("Loading Analysis");
                setTimeout(fetchAnalysisData, 5000);
            }
        } catch (error) {
            console.error("Error fetching analysis data:", error);
            toast.error("An error Occurred");
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
            localStorage.removeItem("appState");
            analysisStore.loading = true; 
            fetchAnalysisData(); 
        }
        analysisStore.task_id = task_id;

        return () => { };
    }, [snapshot.task_id, fetchAnalysisData]);

    return (
        <>
            <SecondPageBar />

            <div className="mt-4"></div>
            <div className='flex w-full font-inter overflow-auto gap-10 p-8'>

                {snapshot.loading ? (
                    <>
                        <AnalysisCard headingText='Problems Identified' text={null} loading={snapshot.loading} />
                        <AnalysisCard headingText='Solution Offered' text={null} loading={snapshot.loading} />
                    </>
                ) : (
                    <>
                        {snapshot.analysis?.problemsIdentified && (
                            <AnalysisCard headingText='Problems Identified' text={snapshot.analysis?.problemsIdentified} loading={false} />

                        )}
                        {snapshot.analysis?.solutionsOffered && (
                            <AnalysisCard headingText='Solution Offered' text={snapshot.analysis?.solutionsOffered} loading={false} />
                        )}
                    </>
                )}


            </div>


        </>
    )
}

export default Analytics