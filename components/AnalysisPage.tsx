import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Send } from "lucide-react"
import Link from "next/link"


const AnalysisPage = () => {

    return (
        <>
            <div className="mt-10 w-full h-full flex justify-center items-center align-center">
                <Card className="w-3/5 h-full">
                    <CardHeader>
                        <CardTitle>Analysis</CardTitle>
                        <CardDescription>ChatGPT</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>ChatGpt Output</p>
                    </CardContent>
                </Card>
            </div>

            <div className="w-100 mt-10 flex align-center justify-center gap-10">
                <h1 className='text-xl font-bold'>
                    Update GPT Prompt
                </h1>
                <form className="w-2/5">
                    <Input placeholder="Enter reform rompt" />
                </form>

                <Button className='ml-2'>
                    <Send className='h-4 w-4 opacity-2' />
                </Button>
            </div>
            <div className="w-full bottom-0 flex justify-end">
                <Link href="/"><ArrowRight /></Link>
            </div>

        </>
    )
}

export default AnalysisPage