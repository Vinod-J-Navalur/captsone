import {
    Box,
    Button,
    Center, Heading,
    Image, Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

export default function Home({ marketplace, nft }) {

    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                })
            }
        }
        setLoading(false)
        setItems(items)
    }

    const buyMarketItem = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems()
    }

    useEffect(() => {
        loadMarketplaceItems()
    }, [])


    if (loading) return (
        <Loader/>
     )
    


    return (
        <>
            <div className="app__container">
                {items.length > 0 ? <Center py={12}>
                    {items.map((item, idx) => (
                        <Box
                            key={idx}
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
                                    <Link to='/info' state={{ ...item, sold: false }} >
                                        <Button
                                            flex={1}
                                            fontSize={'sm'}
                                            rounded={'full'}
                                            _focus={{
                                                bg: 'gray.200',
                                            }}>
                                            More Info
                                        </Button>
                                    </Link>
                                    <Button
                                        flex={1}
                                        fontSize={'sm'}
                                        rounded={'full'}
                                        bg={'blue.400'}
                                        w={'20'}
                                        color={'white'}
                                        onClick={() => buyMarketItem(item)}
                                        boxShadow={
                                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                        }
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        _focus={{
                                            bg: 'blue.500',
                                        }}>
                                        BUY
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </Center> : <>No listed items</>}
            </div>
        </>
    );
}