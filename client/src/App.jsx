import { Outlet } from 'react-router-dom'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import { getCookie } from './utils/cookies'

import { ChakraProvider, Container } from '@chakra-ui/react'

import Header from './components/Header'

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = getCookie('id_token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Container m={3} minW='95vw' minH='95vh'>
            <Header />
            <Outlet />
          </Container>

        </ChakraProvider>
      </ApolloProvider>
    </>
  )
}

export default App
