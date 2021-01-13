import React from 'react'
import { Button } from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'

export const BalanceIndicator = (props) => {

	return (
		<Button
			size='md'
			minWidth='initial'
			fontSize={{ base: '0.65rem', sm: 'sm' }}
			aria-label='ESD balance'
			display='flex'
			variant='ghost'
			flexDirection='row'
			{...props}
			style={{
				textAlign: 'center',
			}}
		>
			<span style={{
				order: '-1',
				marginRight: '3px',
			}}>
				{prettifyCurrency(2340.4343, 0, 2, 'ESD')}
			</span>
		</Button>
	)
}
