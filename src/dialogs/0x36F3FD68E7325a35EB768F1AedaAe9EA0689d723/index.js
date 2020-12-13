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
			<p>Bond your tokens in the Empty Set Dollar DAO to gain rewards.</p>
		</Box>
	)
}

export default Index
