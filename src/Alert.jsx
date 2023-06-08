import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import React,{ useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CustomAlert({open,complete,message}) {
    const cancelRef = React.useRef()
    const [popUp,SetPopUp] = useState(false);
    const [stop,setStop] = useState(false)

    const navigate = useNavigate();

    function handleClose(){
        navigate('/')
    }

    useEffect(()=>{
        SetPopUp(open)
    },[open])
    useEffect(()=>{
        setStop(complete)
    },[complete])

    return (
      <>
        <AlertDialog
          isOpen={popUp}
          leastDestructiveRef={cancelRef}
        //   onClose={handleClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {message? 'Uploading...' : stop? 'Transaction Completed' : 'Transaction Pending...'}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {message? 'connecting with IPFS': stop? 'Click Ok to Continue': 'Please approve the transaction from your wallet'}
              </AlertDialogBody>

              {stop && <AlertDialogFooter>
              <Button colorScheme='green' onClick={handleClose} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>}
  
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }