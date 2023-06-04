import {
    Box, Button, Flex, FormControl,
    FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper, Stack, Text, Textarea, useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DocUpload from './DocUpload';

import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client'
const authorization = "Basic " + btoa('2PmpXDffryvEoBDCZlqQUga1yhG' + ":" + 'e6db555ee988013efc88a1dcd6858131');
const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0', headers: { authorization } })


export default function Create({ marketplace, nft }) {

    const format = (val) => `Ξ ` + val
    const parse = (val) => val.replace(/^\$/, '')
    const [value, setValue] = useState('0.0')


    const [image, setImage] = useState('')
    const [price, setPrice] = useState('0.0')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const uploadToIPFS = async (event) => {
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                console.log(result)
                setImage(`https://vinodjnavalur.infura-ipfs.io/ipfs/${result.path}`)
            } catch (error) {
                console.log("ipfs image upload error: ", error)
            }
        }
    }
    const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try {
            const result = await client.add(JSON.stringify({ image, price, name, description }))
            mintThenList(result)
            console.log(result);
        } catch (error) {
            console.log("ipfs uri upload error: ", error)
        }
    }
    const mintThenList = async (result) => {
        const uri = `https://vinodjnavalur.infura-ipfs.io/ipfs/${result.path}`
        // mint nft 
        await (await nft.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    }




    return (
        <Flex
            // minH={'vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Create New Item</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Fill all the required field ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder='eg: Hey this is my digital art'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='price' >
                            <FormLabel >Price</FormLabel>
                            <NumberInput
                                onChange={(valueString) => setPrice(parse(valueString))}
                                value={format(price)}
                                max={50}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    {value > 0 && <NumberDecrementStepper />}
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>NFT Upload</FormLabel>
                            <DocUpload label={'Upload'} onChange={uploadToIPFS} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                marginTop={{ base: 5 }}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={createNFT}
                            >
                                Create
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}