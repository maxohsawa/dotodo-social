import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'

import Login from '../components/Login'
import SignUp from '../components/SignUp'

const Home = () => {

  const { loading, data } = useQuery(QUERY_ME)

  return (
    <>
      {loading && <div>loading...</div>}
      {data && data.me && <div>{data.me.username}</div>}
      {!data && (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </>
  )
}

export default Home