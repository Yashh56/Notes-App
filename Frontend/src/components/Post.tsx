import { Card, CardHeader, CardBody, CardFooter, Box, } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Heading, Text, Stack, Divider } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDisclosure } from '@chakra-ui/react'
// import PostDetails from '../Pages/PostDetails'
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../URL'


function Post() {
  const postId = useParams().id
  const [post, setPost] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const getPosts = async () => {
    try {
      const res = await axios.get(URL + '/api/posts/user/' + user._id, { withCredentials: true })
      // console.log(res.data)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPosts()
  },[user])

  const handleDelete = async () => {
    try {
      const res = await axios.delete(URL + '/api/posts/'+postId, { withCredentials: true })
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex ml-16 items-center  justify-evenly'>
      <div className='h-full w-[45vh] mt-2 justify-start'>
        {posts?.map((post) => (
          <div>
          <Box mt={10}>
            <Card bg={'gray.50'} color={'gray.800'} alignItems={'center'} justifyContent={'center'} textAlign={'center'} maxW='sm' >
              <CardBody>
                <Link to={user ? `/posts/post/${post._id}` : '/login'}>
                  <Stack mt='6' spacing='3' onClick={onOpen}>
                    <Heading size='md'>{post.title}</Heading>
                    {/* <CardHeader>{post.title}</CardHeader> */}
                    <Text>
                      {post.desc}
                    </Text>
                    <Text>
                      {post.categories.map((c, i) => () => (
                        <span key={i} className='text-blue-500'>
                          {c}
                        </span>

                      ))}
                    </Text>
                  </Stack>
                </Link>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Link to={user? `/edit/${post._id}`: '/signup'}>
                  <Button variant='solid' colorScheme='blue'>
                    Edit
                  </Button>
                  
                  </Link><Button variant='ghost' onClick={handleDelete} colorScheme='blue'>
                    Delete Note
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Box>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Post