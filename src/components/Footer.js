import React from 'react'
import { Flex, Stack } from '@chakra-ui/react'

export const Footer = (props) => {
	return (
		<Flex {...props} m='calc(3.2rem - 21px) 0'>
			<Stack direction={['row']}
				   spacing='24px'
				   m='auto 0'
				   flexGrow='1'
				   justifyContent='center'
				   fontSize={{ base: '0.55rem', sm: 'sm' }}
				   fontWeight='600'
			>
				<a href='https://www.emptyset.finance/' target='_blank' rel='noreferrer'>Site</a>
				<a href='https://docs.emptyset.finance' target='_blank' rel='noreferrer'>Documentation</a>
				<a href='https://docs.emptyset.finance/faqs/basics' target='_blank' rel='noreferrer'>FAQs</a>
			</Stack>
		</Flex>
	)
}
