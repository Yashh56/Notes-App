import { Button, Image, Menu, MenuButton, MenuList, MenuItem, Text, useColorMode, Switch } from '@chakra-ui/react'
import { FaBars, } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../URL';

function Drawerbar() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const { user } = useContext(UserContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const handleLogout = async () => {
        try {
            const res = await axios.get(URL + '/api/auth/logout', { withCredentials: true })
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            <Menu>
                <MenuButton bg={'gray.80'} color={'gray.80'} as={Button} rightIcon={<FaBars />}>
                </MenuButton>
                <MenuList>
                    <MenuItem minH='48px'>
                        <Image boxSize='2rem' borderRadius='full' src='https://placekitten.com/100/100' alt='Fluffybuns the destroyer' mr='12px' />
                        <Text fontWeight={'bold'}>{user.username}</Text>
                    </MenuItem>

                    <MenuItem minH='40px'>
                        <Image boxSize='2rem' borderRadius='full' src='https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-add-icon-png-image_998225.jpg' alt='Simon the pensive' mr='12px' />
                        {user ? <Link to='/createpost'><Text fontWeight={'bold'}>Create Post</Text></Link> : <Link to='/signup'><Text fontWeight={'bold'}>Sign Up</Text></Link>}
                    </MenuItem>
                    <MenuItem minH='40px'>
                        <Image boxSize='2rem' borderRadius='full' src='https://placekitten.com/120/120' alt='Simon the pensive' mr='12px' />{
                            user ? <Text fontWeight={'bold'} onClick={handleLogout}>LogOut</Text> : <Text fontWeight={'bold'}>Login</Text>
                        }

                    </MenuItem>
                    <MenuItem minH='40px'>
                        <Image boxSize='2rem' borderRadius='full' src='https://placekitten.com/120/120' mr='12px' />
                        <Text fontWeight={'bold'} onClick={toggleColorMode}>
                            {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                        </Text>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default Drawerbar