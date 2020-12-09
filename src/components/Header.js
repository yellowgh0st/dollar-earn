import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'

import { Logotype } from './Logotype'
import { WalletConnectionToggle } from './WalletConnectionToggle'
import { ColorModeSwitcher } from './ColorModeSwitcher'

export const Header = () => {
	return (
		<Flex my='1.2rem'
			  mx={{ base: '0.5rem', sm: '1rem', md: '2.5rem', lg: '13rem' }}
			  justifyContent='center'>
			<Flex w="33%">
				<Logotype h='40px' color='white' />
			</Flex>
			<Spacer />
			<Flex w="33%" justifyContent='flex-end'>
				<WalletConnectionToggle />
				<ColorModeSwitcher marginLeft='0.6rem' />
			</Flex>
		</Flex>
	)
}
