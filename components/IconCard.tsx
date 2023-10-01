import React from 'react'
import { Card } from './ui/card'
import { AtSign, Briefcase, Globe2} from 'lucide-react'
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
      <Card className={`w-full p-4 font-inter flex  flex-col sm:flex-row items-center hover:bg-[#F2EFF8] ${active ? "bg-[#F2EFF8]" : ""}`}>
        <div className="ml-4 rounded-full bg-[#FAFAFA] p-3">
          <Avatar className="">
            <AvatarImage src="" />
            <AvatarFallback className="font-mono font-bold space-x-2 tracking-wide">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex-grow gap-2 mt-2 sm:mt-0">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-lg text-left capitalize font-semibold ml-4 mb-2 sm:mb-0">
              {name}
            </h3>
            <p className="flex items-center gap-3 w-full p-3 sm:w-auto">
              <span className="rounded-full p-2">
                <Globe2 className=" text-left text-[#5B0AE1]" size={20} />
              </span>
              {location}
            </p>
          </div>
          <div className="flex flex-wrap">

            <p className="flex items-center gap-3 w-full p-3 sm:w-auto">
              <span className="rounded-full p-2">
                <Briefcase className=" text-left text-[#5B0AE1]" size={20} />
              </span>
              {job_title_role}
            </p>
            <p className="flex items-center gap-3 w-full p-3 sm:w-auto">
              <span className="rounded-full p-2"></span>
              {job_title}
            </p>
            <p className="flex items-center gap-3 w-full p-3 sm:w-auto">
              <span className="rounded-full p-2">
                <AtSign className=" text-left text-[#5B0AE1]" size={20} />
              </span>
              {job_company_name}
            </p>
          </div>
        </div>
      </Card>
    </>

  )
}

export default IconCard
