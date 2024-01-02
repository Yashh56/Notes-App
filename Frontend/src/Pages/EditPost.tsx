import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/react'
import { FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useNavigate,useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../URL'
import { useToast } from "@chakra-ui/react"
import { ImCross } from 'react-icons/im'



function EditPost() {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [prompt, setPrompt] = useState('')
    const postId = useParams().id
    const { user } = useContext(UserContext)
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [cat, setCat] = useState('')
    const [cats, setCats] = useState([])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')



    const deleteCategory = (i: any) => {
        let updatedCats = [...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }
    const addCategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCats(updatedCats)
        setCat('')
    }
    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const post = {
            title: title,
            desc: desc,
            username: user.username,
            userId: user._id,
            categories: cats
        }
        try {
            const res = await axios.put(URL + '/api/posts/'+postId,post,{withCredentials:true})
            // navigate('/posts/post/' + res.data._id)
            navigate('/')
            showMsg()
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const toast = useToast()
    const showMsg = () => {
        toast({
            title: 'Post Updated.',
            description: "Your Post Has Been Updated .",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <>
            <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={()=>{
                onClose()
                navigate('/')
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Write A Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input onChange={(e) => setTitle(e.target.value)} ref={initialRef} placeholder='Title' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Note</FormLabel>
                            <Textarea onChange={(e) => setDesc(e.target.value)} placeholder='Write your note here' size='sm' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Category</FormLabel>
                            <Input value={cat} onChange={(e) => setCat(e.target.value)} placeholder='Category' size='sm' />
                            <Button mt={2} colorScheme='gray' size='xs' onClick={addCategory}>+</Button>
                            <div>
                                {cats?.map((cat, i) => {
                                    return (
                                        <div key={i} className='flex mt-2 flex-row '>
                                            <Button>
                                                <Text fontWeight={'bold'} size='xl'>{cat}</Text>
                                                <p onClick={() => deleteCategory(i)} className='text-white rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>

                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleUpdate} colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={()=>{navigate('/'),onclose()}}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default EditPost
