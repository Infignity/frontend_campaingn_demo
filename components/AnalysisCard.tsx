import React from 'react';
import { Card, CardContent } from './ui/card';
import { Dot, MousePointerSquareDashed } from 'lucide-react';
import { PacmanLoader } from 'react-spinners';


type Props = {
  headingText: string;
  text: any;
  loading: boolean;
};

const AnalysisCard = ({ headingText, text, loading }: Props) => {
  const displayText = text?.length ? text : ['No result'];

  return (
    <>
      <Card className='w-full p-8 bg-zinc-100 hover:bg-[#F2EFF8] '>
        <div>
          <p className='flex items-center font-semibold text-lg gap-3 w-full p-3'>
            <span className='bg-[#E6DAFF] rounded-full p-2'>
              <MousePointerSquareDashed className="text-[#5B0AE1]" size={20} />
            </span>
            {headingText}
          </p>
          <CardContent>
            {loading ? (
              <div className="flex justify-between gap-10 align-center items-center">
                <PacmanLoader
                  color="#404c4a"
                  loading
                  size={50}
                  className=""
                />
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : (
              <ul className="list-none">
                {displayText.map((item: string, index: any) => (
                  <li key={index} className="flex items-center gap-2">
                    <Dot size={50} className='w-fit text-gray-300' />
                    <div className='w-full text-left '>{item}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default AnalysisCard;
