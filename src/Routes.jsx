import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Create'
import Home from './Home'
import Listed from './Listed'
import Navbar from './Navbar'
import Purchase from './Purchase'


import MarketplaceAbi from './contractsData/Marketplace.json'
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'

import { ethers } from "ethers"
import Info from './Info'
import Hero from './Hero'

const BaseRoutes = () => {

    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState(null)
    const [nft, setNFT] = useState({})
    const [marketplace, setMarketplace] = useState({})
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0])
            await web3Handler()
        })
        loadContracts(signer)
    }
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketplace(marketplace)
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
        setNFT(nft)
        setLoading(false)
    }

    useEffect(() => {
        web3Handler()
    }, [])

    return (
        <div>
            <BrowserRouter>
                {!loading ?
                    <>
                        <Navbar web3Handler={web3Handler} account={account}/>
                        <Routes>
                            <Route path='/' element={<Home marketplace={marketplace} nft={nft} web3Handler={web3Handler} />} />
                            <Route path='/listed' element={<Listed marketplace={marketplace} nft={nft} account={account} />} />
                            <Route path='/create' element={<Create marketplace={marketplace} nft={nft} />} />
                            <Route path='/purchase' element={<Purchase marketplace={marketplace} nft={nft} account={account} />} />
                            <Route path='/info' element={<Info marketplace={marketplace} />} />
                        </Routes>
                    </> : <Hero web3Handler={web3Handler} />}
            </BrowserRouter>
        </div>
    )
}

export default BaseRoutes