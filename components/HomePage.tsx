import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ArrowRight, Send } from 'lucide-react'
import Link from 'next/link'

type Props = {}

function HomePage({ }: Props) {
    return (
        <div className="h-100 w-100 m-10 flex flex-col gap-10 align-center ">
            <div className="w-100 flex align-center justify-center gap-10">
                <h1 className='text-xl font-bold'>
                    Linkden Link
                </h1>
                <form className="w-2/5">
                    <Input placeholder="Enter linkden url" />
                </form>

                <Button className='ml-2'>
                    <Send className='h-4 w-4 opacity-2' />
                </Button>
            </div>


            <div className=" flex align-center justify-center gap-10">
                <h1 className='text-xl font-bold'>
                    Website Link
                </h1>
                <form className="w-2/5">
                    <Input placeholder="Enter website url" />
                </form>

                <Button className='ml-2'>
                    <Send className='h-4 w-4 opacity-2' />
                </Button>
            </div>

            <div className="w-100 flex flex-wrap align-center m-10 gap-10">

                <form className="w-100">
                    <Input placeholder="Enter linkden url" />
                </form>
            </div>

            <div className="w-full flex justify-end">
                <Link href="/analysis"><ArrowRight /></Link>
            </div>
        </div>
    )
}

export default HomePage