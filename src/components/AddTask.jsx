import { Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddTask() {
  return (
    <Stack direction="horizontal" className='pt-3 d-flex justify-content-center'>
        <input 
            type="text" 
            placeholder="Add a Task"
            className='bg-dark text-light rounded p-1 me-3'
        />
        <Button className='bg-light border-light text-dark'>
            <FontAwesomeIcon icon={faPlus} className='pe-1'/>
            task
        </Button>
    </Stack>
  )
}

export default AddTask;