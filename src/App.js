import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { theme } from './common/theme'
import { UseWalletProvider } from 'use-wallet'
import defaults from './common/defaults'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './locations/home'

const App = () => {
	return (
		<Router>
			<ChakraProvider theme={theme}>
				<UseWalletProvider
					chainId={defaults.network.chainId}
					connectors={defaults.network.connectors}>
					<Box h='93vh'
						  justifyContent='center'
						  mx={{ base: '0.5rem', sm: '1rem', md: '2.5rem', lg: '13rem' }}
						  p={3}>
						<Header width='100%'
							my='1.2rem'
							justifyContent='center' />
						<Route path='/' exact component={Home} />
						<Footer h='7vh' justifyContent='center' />
					</Box>
				</UseWalletProvider>
			</ChakraProvider>
		</Router>
	)
}

export default App
