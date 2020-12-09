import React from 'react'
import { useColorModeValue, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logo from '../assets/svg/logotype.svg'

const inverse = {
	filter: 'invert(100%)',
}

export const Logotype = (props) => {

	const filter = useColorModeValue(undefined, inverse)

	return (
		<Link to='/'>
			<Image src={logo}
				style={filter}
				{...props}
			/>
		</Link>
	)
}
