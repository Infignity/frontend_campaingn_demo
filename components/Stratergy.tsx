import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
import Image from "next/image";
import illustrate1 from "@/public/illustrate1.png";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";
import axios from "axios";
import { generate } from "@/utils/netwrok";
import { toast } from "react-toastify";
import { subscribe } from "valtio";
import { analysisStore } from '@/lib/state'
import { buttonVariants, fadeInVariant, rotateHoverVariant } from "@/utils/motion";

// Subscribe to state changes and save to localStorage
subscribe(analysisStore, () => {
    localStorage.setItem("appState", JSON.stringify(analysisStore));
});

const DummyDataComponent = () => {
    const snapshot = useSnapshot(analysisStore);

    useEffect(() => {
        // Load data from localStorage on component mount
        const storedState = localStorage.getItem("appState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            Object.assign(analysisStore, parsedState);
        }
    }, []);

    const handleGenerateEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        analysisStore.emailLoading = true;

        if (analysisStore.selectedDetail) {
            try {
                const resp = await axios.post(generate, {
                    // Send the selected detail
                    job_title: analysisStore.selectedDetail.job_title,
                    job_title_role: analysisStore.selectedDetail.job_title_role,
                    job_company_name: analysisStore.selectedDetail.job_company_name,
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
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center mt-10">
            <motion.div
                className="flex relative flex-col w-full gap-4 md:w-3/4 max-w-4xl p-8 h-auto md:h-100 shadow-md"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {/* Content */}
                <div className="mb-6">
                    <label htmlFor="jobDetails" className="text-xl font-bold mb-2 text-slate-800">
                        Select Data Points:
                    </label>
                    <motion.select
                        id="jobDetails"
                        name="jobDetails"
                        value={snapshot.selectedDetail ? JSON.stringify(snapshot.selectedDetail) : ''}
                        onChange={(e) => {
                            const selectedDetail = JSON.parse(e.target.value);
                            analysisStore.selectedDetail = selectedDetail;
                        }}
                        initial={{ opacity: 0, y: 10 }} // Initial animation state
                        animate={{ opacity: 1, y: 0 }} // Animation to play on mount
                        transition={{ duration: 0.5, delay: 0.2 }} // Animation duration and delay
                        className="w-full py-2 px-4 mt-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
                    >
                        <option value="">Select a job detail</option>
                        {snapshot.details.map((detail, index) => (
                            <option key={index} value={JSON.stringify(detail)}>
                                {detail.job_title} - {detail.job_title_role} at {detail.job_company_name}
                            </option>
                        ))}
                    </motion.select>
                </div>


                <Button
                    onClick={handleGenerateEmail}
                    className="w-full md:w-40 flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded-sm hover:bg-slate-700 transition duration-300"
                >
                    {snapshot.emailLoading ? (
                        <ClipLoader size={35} color={"#fff"} loading={snapshot.emailLoading} />
                    ) : (
                        "Generate Email"
                    )}
                </Button>

                {snapshot.generatedEmails.length > 0 && (
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
                                <p>{snapshot.generatedEmails[snapshot.currentIndex]}</p>
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
                                {snapshot.currentIndex > 0 && (<p>
                                    {snapshot.currentIndex}/{snapshot.generatedEmails.length - 1}
                                </p>)}
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
