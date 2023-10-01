"use client"
import React from 'react'
import SecondPageBar from './SecondPageBar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import AnalysisCard from './AnalysisCard'
import { useSnapshot } from 'valtio'
import { analysisStore } from '@/lib/state'


type Props = {}

const TargetMarket = (props: Props) => {
    const snapshot = useSnapshot(analysisStore);
    return (
        <>
            <SecondPageBar />


            <div className='flex w-full font-inter overflow-auto gap-10 p-8'>
                {snapshot.loading ? (
                    <>
                        <AnalysisCard headingText='Segmentation' text={null} loading={snapshot.loading} />
                        <AnalysisCard headingText='Market Size & Growth' text={null} loading={snapshot.loading} />
                        <AnalysisCard headingText='Potential Reach' text={null} loading={snapshot.loading} />
                    </>
                ) : (
                    <>
                        {snapshot.analysis.segmentation && (
                            <AnalysisCard headingText='Segmentation' text={snapshot.analysis.segmentation} loading={false} />
                        )}
                        {snapshot.analysis.marketSize && (
                            <AnalysisCard headingText='Market Size' text={snapshot.analysis.marketSize} loading={false} />
                        )}
                        {snapshot.analysis.potential && (
                            <AnalysisCard headingText='Growth' text={snapshot.analysis.potential} loading={false} />
                        )}
                    </>
                )}
            </div>

        </>
    )
}

export default TargetMarket