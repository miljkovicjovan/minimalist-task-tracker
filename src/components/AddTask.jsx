import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

function AddTask({ onAdd }) {
  const [name, setName] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    if (!name) {
      return;
    }

    if (!name.replace(/\s/g, '').length) {
        setName('');
        return;
    }

    onAdd({name});
    setName('');
  }

  return (
    <form onSubmit={onSubmit} className='pt-4 d-flex justify-content-center'>
        <input 
            type="text" 
            value={name}
            placeholder="Add a Task"
            className='bg-dark text-light rounded p-1 me-3'
            onChange={(e) => setName(e.target.value)}
        />
        <Button type='submit' className='bg-light border-light text-dark add-task'>
            <FontAwesomeIcon icon={faPlus} className='pe-1'/>
            task
        </Button>
        <Tooltip
          anchorSelect=".add-task"
          content="Add a Task"
          place='right'
        />
    </form>
  )
}

export default AddTask;