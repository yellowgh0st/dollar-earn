import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

const Home = () => {
	return (
		// The top margin is there just for demo purposes.
		// We are going to need some content up there or whatever.
		<Grid
			h='400px'
			maxW='800px'
			m='190px auto 30px auto'
			templateColumns='repeat(2, 1fr)'
			gap={{ base: 25, sm: 25, lg: 50 }}
		>
			<GridItem borderRadius='lg' colSpan={1} bg='#EDF2F7' />
			<GridItem borderRadius='lg' colSpan={1} bg='#EDF2F7' />
		</Grid>
	)
}

export default Home
