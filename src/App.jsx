
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Navbar from './Navbar';

import BaseRoutes from './Routes';
import './styles/style.scss';

function App() {


  return (
    <>
      <ChakraProvider >
        <BaseRoutes />
      </ChakraProvider>
    </>
  )
}

export default App
