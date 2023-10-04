
import React from 'react'
import { Button } from './ui/button'
import { Bell, Plus } from 'lucide-react'
import Stepper from './Stepper'

type Props = {}

const Header = (props: Props) => {
    return (
        <div>
            <div className="mt-8"></div>
            <div className='w-[80%] h-screen mx-auto'>
                <Stepper />
            </div>

        </div>

    )
}

export default Header