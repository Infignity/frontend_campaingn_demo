import React from 'react'
import { Card } from './ui/card'
import { AtSign, Briefcase, Globe2, MapPin, Building} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getInitials } from '@/lib/utils';

type Props = {
  active: any;
  name: string;
  location: string;
  job_title: string;
  job_title_role: string;
  job_company_name: string;
}

const IconCard = ({ name, active, location, job_title, job_title_role, job_company_name }: Props) => {
  const initials = getInitials(name)
  return (
    <>
      <Card className={`w-full p-4 font-inter flex border flex-col sm:flex-row items-center hover:bg-[#F2EFF8] shadow-lg ${active ? "bg-[#F2EFF8]" : ""}`}>
        <div className="ml-4 rounded-full p-3">
          <Avatar className="">
            <AvatarImage src="" />
            <AvatarFallback className="font-mono font-bold space-x-2 tracking-wide">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="text-left ml-3">
          <div className='mb-5'>
            <h1 className='text-2xl capitalize'>{name}</h1>
            <p className='capitalize'>{job_title}</p>
          </div>
          <p></p>
          <div className='flex flex-col capitalize text-gray-700'>
            {job_company_name?<p><Building className='inline-block w-5 h-5 mb-1'/> {job_company_name}</p>:<></>}
            {location?<p><MapPin className='inline-block w-5 h-5 mb-1'/> {location}</p>:<></>}
          </div>
        </div>
      </Card>
    </>

  )
}

export default IconCard
