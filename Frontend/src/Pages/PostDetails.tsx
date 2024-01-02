import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../URL'


function PostDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate()
  const postId = useParams().id
  const { user } = useContext(UserContext)
  const [post, setPost] = useState({})

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + '/api/posts/' + postId, { withCredentials: true })
      setPost(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  return (
    <div>
      <Modal bg={'gray.800'} colorScheme='gray' blockScrollOnMount={false} isOpen={isOpen} onClose={() => {
        onClose()
        navigate('/')
      }}>
        <ModalOverlay />
        {user?._id === post?.userId && <ModalContent>
          <ModalHeader>  {post?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
            {post.desc}
            </Text>
          </ModalBody>
          {post.categories?.map((c, i) => {
            return (
              <Text key={i} color='blue.600' fontSize='2xl'>
                {c}
              </Text>
            )
          })}
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
              onClose()
              navigate('/')
            }}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>}
      </Modal>
    </div>
  )
}
export default PostDetails