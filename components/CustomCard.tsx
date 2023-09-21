import React from 'react';
import { Card } from './ui/card';

type Props = {
    children : any // react elements
}
const CustomCard = ({ children }: Props) => {
  return (
    <Card className="w-full m-3 p-4 border border-gray-300 shadow-md rounded-lg">
      {children}
    </Card>
  );
};

export default CustomCard;