import React from 'react'
import PropTypes from 'prop-types'
import { Fade } from '@chakra-ui/react'

const Pool = (props) => {

	Pool.propTypes = {
		name: PropTypes.string.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	return (
		<Fade in={true}>
			<p style={{ textAlign: 'center' }}>This is {props.name}.</p>
		</Fade>
	)
}

export default Pool
