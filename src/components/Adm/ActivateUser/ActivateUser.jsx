import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';

export default ({ ativo }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  return (
    <>
      <Radio
        checked={ativo === 1}
        onChange={handleChange}
        inputProps={0}
      />
      {ativo}
    </>
  )
}
