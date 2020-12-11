import React from 'react'
import defaults from './common/defaults'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import useFetch from 'use-http'
import esd from './themes/esd'
import { UseWalletProvider } from 'use-wallet'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './locations/home'

const App = () => {

	const { loading, error, data = [] } = useFetch(defaults.api.esd.pools, {}, [])

	return (
		<Router>
			<ChakraProvider theme={esd}>
				<UseWalletProvider
					chainId={defaults.network.chainId}
					connectors={defaults.network.connectors}>
					<Box h='100vh'
						 justifyContent='center'
						 mx={{ base: '0.5rem', sm: '1rem', md: '2.5rem', lg: '13rem' }}
						 p={3}>
						<Header width='100%'
							marginTop='1.2rem'
							marginBottom='3.2rem'
							justifyContent='center' />
						<Switch>
							<Route path='/' exact render={() =>
								<Home data={data} loading={loading} error={error} />}
							/>
							<Route render={() => <Redirect to="/" />} />
						</Switch>
						<Footer h='7vh' justifyContent='center' />
					</Box>
				</UseWalletProvider>
			</ChakraProvider>
		</Router>
	)
}

export default App
