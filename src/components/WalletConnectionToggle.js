import React, { useRef, useState, useEffect } from 'react'
import defaults from '../common/defaults'
import { useWallet } from 'use-wallet'
import { Button, useToast } from '@chakra-ui/react'
import { prettifyAddress } from '../common/utils'
import Jazzicon from '@metamask/jazzicon'

export const WalletConnectionToggle = (props) => {

	const initialText = 'Connect a wallet'
	const wallet = useWallet()
	const ref = useRef()
	const toast = useToast()
	const [working, setWorking] = useState(false)
	const [text, setText] = useState(initialText)

	const toggle = () => {
		if (!wallet.account) {
			setWorking(true)
			wallet.connect('injected')
				.then(() => setWorking(false))
				.catch(console.log)
		}
	}

	useEffect(() => {
		if (wallet.account !== null) {
			setText(prettifyAddress(wallet.account))
			ref.current.appendChild(Jazzicon(16, parseInt(
				wallet.account.slice(2, 10), 16)))
				.style.marginLeft = '7px'
			toast({
				title: 'Wallet connected',
				description: 'Your wallet account has been successfully connected.',
				status: 'success',
				duration: defaults.toast.duration,
				isClosable: true,
			})
		}
		return () => {
			if (wallet.account) {
				if (ref.current) ref.current.getElementsByTagName('div')[0].remove()
				setText(initialText)
			}
		}
	}, [wallet.account])

	return (
		<Button
			size='md'
			minWidth='initial'
			fontSize={{ base: '0.65rem', sm: 'sm' }}
			variant='solid'
			aria-label='Wallet Connection Status'
			color='current'
			isLoading={working}
			onClick={toggle}
			display='flex'
			flexDirection='row'
			ref={ref}
			{...props}
			style={{
				textAlign: 'center',
			}}
		>
			<span style={{
				order: '-1',
			}}>
				{text}
			</span>
		</Button>
	)
}
