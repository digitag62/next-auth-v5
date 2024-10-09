import React from 'react'
import { Spinner } from '@/components/spinner'

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner />
    </div>
  )
}

export default LoadingPage
