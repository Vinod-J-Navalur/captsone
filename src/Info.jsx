import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { ethers } from 'ethers';

export default function Info({ marketplace }) {

    const location = useLocation()
    const item = location.state
    console.log(item)
    async function buyNFT(item) {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    }

    return (
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                alignItems={'center'}
                py={{ base: 18, md: 24 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={item.image}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {item.name}
                        </Heading>
                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            Ξ {ethers.utils.formatEther(item.totalPrice)}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>
                            <Text fontSize={'lg'}>
                                {item.description}
                            </Text>
                        </VStack>
                    </Stack>

                    {!item.sold && <Button
                        rounded={'full'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={useColorModeValue('blue.400', 'gray.50')}
                        color={useColorModeValue('white', 'gray.900')}
                        onClick={() => buyNFT(item)}
                        textTransform={'uppercase'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}
                    >
                        BUY
                    </Button>}
                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}