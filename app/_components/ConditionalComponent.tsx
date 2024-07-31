'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import App from './App'
import { useAppSelector } from '@/store/store'

const ConditionalComponent = () => {
  const router = useRouter()
  const { loggedInUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (loggedInUser === null) {
      router.push('/login')
    }
  }, [loggedInUser, router])

  if (loggedInUser) {    
    return <App />
  }else{console.log("return App from ConditionalComponent - else")}

  // Return null or a loading indicator 
  return null
}

export default ConditionalComponent
