
import React from 'react'
import { Button } from './ui/button'
import { Bell, Plus } from 'lucide-react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div>
            <div className='flex items-center justify-end gap-4 m-6'>
                <p className="font-inter text-lg text-[#5B0AE1] font-black">magicpitch</p>
            </div>
        </div>

    )
}

export default Header