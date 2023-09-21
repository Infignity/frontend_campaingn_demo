import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export type SelCompProps = {
    options: string[]
}



const animatedComponents = makeAnimated();

const SelectComp = ({options}: SelCompProps) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
    //   defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={options}
    />
  )
}

export default SelectComp
