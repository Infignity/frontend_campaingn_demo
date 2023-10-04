import React from 'react'
import { ReasonDialog } from './ReasonDialog'
import { Bell, X, FilterX } from 'lucide-react'
import { useSnapshot } from 'valtio'
import { analysisStore } from '@/lib/state'

type Props = {}

const Filter = (props: Props) => {
    const snapshot = useSnapshot(analysisStore)



    return (

            <div className="flex justify-center">
                <ul className="flex flex-wrap justify-center list-none text-sm">
                {snapshot.filters.keyword?.map((item: string, index: any) => (
                    <li key={index} className="w-fit h-10 p-2 m-1 flex items-center border rounded-lg bg-[#FEEBC8] hover:bg-yellow-300/30 font-bold text-[#7b341e] hover:cursor-pointer">
                        <FilterX className='w-4 h-4 mr-2 text-[#7b341e]' />
                        <p className="flex-1">{item}</p>
                        <X className='w-4 h-4 ml-2' />
                    </li>
                ))}
                </ul>
                <div className="mx-10 flex justify-center">
                    <ReasonDialog reasons={snapshot.filters.reason} />
                </div>
            </div>
            

    )
}

export default Filter