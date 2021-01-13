import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'

import { Logotype } from './Logotype'
import { WalletConnectionToggle } from './WalletConnectionToggle'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { BalanceIndicator } from './BalanceIndicator'

export const Header = (props) => {
	return (
		<Flex {...props}>
			<Flex w="33%">
				<Logotype h='40px' color='white' />
			</Flex>
			<Spacer />
			<Flex w="33%" justifyContent='flex-end'>
				<BalanceIndicator />
				<WalletConnectionToggle marginLeft='0.6rem' />
				<ColorModeSwitcher marginLeft='0.6rem' />
			</Flex>
		</Flex>
	)
}
