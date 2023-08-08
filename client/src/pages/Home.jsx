import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'

import { Container } from '@chakra-ui/react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

import './Home.css'

const Home = () => {

  const { loading, data } = useQuery(QUERY_ME)

  return (
    <>
      {loading && <div>loading...</div>}
      {data && data.me && <div>{data.me.username}</div>}
      {!data && (
        <>
          <Container className='outlet-container'>
            <Login />
            <SignUp />
          </Container>
        </>
      )}
    </>
  )
}

export default Home