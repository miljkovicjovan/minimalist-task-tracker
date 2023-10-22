import { Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function AddTask({ onAdd }) {
  const [name, setName] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    if (!name) {
      return;
    }

    onAdd({name});
    setName('');
  }

  return (
    <form onSubmit={onSubmit} className='pt-3 d-flex justify-content-center'>
        <input 
            type="text" 
            value={name}
            placeholder="Add a Task"
            className='bg-dark text-light rounded p-1 me-3'
            onChange={(e) => setName(e.target.value)}
        />
        <Button type='submit' className='bg-light border-light text-dark'>
            <FontAwesomeIcon icon={faPlus} className='pe-1'/>
            task
        </Button>
    </form>
  )
}

export default AddTask;