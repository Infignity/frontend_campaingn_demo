import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog"
import { Dot, Lightbulb, X } from "lucide-react"


export function ReasonDialog({ reasons }: { reasons: string[] | any }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-30 h-15 rounded-full bg-violet-300 shadox-xl hover:bg-violet-600" size="lg"><Lightbulb className="w-10 h-10 " /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-fit h-fit bg-violet-200 hover:bg-violet-300">
        <DialogHeader>
          <DialogTitle>Logic</DialogTitle>
          <DialogDescription>
            Why this filter is choosen
          </DialogDescription>
        </DialogHeader>


        <ul className="list-none">
          {reasons?.map((item: string, index: any) => (
            <li key={index} className="flex items-center gap-2">
              <Dot size={50} className='w-fit text-gray-300' />
              <div className='w-full text-left '>{item}</div>
            </li>
          ))}
        </ul>


        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-40 bg-[#F2EFF8] flex items-center justify-around font-light  rounded-md p-2 ml-2 hover:bg-violent-200 hover:text-black" variant="secondary"><X className="w-4 h-4 text-[#424242]" /><p className="font-inter text-base text-[#424242] font-light">Close</p></Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
