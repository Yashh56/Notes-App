
import { Flex, Heading, Input, Button, FormControl, FormLabel, Switch, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { URL } from '../URL';

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + '/api/auth/login', { email, password },{withCredentials: true});
      setUser(res.data);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate('/');
      console.log('Login Successful');

    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  const toast = useToast()
  const showMsg = () => {
    toast({
      title: 'Login Successfully.',
      // description: "We've created your account for you.",
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
        <Heading mb={6}>Log In</Heading>
        <Input
          onChange={e => setEmail(e.target.value)}
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          onChange={e => setPassword(e.target.value)}
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button
          onClick={() => {
            handleLogin();
            showMsg();
          }}
          colorScheme="teal" mb={8}>
          Log In
        </Button>
        <Text mt={2} fontWeight={'bold'}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
