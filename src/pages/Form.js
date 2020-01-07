import React, { useState } from 'react'; 
const Form = () => {    
  const styles = 'form {' +
          'font-family: Arial, Helvetica, sans-serif;' +
          'border: 0.15rem solid #000;' +
          'width: 50%;' +
          'margin: 1rem auto;' +
          'padding: 1rem;' +
      '} input { display: block; }' +
      'input[type="button"], input[type="submit"] {' +
          'margin: 1rem auto; }' +
      'form div { margin: 1rem; padding: 1rem; border: 0.15rem solid #000; }';

  const blankCat = { name: '', age: ''};    
  const [ catState, setCatState ] = useState([
           {...blankCat}]);
  const [ ownerState, setOwnerState ] = useState('');
  const [ descriptionState, setDescriptionState ] = useState('');

  const addCat = () => {
    setCatState([...catState, {...blankCat}]);
  }

  const handleCatChange = (e) => {
    const updatedState = [...catState];
    updatedState[e.target.dataset.idx][e.target.className] = e.target.value;
    setCatState(updatedState);
  }

  return (       
    <React.Fragment>
      <style>
          {styles}
      </style> 
      <form>            
        <label htmlFor="owner">Owner</label>   
        <input  type="text" 
                name="owner" 
                id="owner" 
                onChange={(e) => setOwnerState(e.target.value)}/> 
        <label htmlFor="description">Description</label> 
        <input type="text" 
                name="description" 
                id="description" 
                onChange={(e)=> setDescriptionState(e.target.value)}/>
        <input  type="button" 
                value="Add New Cat" 
                onClick={addCat}
                />            
        <input type="submit" value="Submit" />        
        {
          catState.map((val, idx) => {
            const catId = `name-${idx}`;
            const ageId = `age-${idx}`;
            return (
              <CatInput key={catId} idx={idx} state={catState} handler={handleCatChange} />
            );      
          })
        }
      </form>
    </React.Fragment>   
  );
}; 

const CatInput = ({idx, state, handler}) =>{
  const catId = "name-"+idx;
  const ageId = "age-"+idx;

  return (
      <div key={`cat-${idx}`}>
      <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
      <input
        type="text"
        name={catId}
        data-idx={idx}
        id={catId}
        className="name" 
        onChange={handler}
        value={state[idx].name}
      />
      <label htmlFor={ageId}>Age</label>
      <input
        type="text"
        name={ageId}
        data-idx={idx}
        id={ageId}
        className="age"
        onChange={handler}
        value={state[idx].age}
      />
    </div>
  )
}

export default Form;