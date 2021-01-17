import React, { useState, useEffect } from 'react'
import defaults from './common/defaults'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ChakraProvider, Box } from '@chakra-ui/react'
import useFetch from 'use-http'
import { getPoolLocation } from './common/utils'
import esd from './themes/esd'
import { UseWalletProvider } from 'use-wallet'
import { BalanceProvider } from './components/BalanceIndicator'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import Home from './locations/home'
import Pool from './locations/pool'

import initPools from '../data/pools.json'

const App = () => {

	const [pools, setPools] = useState(initPools)
	const [loaded, setLoaded] = useState(true)
	const [err, setErr] = useState(null)
	const { get, response, error, loading } = useFetch(defaults.api.esd)

	useEffect(() => {
		const getPools = async () => {
			const data = await get('pools')
			setLoaded(loading)
			if (response.ok) {
				setPools(data)
				setLoaded(loading)
			}
			else {
				setErr(error)
				setPools(initPools)
				setLoaded(loading)
			}
		}
		getPools()
	}, [])

	return (
		<Router>
			<ChakraProvider theme={esd}>
				<UseWalletProvider
					chainId={defaults.network.chainId}
					connectors={defaults.network.connectors}>
					<BalanceProvider>
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
									<Home data={pools} loading={loaded} error={err} />}
								/>

								{pools.map((pool, index) => {
									return (
										<Route key={index}
											   path={getPoolLocation(
												   pool.collateral[0],
												   pool.collateral[1],
											   )}
											   exact render={() => (
												<Pool data={pool}
													  path={getPoolLocation(
														  pool.collateral[0],
														  pool.collateral[1],
													  )}
													  loading={loaded}
													  error={err} />
											   )}/>
									)
								})}

								<Route path='*' render={() => (
									<Redirect to={'/'} />
								)} />
							</Switch>
							<Footer h='7vh' justifyContent='center' />
						</Box>
					</BalanceProvider>
				</UseWalletProvider>
			</ChakraProvider>
		</Router>
	)
}

export default App
