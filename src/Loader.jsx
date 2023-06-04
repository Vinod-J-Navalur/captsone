import { Box, SkeletonCircle, SkeletonText, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <div className='app__container'>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                m={5}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>
        </div>
    )
}

export default Loader