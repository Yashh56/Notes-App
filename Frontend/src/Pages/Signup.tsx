import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../URL';
const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async() => {
    try {
      const res = await axios.post(URL + '/api/auth/signup',{username,email,password});
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate('/login');
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  const toast = useToast()
  const showMsg = () => {
    toast({
      title: 'Account Created.',
      description: "Now You Can Login .",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={'gray.50'}
        color={'gray.800'}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Sign Up</Heading>
        <Input
        onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe12"
          type="username"
          variant="filled"
          mb={3}
        />
        <Input
        onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
        onChange={(e) => setPassword(e.target.value)}
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8} onClick={()=>{handleSignup(),showMsg()}}>
          Sign Up
        </Button>
        <Text mt={2} fontWeight={'bold'}>
        Already have an account? <Link to="/login" className=' underline underline-offset-3'>Log In</Link>
      </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
