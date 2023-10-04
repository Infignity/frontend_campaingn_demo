
import React from 'react'
import { AlertOctagon, ChevronRight, MousePointerSquareDashed, ScanFace, Share2 } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {}

type NavigationItemProps = {
    href: string;
    icon: React.ReactNode;
    name: string;
};

const NavigationItem = ({ href, icon, name }: NavigationItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href; // Check if the current path matches the href
  
    return (
        <Link href={href} className={isActive ? 'active' : ''}>
        <Button className={`w-40 ${isActive ? 'bg-[#5B0AE1]' : 'bg-zinc-100'} flex items-center justify-around font-light rounded-md p-2 ml-2 hover:text-black text-gray-900 hover:bg-[#F2EFF8]`}>
          {icon}
          <p className={`font-inter text-base text-inherit font-light ${isActive ? 'text-white' : ''}`}>{name}</p>
        </Button>
      </Link>
      
    );
  };
  

const SecondPageBar = (props: Props) => {


    // active. pass it as a prop
    return (
        
        <>
            <div className="w-full flex items-center justify-between p-6 ">
                <div className="flex items-center gap-3 ">
                
                    <NavigationItem href="/analysis" icon={<AlertOctagon className={`w-4 h-4 text-gray-900`} />} name="Problems" />

                    <NavigationItem href="/buyer" icon={<ScanFace className={`w-4 h-4 text-gray-900`} />} name="Buyer Persona" />

                    <NavigationItem href="/target" icon={<MousePointerSquareDashed className={`w-4 h-4 text-gray-900`} />} name="Target Market" />

                </div>

                <div className="flex items-center gap-3">
                    <Button className="w-10 bg-violet-300 flex items-center justify-center font-light  rounded-lg p-2 ml-2 hover:bg-zinc-100 text-gray-900"><Share2 className="w-4 h-4 text-gray-900" /></Button>
                    <Link href="/stratergy">
                        <Button className="w-35 bg-[#5B0AE1] flex items-center justify-around font-light  rounded-lg p-2 ml-2 text-white pl-5"><p className="font-inter text-base text-white mr-2 font-semibold">Next</p><ChevronRight className="w-4 h-4 text-whites" /></Button>
                    </Link>
                </div>
            </div>
            <Separator />
        </>
    )
}

export default SecondPageBar