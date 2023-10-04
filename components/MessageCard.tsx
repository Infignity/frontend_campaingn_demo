import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ClipLoader, HashLoader } from 'react-spinners'

type Props = {
    generatedEmail: string;
    prevEmail: () => void;
    loading: boolean;
    nextEmail: () => void;
}

const MessageCard = ({ generatedEmail, prevEmail, nextEmail, loading }: Props) => {
    return (
        <div className="w-full h-full flex flex-col p-5 bg-[#F2EFF8]">
            <h2 className="text-2xl text-black font-bold"> Generated Email</h2>
            <div className="mt-5"></div>
            <Card className="w-full p-6 border bg-[#F9F9F9] items-center text-lg">
                    <CardContent>
                        <div className="mt-5">
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <HashLoader size={35} color={"#123abc"} loading={loading} />
                                </div>
                            ) : (
                                <Markdown remarkPlugins={[remarkGfm]}>{generatedEmail}</Markdown>
                            )}
                        </div>
                    </CardContent>
            </Card>
        </div>
    )
}

export default MessageCard;



{/* <div className="flex justify-end gap-3">

                            <Button onClick={prevEmail} className="w-30 bg-[#F2EFF8] flex items-center justify-around font-light  rounded-lg p-2 ml-2 hover:bg-[#5B0AE1]"><ChevronLeft className="w-4 h-4 text-[#5B0AE1] hover:text-[#F2EFF8]" /></Button>

                            <Button onClick={nextEmail} className="w-30 bg-[#F2EFF8] flex items-center justify-around font-light  rounded-lg p-2 ml-2 hover:bg-[#5B0AE1]"><ChevronRight className="w-4 h-4 text-[#5B0AE1] hover:text-[#F2EFF8]" /></Button>

                        </div> */}


{/* <p>
                                To- Recipient’s mail id
                                Subject: About my trip
                                My dear (Name),

                                I am very excited to write to you about the long tour which we are planning along with my parents. We will be leaving on the 29th of this month.
                                We will be away for three months. We are going to Chennai for an official meeting which my father has to attend. We would then be traveling to Bangalore to visit our cousins. We would stay there for a month. After that, we would be going to Hyderabad. It has always been my dream to visit Char Minar in Hyderabad at least once in my lifetime, and my parents have finally agreed to take me there. I will definitely write to you all about my trip – all the different places we visit, the variety of food we eat and the people we meet.
                                It would have been even more special if you had come along with me. We will make sure we plan out a trip once I am back home.
                                With best wishes,
                                Your name
                            </p> */}