import React from 'react'
import { useWallet } from 'use-wallet'
import { Button } from '@chakra-ui/react'
import { prettifyAddress } from '../common/utils'

export const WalletConnectionToggle = (props) => {

	const wallet = useWallet()

	const toggle = () => {
		if (wallet.status !== 'connected') wallet.connect('injected')
	}

	return (
		<Button
			size='md'
			fontSize='sm'
			variant='solid'
			aria-label='Wallet Connection Status'
			color='current'
			mx='0.2rem'
			onClick={toggle}
			{...props}
		>
			{ wallet.status === 'connected'
				? prettifyAddress(wallet.account)
				: 'Connect a wallet'}
		</Button>
	)
}
