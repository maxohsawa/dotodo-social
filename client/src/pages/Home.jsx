import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'

import Auth from '../utils/auth'

import { 
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'

import Login from '../components/Login'
import SignUp from '../components/SignUp'

const Home = () => {

  const { loading, data } = useQuery(QUERY_ME)
  const me = data?.me || null

  const handleLogout = () => {
    Auth.logout()
  }

  return (
    <>
      {loading && <div>loading...</div>}

      {me ? (
        <>
          <Text fontSize='5xl'>
            Welcome {data.me.username}!
          </Text>
          <Button
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Flex justifyContent='center' flexWrap='wrap'>
            <Login />
            <SignUp />
          </Flex>
        </>
      )}
    </>
  )
}

export default Home