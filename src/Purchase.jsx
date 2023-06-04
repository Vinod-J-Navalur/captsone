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
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Card from './Card';
import Loader from './Loader';

const IMAGE = 'https://images.unsplash.com/photo-1683916367051-808dc0eb21ea'
export default function Purchase({ marketplace, nft, account }) {

    const [loading, setLoading] = useState(true)
    const [purchases, setPurchases] = useState([])
    const loadPurchasedItems = async () => {
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter = marketplace.filters.Bought(null, null, null, null, null, account)
        const results = await marketplace.queryFilter(filter)
        //Fetch metadata of each nft and add that to listedItem object.
        const purchases = await Promise.all(results.map(async i => {
            // fetch arguments from each result
            i = i.args
            // get uri url from nft contract
            const uri = await nft.tokenURI(i.tokenId)
            // use uri to fetch the nft metadata stored on ipfs 
            const response = await fetch(uri)
            const metadata = await response.json()
            // get total price of item (item price + fee)
            const totalPrice = await marketplace.getTotalPrice(i.itemId)
            // define listed item object
            let purchasedItem = {
                totalPrice,
                price: i.price,
                itemId: i.itemId,
                name: metadata.name,
                description: metadata.description,
                image: metadata.image
            }
            return purchasedItem
        }))
        setLoading(false)
        setPurchases(purchases)
    }
    useEffect(() => {
        loadPurchasedItems()
    }, [])
    if (loading) return (
        <Loader/>
    )
    return (
        <>
            {purchases.length > 0 ? <Center py={12}>
               <div className="app__container">
               {purchases.map((item, idx) => (
                    <Card item={item} key={idx}/>
                ))}
               </div>
            </Center> : <>No purchases</>}
        </>
    );
}