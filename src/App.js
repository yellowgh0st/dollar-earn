import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { UseWalletProvider } from 'use-wallet'
import defaults from './common/defaults'
import { Header } from './components/Header'
import Home from './locations/home'

const App = () => {
	return (
		<Router>
			<ChakraProvider theme={theme}>
				<UseWalletProvider
					chainId={defaults.network.chainId}
					connectors={defaults.network.connectors}>
					<Header/>
					<Box textAlign="center" fontSize="xl">
						<Grid minH="100vh" p={3}>
							<Route path='/' exact component={Home}/>
						</Grid>
					</Box>
				</UseWalletProvider>
			</ChakraProvider>
		</Router>
	)
}

export default App
