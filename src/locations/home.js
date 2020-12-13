import React from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { PoolCards } from '../components/PoolCards'

const Home = (props) => {

	Home.propTypes = {
		data: PropTypes.array.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	return (
		<Box maxW='768px' m='0 auto'>
			<Box>
				<span style={{ fontSize: '2rem' }}>Welcome to </span><Heading as='h1' textStyle='h1' display='inline'>Empty&nbsp;set&nbsp;døllar.</Heading>
				<span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '3.2rem' }}>Built to be the reserve currency of&nbsp;Decentralized Finance.</span>
			</Box>
			<Heading textStyle='h2' size='lg'>Reward Pools</Heading>
			{props.error &&
				<Text align='center'>Something happened. Please try again...</Text>
			}
			{props.loading &&
				<Text align='center'>Loading...</Text>
			}
			<PoolCards pools={props.data} loading={props.loading} error={props.error} />
		</Box>
	)
}

export default Home
