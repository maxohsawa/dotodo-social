import { useState } from 'react'

import { 
  Box,
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

  const [ formState, setFormState ] = useState({
    email: '',
    password: ''
  })

  const [ errorState, setErrorState ] = useState( {
    email: false,
    password: false
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleLogin = (event) => {
    console.log('login attempt with', formState)    
  }

  return (
    <>
      <Card maxW='sm'>
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
              <FormControl isInvalid={errorState.password}>
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