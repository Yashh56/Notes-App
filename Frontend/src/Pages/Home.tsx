// import { Flex, Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
// import Post from '../components/PostBtn'
const Home = () => {
  return (
    <div className='w-full h-full '>
      <Navbar />
     
      <div className='flex flex-wrap justify-center gap-4 items-center flex-col'>
        <Post />
      </div>
    </div>

  )
}
export default Home