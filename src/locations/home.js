import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

const Home = () => {
	return (
		<Grid
			h='400px'
			maxW='800px'
			m='0px auto 1.2rem auto'
			templateColumns='repeat(2, 1fr)'
			gap={{ base: 25, sm: 25, lg: 50 }}
		>
			<GridItem borderRadius='lg' colSpan={1} bg='#EDF2F7' />
			<GridItem borderRadius='lg' colSpan={1} bg='#EDF2F7' />
		</Grid>
	)
}

export default Home
