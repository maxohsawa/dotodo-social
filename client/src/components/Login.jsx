import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import { 
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
 } from '@chakra-ui/react'

const Login = () => {

  const [ login, { error, data } ] = useMutation(LOGIN_USER)

  const [ formState, setFormState ] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleLogin = async (event) => {
    try {
      const { data } = await login({
        variables: { ...formState },
      })

      Auth.login(data.login.token)
    } catch (error) {
      console.error(error)
    } 
  }

  return (
    <>
      <Card minW='sm' maxW='md' m='6'>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Text fontSize='5xl'>Login</Text>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  placeholder='Email address'
                  name='email'
                  value={formState.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input 
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button 
              variant='solid' 
              colorScheme='blue'
              onClick={handleLogin}
            >
              Login
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  )
}

export default Login