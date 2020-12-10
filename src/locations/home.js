import React from 'react'
import defaults from '../common/defaults'
import { Box, Heading } from '@chakra-ui/react'
import { PoolCards } from '../components/PoolCards'

const Home = () => {
	return (
		<Box maxW='800px' m='0 auto'>
			<Heading textStyle='h2' size='lg'>Reward Pools</Heading>
			<PoolCards fetch={defaults.api.esd.pools} />
		</Box>
	)
}

export default Home
