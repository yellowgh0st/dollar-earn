import React from 'react'
import PropTypes from 'prop-types'
import { Box, useColorModeValue } from '@chakra-ui/react'

export const ContentBox = (props) => {

	ContentBox.propTypes = {
		children: PropTypes.any,
	}

	const background = useColorModeValue('gray.300', 'gray.600')

	return (
		<Box background={background}
			 borderRadius='21px'
			 p='2rem 2.6rem 3rem'
			 {...props}
		>
			{props.children}
		</Box>
	)
}
