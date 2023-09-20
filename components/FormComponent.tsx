import React from 'react';
import { Input } from './ui/input';



interface FormCompProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  // required?: boolean;
}

const FormComponent: React.FC<FormCompProps> = ({ label, placeholder, value, onChange }) => (
  <>
    <div className="w-full flex flex-wrap items-center gap-4 mt-10">
      <h1 className="w-full text-xl font-bold">{label}</h1>
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="url"
          className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
          value={value}
          required
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${placeholder}`}
        />
      </form>
    </div>
  </>
);

export default FormComponent;
