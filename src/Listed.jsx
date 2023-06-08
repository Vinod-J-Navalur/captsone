import { Center, list, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Loader from './Loader'

const Listed = ({ marketplace, nft, account }) => {

    const [loading, setLoading] = useState(true)
    const [listedItems, setListedItems] = useState([])
    const [soldItems, setSoldItems] = useState([])
    const loadListedItems = async () => {
        // Load all sold items that the user listed
        const itemCount = await marketplace.itemCount()
        let listedItems = []
        let soldItems = []
        for (let indx = 1; indx <= itemCount; indx++) {
            const i = await marketplace.items(indx)
            if (i.seller.toLowerCase() === account) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(i.tokenId)
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(i.itemId)
                // define listed item object
                let item = {
                    totalPrice,
                    price: i.price,
                    itemId: i.itemId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                }
                listedItems.push(item)
                // Add listed item to sold items array if sold
                if (i.sold) soldItems.push(item)
            }
        }
        setLoading(false)
        setListedItems(listedItems)
        setSoldItems(soldItems)
    }


    function renderListed(listedItems) {
        return (
            <>
                {listedItems.length > 0 ?
                    listedItems.map((item, idx) => (
                        <Center mt={10}>
                            <Card item={item} key={idx} />
                        </Center>
                    ))
                    : <>no listed items</>}
            </>
        )
    }

    function renderSoldItems(soldItems) {
        return (
            <>
                {soldItems.length > 0 ?
                    soldItems.map((item, idx) => (
                        <Center mt={10}>
                            <Card item={item} key={idx} />
                        </Center>
                    ))
                    : <>no sold items</>}
            </>
        )
    }



    useEffect(() => {
        loadListedItems()
    }, [])
    if (loading) return (
       <Loader/>
    )

    return (
        <div>
            <Tabs
                variant='soft-rounded'
                colorScheme='blue'
                m={5}
            >
                <TabList>
                    <Tab px={12} m={2}>Listed</Tab>
                    <Tab px={12} m={2}>Sold</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="app__container">
                            {renderListed(listedItems)}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="app__container">
                            {renderSoldItems(soldItems)}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs></div>
    )
}

export default Listed