import React from 'react'
import { ethers } from 'ethers'
import {
    Box,
    Button,
    Center,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    //console.log(item)
    return (
        <div>
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
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${item.image})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={item.image}
                    />
                </Box>
                <Stack pt={10} align={'center'}>

                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {item.name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            Ξ {ethers.utils.formatEther(item.totalPrice)}
                        </Text>
                    </Stack>
                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Link style={{width: '100%'}} to='/info' state={{...item,sold: true}} >
                            <Button
                                flex={1}
                                w={'full'}
                                fontSize={'sm'}
                                rounded={'full'}
                                _focus={{
                                    bg: 'gray.200',
                                }}>
                                More Info
                            </Button>
                        </Link>

                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}

export default Card