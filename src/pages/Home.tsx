import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { useGetMeQuery } from '../redux/api/auth.api'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { token } = useSelector((state: RootState) => state.auth)
  const { data, error } = useGetMeQuery({ token });
  const navigate = useNavigate()

  useEffect(() => {
    if (error && 'status' in error && error.status === 401) {
      console.log("salom");
      navigate("/login")

    }
  }, [error])

  return (
    <div className='container mx-auto flex h-screen justify-center items-center '>
      <div className='rounded-[8px] bg-[#eee] shadow-2xl'>
        <div><img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" className='' alt="" /></div>
        <div className='flex flex-col justify-center items-center py-5'>
          <h1><strong>First Name: </strong>{data?.firstname}</h1>
          <h1><strong>Last Name: </strong>{data?.lastname}</h1>
          <h3><strong>Email Name: </strong>{data?.email}</h3>
          <h3><strong>Role Name: </strong>{data?.role}</h3>
        </div>
      </div>
    </div>
  )
}

export default memo(Home)
