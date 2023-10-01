"use client"
import React from 'react'
import SecondPageBar from './SecondPageBar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import AnalysisCard from './AnalysisCard'
import { useSnapshot } from 'valtio'
import { analysisStore } from '@/lib/state'


type Props = {}

const BuyerPersona = (props: Props) => {
    const snapshot = useSnapshot(analysisStore);
    return (
        <>
            <SecondPageBar />

            <div className='flex font-inter items-center justify-around ml-2'>
                <Avatar className="w-20 h-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='flex w-full font-inter overflow-auto gap-10 p-8'>
                    {snapshot.loading ? (
                        <>
                            <AnalysisCard headingText='DemoGraphics' text={null} loading={snapshot.loading} />
                            <AnalysisCard headingText='Behaviour' text={null} loading={snapshot.loading} />
                            <AnalysisCard headingText='Motivation & Goals' text={null} loading={snapshot.loading} />
                        </>
                    ) : (
                        <>
                            {snapshot.analysis.demographics && (
                                <AnalysisCard headingText='DemoGraphics' text={snapshot.analysis.demographics} loading={false} />
                            )}
                            {snapshot.analysis.behaviour && (
                                <AnalysisCard headingText='Behaviour' text={snapshot.analysis.behaviour} loading={false} />
                            )}
                            {snapshot.analysis.motivation && (
                                <AnalysisCard headingText='Motivation & Goals' text={snapshot.analysis.motivation} loading={false} />
                            )}
                        </>
                    )}
                </div>
            </div>

        </>
    )
}

export default BuyerPersona