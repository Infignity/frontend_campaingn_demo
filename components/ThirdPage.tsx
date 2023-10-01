"use client"
import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import IconCard from './IconCard'
import MessageCard from './MessageCard'
import { useSnapshot } from 'valtio'
import { DetailsProp, analysisStore } from '@/lib/state'
import axios from 'axios'
import { generate } from '@/utils/netwrok'
import { toast } from 'react-toastify'
import { Button } from './ui/button'
import Filter from './Filter'

type Props = {}



const ThirdPage = (props: Props) => {
    const snapshot = useSnapshot(analysisStore);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setActiveCardIndex((prevIndex) => (prevIndex === index ? index : index));
        // rather than setting index to null we leave it caause onclick it generates a new email
    };

    useEffect(() => {
        // Load data from localStorage on component mount
        const storedState = localStorage.getItem("appState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            Object.assign(analysisStore, parsedState);
        }

        if (snapshot.task_id !== analysisStore.task_id) {
            analysisStore.generatedEmails = [];
        }
    }, [snapshot.task_id]);



    const handleGenerateEmail = async (e: React.MouseEvent, id: DetailsProp) => {
        e.preventDefault();
        analysisStore.emailLoading = true;
        analysisStore.selectedDetail = id;
        if (analysisStore.selectedDetail) {

            try {
                const resp = await axios.post(generate, {
                    // Send the selected detail
                    "_id": id,
                    "task_id": snapshot.task_id
                });

                const generatedEmail = resp.data;
                analysisStore.generatedEmails.push(generatedEmail);
                analysisStore.currentIndex = analysisStore.generatedEmails.length - 1;
            } catch (error) {
                console.error(error);
                toast.error("An error occurred", error as any);
            } finally {
                analysisStore.emailLoading = false;
            }
        } else {
            // Handle case when no detail is selected
            console.error("No detail selected");
        }
    };

    const prevEmail = () => {
        if (snapshot.currentIndex > 0) {
            analysisStore.currentIndex = snapshot.currentIndex - 1;
        }
    };

    const nextEmail = () => {
        if (snapshot.currentIndex <= snapshot.generatedEmails.length - 1) {
            analysisStore.currentIndex = snapshot.currentIndex + 1;
        }
    };

    return (
        <>
            <div className="mt-10"></div>

            <Filter />
            <div className="mt-4"></div>

            <Separator />

            <div className="w-full flex flex-col lg:flex-row">

                <div className="lg:w-1/2">
                    <div className="flex flex-col">
                        {snapshot.details.map((detail, index) => (
                            <Button
                                key={index}
                                className="w-full h-fit flex flex-col bg-violent-700 hover:bg-inherit"
                                onClick={(e) => {
                                    handleCardClick(detail._id); // index
                                    handleGenerateEmail(e, detail._id);
                                }}
                            >

                                <IconCard
                                    active={activeCardIndex === detail._id} //index
                                    name={detail._source.full_name}
                                    location={detail._source.location_name}
                                    job_title={detail._source.job_title}
                                    job_title_role={detail._source.job_title_role}
                                    job_company_name={detail._source.job_company_name}
                                />
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <MessageCard
                        generatedEmail={snapshot.generatedEmails[snapshot.currentIndex]}
                        prevEmail={prevEmail}
                        nextEmail={nextEmail}
                        loading={snapshot.emailLoading}
                    />
                </div>
            </div>
        </>

    )
}

export default ThirdPage