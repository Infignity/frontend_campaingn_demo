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
import { Dot, HelpCircle, X } from "lucide-react"


export function ReasonDialog({ reasons }: { reasons: string[] | any }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 rounded-full bg-violet-600/80 shadox-xl hover:bg-violet-600" size="sm"><HelpCircle className="w-8 h-8 text-white" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-fit h-fit bg-white">
        <DialogHeader>
          <DialogTitle>Why this filter is choosen</DialogTitle>
        </DialogHeader>


        <ul className="list-none">
          {reasons?.map((item: string, index: any) => (
            <li key={index} className="flex items-center gap-2">
              <div className='w-full text-left '>{item}</div>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <button className="bg-violet-700 px-3 py-1 rounded-md text-white font-semibold">close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
