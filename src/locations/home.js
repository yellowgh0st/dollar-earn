import React from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { PoolCards } from '../components/PoolCards'

const Home = (props) => {

	Home.propTypes = {
		data: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired,
		error: PropTypes.object,
	}

	return (
		<Box maxW='768px' m='0 auto'>
			<Heading textStyle='h2' size='lg'>Reward Pools</Heading>
			{props.error &&
				<Text align='center'>Something happened. Please try again...</Text>
			}
			{props.loading &&
				<Text align='center'>Loading...</Text>
			}
			<PoolCards pools={props.data} loading={props.loading} />
		</Box>
	)
}

export default Home
