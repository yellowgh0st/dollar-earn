import React, { useRef, useEffect } from 'react'
import { useWallet } from 'use-wallet'
import { Button } from '@chakra-ui/react'
import { prettifyAddress } from '../common/utils'
import Jazzicon from '@metamask/jazzicon'

export const WalletConnectionToggle = (props) => {

	const wallet = useWallet()
	const ref = useRef()

	const text = 'Connect a wallet'

	const toggle = () => {
		if (wallet.status !== 'connected') wallet.connect('injected').catch(console.log)
	}

	useEffect(() => {
		if (wallet.account !== null) {
			ref.current.textContent = prettifyAddress(wallet.account)
			ref.current.appendChild(Jazzicon(16, parseInt(
				wallet.account.slice(2, 10), 16)))
				.style.marginLeft = '7px'
		}
		return () => {
			ref.current.textContent = text
		}
	}, [wallet])

	return (
		<Button
			size='md'
			minWidth='initial'
			fontSize={{ base: '0.65rem', sm: 'sm' }}
			variant='solid'
			aria-label='Wallet Connection Status'
			color='current'
			onClick={toggle}
			ref={ref}
			{...props}
		>
			{text}
		</Button>
	)
}
