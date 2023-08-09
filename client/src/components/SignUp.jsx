import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import { 
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
 } from '@chakra-ui/react'

const SignUp = () => {

  const [ addUser, { error, data } ] = useMutation(ADD_USER)

  const [ formState, setFormState ] = useState({
    username: '',
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

  const handleSignUp = async (event) => {
    try {
      const { data } = await addUser({
        variables: { ...formState },
      })
      Auth.login(data.addUser.token)
    } catch (error) {
      console.error(error)
    } 
  }

  return (
    <>
      <Card minW='sm' maxW='md' m='6'>
        <CardBody>
          <Stack mt='6' spacing='3'>
            <Text fontSize='5xl'>Sign Up</Text>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={formState.username}
                  onChange={handleChange}
                  />
              </FormControl>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  placeholder='Email address'
                  name='email'
                  value={formState.email}
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
              onClick={handleSignUp}
              >
              Sign Up
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    
    </>
  )
}

export default SignUp