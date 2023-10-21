import React from 'react'
import { Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'


function Header() {
  return (
    <Stack direction='horizontal' gap={4} className='mx-auto text-white'>
      <span>
        <h1 className='m-0'>minimalist task manager</h1>
        <p className='m-0'>
          by 
          <a href="https://github.com/miljkovicjovan" target='_blank'>
            @miljkovicjovan
          </a>
        </p>
      </span>
      <Button className='bg-light text-dark'>
        <FontAwesomeIcon icon={faPlus} className='pe-1'/>
        task
      </Button>
    </Stack>
  )
}

export default Header