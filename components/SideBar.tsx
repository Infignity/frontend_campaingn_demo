import { Triangle, Rows, MailOpen, UserCog2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

type IconProps = {
    icon: React.ReactNode;
    text: string;
    href: any;

}
type Props = {

}

const SideBar = (props: Props) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col justify-between bg-[#5B0AE1] text-white shadow-lg">
            <div>
                    <SideBarIcon icon={<Triangle size={30} color='#EEEBEB' /> }  text="Home" href="/" />
                


                <SideBarIcon icon={<Rows size={30} color='#EEEBEB' />} text="Analysis" href="analysis" />



                <SideBarIcon icon={<MailOpen size={30} color='#EEEBEB' />} text="Generate Email" href="stratergy"/>

            </div>
            <div className="mb-5">


                <SideBarIcon icon={<UserCog2 size={30} color='#EEEBEB' />} text="Settings" href={"/"}/>
            </div>
        </div>

    )
}

const SideBarIcon = ({ icon, text, href }: IconProps) => {
    return (
        <>
                <Link href={href}>

            <div className='sidebar-icon group'>
                {icon} <span className="sidebar-tooltip group-hover:scale-100">{text} </span>
            </div>
            </Link>
        </>
    )
}
export default SideBar