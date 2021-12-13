import React from 'react'

const Addperson = ( {personManagement,
                    newName, 
                    newNumber,
                    handleNameChange,
                    handleNumberChange
                  } ) => {

    return (
        <div>
        <form onSubmit={personManagement}>
        <div>
          name: <input  
            value={newName}
            onChange={handleNameChange} /><br/>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} /><br/>
          <button type="submit"> 
            add</button>
        </div>
      </form>
      </div>
    )
}
export default Addperson