import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getERC20Allowance } from '../../common/ethereum'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'
import defaults from '../../common/defaults'
import {
	Heading, Spinner, Flex, HStack, Button,
	Input, Text, Img, useBreakpointValue,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { ContentBox } from '../../components/ContentBox'
import { Steps } from '../../components/Steps'

const Index = (props) => {

	Index.propTypes = {
		data: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	const wallet = useWallet()

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getERC20Allowance(defaults.contracts.esd,
				wallet.account,
				defaults.contracts.root,
				provider,
			).then(n => {
				if (!BigInt(n) > BigInt(0)) setApproved(false)
			})
		}
		return () => setApproved(true)
	}, [wallet.account])

	const { Step } = Steps
	const [current] = useState(0)
	const [approved, setApproved] = useState(true)
	const [approving, setApproving] = useState(false)
	const [staging, setStaging] = useState(false)
	const [bonding, setBonding] = useState(false)

	const iconHold = current === 1 ? <Spinner size='md' /> : null
	const arrowIcon = useBreakpointValue({
		sm: <ArrowForwardIcon verticalAlign='super'/>,
	})
	const bondButtonWidth = useBreakpointValue({
		lg: '156px',
	})

	const Stage = () => {

		const [value, setValue] = useState(0)
		const [onPressTimeout, setOnPressTimeout] = useState(null)

		const inc = () => {
			setValue(prevState => Number(prevState + 1))
			setOnPressTimeout(setTimeout(inc, 105))
		}

		const dec = () => {
			if (value <= 1) {
				setValue(0)
			}
			else {
				setValue(prevState => (prevState >= 1 ? prevState - 1 : 0))
				setOnPressTimeout(setTimeout(dec, 105))
			}
		}

		const stop = () => {
			clearTimeout(onPressTimeout)
			setOnPressTimeout(null)
		}

		return (
			<>
				<Heading textStyle='h2' size='sm'>How much would you like to deposit?</Heading>
				<Text as='i'>Deposit doesn&apos;t affect lock up.</Text>
				<Heading textStyle='h4' size='xs'>Amount</Heading>
				<Flex flexWrap='wrap'>
					<HStack width='100%'
						maxWidth='313px'
						marginBottom='1rem'>
						<Text as='span'>ESD</Text>
						<Img minWidth='32px' height='32px'
							 alt={`${props.data.name} Collateral Icon`}
							 src={`
							 svg/tokens/${props.data.collateral[1]
								 ? props.data.collateral[1]
								 : props.data.collateral[0]}/index.svg
									`}
						/>
						<Input variant='filled'
							   marginRight='0.5rem'
							   overflow='hidden'
							   value={value}
							   onChange={(event) => setValue(event.target.value)}
						/>
					</HStack>
					<HStack width='100%'
						maxWidth='313px'
						paddingRight='0.5rem'
						marginBottom='1rem'>
						<Button onMouseDown={dec} onMouseUp={stop} onMouseLeave={stop}>-</Button>
						<Button onMouseDown={inc} onMouseUp={stop} onMouseLeave={stop}>+</Button>
						<Button>Max</Button>
						{approved &&
							<Button flex='1'
								rightIcon={arrowIcon}
								isLoading={staging}
								loadingText='Depositing'
								onClick={() => {
									setStaging(true)
								}}
							>
							Deposit
							</Button>
						}
						{!approved &&
							<Button flex='1'
								rightIcon={arrowIcon}
								isLoading={approving}
								loadingText='Approving'
								onClick={() => {
									setApproving(true)
								}}
							>
								Approve
							</Button>
						}
					</HStack>
				</Flex>
			</>
		)
	}

	const Bond = () => (
		<>
			<Heading textStyle='h2' size='lg'>Deposit and Bond</Heading>
			<Text align='justify'>You are about to deposit and bond ESD token in to the Empty Set Dollar DAO.
					Performing either bond or unbond lock up your token for a <b>15 epochs</b>.
					Bonded tokens must be unbonded before can be withdrawn.
					You can not take any action before the lockup expires.
					You will be not able to deposit or withdraw if lockup has not yet expired.
			</Text>
			<Heading textStyle='h2' size='sm'>Bonded token do not always receive rewards.</Heading>
			<Text align='justify'>ESD rewards for the DAO occur when the Time Weighted Average Price (TWAP)
				is over $1.00 during an epoch, and coupon redemption has been credited.</Text>
			<Stage />
			<Heading textStyle='h2' size='sm'>Would you like to bond your tokens now?</Heading>
			<Text as='i'>Bond locks token for 15 epochs.</Text>
			<Flex maxWidth={bondButtonWidth}
				  margin='0.7rem 0'
			>
				<Button flex='1'
					isLoading={bonding}
					loadingText='Bonding'
					rightIcon={arrowIcon}
					onClick={() => setBonding(true)}
				>
					Bond
				</Button>
			</Flex>
		</>
	)

	return (
		<>
			<Heading textStyle='h2' size='lg' marginBottom='0.7rem'>{props.data.name}</Heading>
			<p style={{ marginBottom: '2rem' }}>Bond your tokens in the Empty Set Dollar DAO to gain rewards.</p>

			<Steps current={current}
				   className={'test'}
				   padding='0 0.33rem'
			>
				<Step title='Deposit and Bond'
					  description={'Bonding is the act of locking your token in order to gain rewards.'} />
				<Step title='Hold'
					  icon={iconHold}
					  description={'You will be able to withdraw once lockup expires.'} />
				<Step title='Collect'
					  description={'Get your token back along with the accrued reward.'}
					  style={{ maxWidth: '227px' }}/>
			</Steps>

			<ContentBox>
				{current === 0 &&
					<Bond />
				}
				{current === 1 &&
					<Bond />
				}
				{current === 2 &&
					<Bond />
				}
			</ContentBox>
		</>
	)
}

export default Index
