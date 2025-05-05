import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ShowGoals = () => {
  const userDetails = useSelector((state) => state.user.userDetails)

  return <div>
    {userDetails.token}
  </div>
}

export default ShowGoals
