
import React from 'react'
import { Button } from './ui/button'
import { Bell, Plus } from 'lucide-react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div>
            <div className='flex items-center justify-end gap-4 m-6'>
                <Button className="w-40 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-md p-2 ml-2 hover:bg-violet-600"><Plus className="w-4 h-4 text-white" /><p className="font-inter text-base text-white font-light">Generate</p></Button>

                
                <Bell className="w-6 h-6 mr-1" />

            </div>
        </div>

    )
}

export default Header