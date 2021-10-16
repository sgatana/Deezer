import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div className='loader'>
      
        <Spinner animation='border' className='mr-2' size='lg' />
        Wait for the result
      
    </div>
  );
}
