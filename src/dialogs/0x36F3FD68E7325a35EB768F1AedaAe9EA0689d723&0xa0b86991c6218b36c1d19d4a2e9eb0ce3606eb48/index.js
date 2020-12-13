import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from '@chakra-ui/react'

const Index = (props) => {

	Index.propTypes = {
		data: PropTypes.array.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	return (
		<Box>
			<Heading textStyle='h2' marginBottom='0.7rem'>{props.data.name}</Heading>
			<p>Acrue rewards by bonding Uniswap LP tokens in dedicated pool.</p>
		</Box>
	)
}

export default Index
