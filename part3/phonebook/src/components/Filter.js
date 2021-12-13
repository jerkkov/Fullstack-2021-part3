import React from 'react'

const Filter = ({ handleFindChange}) => {
  return (
    <div>
       filter shown with<input onChange={handleFindChange} />
    </div>
    )
}
export default Filter