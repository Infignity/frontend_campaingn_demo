
import React from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Bell, Plus } from 'lucide-react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div>
            <div className='flex items-center justify-end gap-4 m-6'>
                <Button className="w-40 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-md p-2 ml-2 hover:bg-[#F2EFF8]"><Plus className="w-4 h-4 text-gray-900" /><p className="font-inter text-base text-gray-900 font-light">Generate</p></Button>

                
                <Bell className="w-6 h-6 mr-1" />

            </div>
        </div>

    )
}

export default Header