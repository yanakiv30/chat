'use client';

import { setIsRegister } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
//import { setIsRegister } from '..';

export default function RegisterPrompt() {
  const dispatch = useDispatch();

  return (
    <p>
      If you do not have an account, please:
      <button onClick={() => dispatch(setIsRegister(true))}>Register</button>
      
    </p>
  );
}
