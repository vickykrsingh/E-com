import React,{ useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Spinner() {
    const [count , setCount] = useState(5);
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(()=>{
            setCount((prevValue) => --prevValue)
        },1000)
        count === 0 && navigate('/login')
        return () => clearInterval(interval)
    } , [count,navigate])

  return (
    <div className='spin bg-dark'>
      <div class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div>
        <span className='text-warning fw-bold fs-4' >Redirecting You in {count}</span>
      </div>
    </div>
  )
}

export default Spinner