import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'
import { ethers } from 'ethers'

export const BalanceContext = createContext({})

export const BalanceProvider = (props) => {

	BalanceProvider.propTypes = {
		children: PropTypes.any,
	}

	const [stagedBalance, setStagedBalance] = useState(ethers.BigNumber.from('0'))
	const [bondedBalance, setBondedBalance] = useState(ethers.BigNumber.from('0'))

	return (
		<BalanceContext.Provider value={{ stagedBalance, setStagedBalance, bondedBalance, setBondedBalance }}>
			{props.children}
		</BalanceContext.Provider>
	)
}

export const BalanceIndicator = (props) => {

	const { stagedBalance, bondedBalance } = useContext(BalanceContext)

	const balance = ethers.BigNumber.isBigNumber(stagedBalance) ?
		stagedBalance.add(
			ethers.BigNumber.isBigNumber(bondedBalance) ?
				bondedBalance :
				ethers.BigNumber.from('0'),
		) :
		ethers.BigNumber.from('0').add(
			ethers.BigNumber.isBigNumber(bondedBalance) ?
				bondedBalance :
				ethers.BigNumber.from('0'),
		)

	return (
		<>
			{balance.gt(0) &&
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
						{prettifyCurrency(
							(ethers.utils.formatEther(
								balance,
							)),
							0,
							2,
							'ESD',
						)}
					</span>
				</Button>
			}
		</>
	)
}
