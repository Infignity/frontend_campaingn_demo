import React from 'react'
import { ReasonDialog } from './ReasonDialog'
import { Bell, Delete } from 'lucide-react'
import { useSnapshot } from 'valtio'
import { analysisStore } from '@/lib/state'

type Props = {}

const Filter = (props: Props) => {
    const snapshot = useSnapshot(analysisStore)



    return (
        <div className="flex justify-center p-4">
            <div className="w-1/2 ">
               
                <ul className="flex flex-wrap justify-center list-none">
                {snapshot.filters.keyword?.map((item: string, index: any) => (
                    <li key={index} className="w-fit h-10 p-2 m-3 flex items-center border rounded-lg bg-[#F9F9F9] hover:bg-[#F2EFF8]">
                        <Bell className='w-6 h-6 mr-2' />
                        <p className="flex-1">{item}</p>
                        <Delete className='w-6 h-6 ml-2' />
                    </li>
                ))}
                </ul>

            </div>
            <div className="w-1/2 flex justify-center">
                <ReasonDialog reasons={snapshot.filters.reason} />
            </div>
        </div>

    )
}

export default Filter