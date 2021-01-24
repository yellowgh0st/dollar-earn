import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
	getERC20Allowance, getERC20BalanceOf, approveERC20, depositDAO, bondDAO, getBalanceOfStaged,
	getBalanceOfBonded, getDaoStatusOf,
} from '../../common/ethereum'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'
import defaults from '../../common/defaults'
import {
	Heading, Spinner, Flex, HStack, Button,
	Input, Text, Img, useBreakpointValue, useToast,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { ContentBox } from '../../components/ContentBox'
import { Steps } from '../../components/Steps'
import { BalanceContext } from '../../components/BalanceIndicator'

const Index = (props) => {

	Index.propTypes = {
		data: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	const wallet = useWallet()
	const { Step } = Steps
	const { stagedBalance, bondedBalance, setStagedBalance, setBondedBalance } = useContext(BalanceContext)
	const [current, setCurrent] = useState(undefined)
	const [status, setStatus] = useState(undefined)

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getBalanceOfStaged(
				defaults.contracts.root,
				wallet.account,
				provider,
			).then(n => setStagedBalance(n))
		}
		return () => setStagedBalance(ethers.BigNumber.from('0'))
	}, [wallet.account])

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getBalanceOfBonded(
				defaults.contracts.root,
				wallet.account,
				provider,
			).then(n => setBondedBalance(n))
		}
		return () => setBondedBalance(ethers.BigNumber.from('0'))
	}, [wallet.account])

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getDaoStatusOf(
				wallet.account,
				provider,
			).then(n => setStatus(n))
		}
		return () => setStatus(0)
	}, [wallet.account])

	useEffect(() => {
		if (wallet.account) {
			if (status === 0) setCurrent(0)
			if (status === 0 && bondedBalance.gt(0)) setCurrent(1)
			if (status === 1 && bondedBalance.eq(0)) setCurrent(2)
		}
		return () => setCurrent(undefined)
	}, [wallet.account, status, bondedBalance])

	const iconUnbond = current === 1 && status > 0 ? <Spinner size='md' /> : null

	return (
		<>
			<Heading textStyle='h2' size='lg' marginBottom='0.7rem'>{props.data.name}</Heading>
			<p style={{ marginBottom: '3.2rem' }}>Bond your tokens in the Empty Set Dollar DAO to gain rewards.</p>

			<Steps current={current}
				   padding='0 0.33rem'
			>
				<Step title='Deposit and Bond'
					  description={'Bonding is the act of locking your token in order to gain rewards.'} />
				<Step title='Unbond'
					  icon={iconUnbond}
					  description={'Unbond your token to make it available for withdrawal.'} />
				<Step title='Withdraw'
					  description={'Get your token back along with the accrued reward.'}
					  style={{ maxWidth: '227px' }}/>
			</Steps>

			<ContentBox>
				{!wallet.account &&
						<Bond data={props.data} stagedBalance={stagedBalance} status={status} />
				}
				{wallet.account &&
					<>
						{current === 0 &&
							<Bond data={props.data} stagedBalance={stagedBalance} status={status} />
						}
						{current === 1 &&
							<Unbond />
						}
						{current === 2 &&
							<Withdraw />
						}
					</>
				}
			</ContentBox>
		</>
	)
}

const Bond = (props) => {

	Bond.propTypes = {
		data: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
		stagedBalance: PropTypes.any,
		status: PropTypes.number,
	}

	const wallet = useWallet()
	const toast = useToast()

	const [bonding, setBonding] = useState(false)

	const arrowIcon = useBreakpointValue({
		sm: <ArrowForwardIcon verticalAlign='super'/>,
	})
	const bondButtonWidth = useBreakpointValue({
		lg: '156px',
	})

	return (
		<>
			<Heading textStyle='h2' size='lg'>Deposit and Bond</Heading>
			<Text align='justify'>You&apos;re about to deposit and bond ESD token in to the Empty Set Dollar DAO.
				Performing either bond or unbond lock up your token for a <b>15 epochs</b>.
				Bonded tokens must be unbonded before can be withdrawn.
				You can not take any action before the lockup expires.
				You&apos;ll be not able to deposit or withdraw if lockup has not yet expired.
			</Text>
			<Heading textStyle='h2' size='sm'>Bonded token do not always receive rewards.</Heading>
			<Text align='justify'>ESD rewards for the DAO occur when the Time Weighted Average Price (TWAP)
				is over $1.00 during an epoch, and coupon redemption has been credited.</Text>
			<Stage data={props.data} status={props.status}/>
			<Heading textStyle='h2' size='sm'>Would you like to bond your tokens now?</Heading>
			<Text as='i'>Bond locks all tokens for 15 epochs.</Text>
			<Flex maxWidth={bondButtonWidth}
				  margin='0.7rem 0'
			>
				<Button flex='1'
					isLoading={bonding}
					loadingText='Bonding'
					rightIcon={arrowIcon}
					onClick={() => {
						if (wallet.account) {
							if (props.stagedBalance > 0) {
								setBonding(true)
								const provider = new ethers.providers.Web3Provider(wallet.ethereum)
								bondDAO(
									props.stagedBalance,
									provider,
								).then((tx) => {
									tx.wait().then(() => {
										setBonding(false)
										toast(bondingSuccess)
									}).catch(() => {
										toast(bondingFailed)
										setBonding(false)
									})
								}).catch((err) => {
									if (err.code === 4001) {
										toast(denied)
									}
									else {
										toast(bondingFailed)
									}
									setBonding(false)
								})
							}
							else if (props.status === 1) {
								toast(notFrozenOrLocked)
							}
							else {
								toast(stagedBalanceLow)
							}
						}
						else {
							toast(walletNotConnected)
						}
					}}
				>
					Bond
				</Button>
			</Flex>
		</>
	)
}

const Stage = (props) => {

	Stage.propTypes = {
		data: PropTypes.object.isRequired,
		loading: PropTypes.bool,
		error: PropTypes.object,
		status: PropTypes.number,
	}

	const wallet = useWallet()
	const toast = useToast()
	const [esdBalance, setEsdBalance] = useState(0)
	const [value, setValue] = useState(0)
	const [approved, setApproved] = useState(true)
	const [approving, setApproving] = useState(false)
	const [staging, setStaging] = useState(false)
	const [onPressTimeout, setOnPressTimeout] = useState(null)

	const arrowIcon = useBreakpointValue({
		sm: <ArrowForwardIcon verticalAlign='super'/>,
	})

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getERC20Allowance(
				defaults.contracts.esd,
				wallet.account,
				defaults.contracts.root,
				provider,
			).then(
				n => {
					if (!BigInt(n) > BigInt(0)) setApproved(false)
				})
		}
		return () => setApproved(true)
	}, [wallet.account])

	useEffect(() => {
		if (wallet.account) {
			const provider = new ethers.providers.Web3Provider(wallet.ethereum)
			getERC20BalanceOf(
				defaults.contracts.esd,
				wallet.account,
				provider,
			).then(
				n => setEsdBalance(n),
			)
		}
		return () => setEsdBalance(0)
	}, [wallet.account])

	const inc = () => {
		setValue(prevState => Number(prevState + 1))
		setOnPressTimeout(setTimeout(inc, 200))
	}

	const dec = () => {
		if (value <= 1) {
			setValue(0)
		}
		else {
			setValue(prevState => (prevState >= 1 ? prevState - 1 : 0))
			setOnPressTimeout(setTimeout(dec, 200))
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
						   fontWeight='bold'
						   value={value}
						   onChange={(event) => setValue(event.target.value)}
					/>
				</HStack>
				<HStack width='100%'
					maxWidth='313px'
					paddingRight='0.5rem'
					marginBottom='1rem'>
					<Button onMouseDown={dec}
						onTouchStart={dec}
						onMouseUp={stop}
						onTouchEnd={stop}
						onMouseLeave={stop}
					>-</Button>
					<Button onMouseDown={inc}
						onTouchStart={inc}
						onMouseUp={stop}
						onTouchEnd={stop}
						onMouseLeave={stop}
					>+</Button>
					<Button onClick={() => {
						if (wallet.account) {
							setValue(ethers.utils.formatEther(esdBalance))
						}
						else {
							toast(walletNotConnected)
						}
					}}>Max</Button>
					{approved &&
						<Button flex='1'
							rightIcon={arrowIcon}
							isLoading={staging}
							loadingText='Depositing'
							onClick={() => {
								if (wallet.account) {
									if (value > 0) {
										setStaging(true)
										const provider = new ethers.providers.Web3Provider(wallet.ethereum)
										depositDAO(
											ethers.utils.parseEther(String(value)),
											provider,
										).then((tx) => {
											tx.wait().then(() => {
												setStaging(false)
												setValue(0)
												toast(stagingSuccess)
												getERC20BalanceOf(
													defaults.contracts.esd,
													wallet.account,
													provider,
												).then(
													n => setEsdBalance(n),
												)
											}).catch(() => {
												toast(stagingFailed)
												setStaging(false)
											})
										}).catch((err) => {
											if (err.code === 4001) {
												toast(denied)
											}
											else if (err.error.code === -32603) {
												if (props.status === 1) {
													toast(notFrozenOrLocked)
												}
												else {
													toast(balanceLow)
												}
											}
											else {
												toast(stagingFailed)
											}
											setStaging(false)
										})
									}
									else {
										toast(noDepositValue)
									}
								}
								else {
									toast(walletNotConnected)
								}
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
								const provider = new ethers.providers.Web3Provider(wallet.ethereum)
								approveERC20(
									defaults.contracts.esd,
									defaults.contracts.root,
									undefined,
									provider,
								).then((tx) => {
									tx.wait().then(() => {
										setApproved(true)
										setApproving(false)
										toast(approvalSuccess)
									}).catch(() => {
										setApproving(false)
										toast(approvalFailed)
									})
								}).catch((err) => {
									if (err.code === 4001) {
										toast(denied)
									}
									else {
										toast(approvalFailed)
									}
									setApproving(false)
								})
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

const Unbond = () => {
	return (
		<>
			<Heading textStyle='h2' size='lg'>Unbond</Heading>
			<Text align='justify'>To make your token available for withdrawal, you&apos;ll need to unbond it first.
				Since your lockup has not expired yet you aren&apos;t able do it. Please come back later.</Text>
			<Text align='justify'>..or do you just want to bond again?</Text>
		</>
	)
}

const Withdraw = () => {
	return (
		<>
			<Heading textStyle='h2' size='lg'>Withdraw</Heading>
			<Text align='justify'>..or do you just want to deposit more or bond again?</Text>
		</>
	)
}


const walletNotConnected = {
	title: 'Wallet not connected',
	description: 'You have to connect your Ethereum wallet first.',
	status: 'warning',
	duration: defaults.toast.duration,
	isClosable: true,
}

const denied = {
	title: 'Transaction denied',
	description: 'You have denied submitting the transaction.',
	status: 'warning',
	duration: defaults.toast.duration,
	isClosable: true,
}

const approvalSuccess = {
	title: 'Successfull approval',
	description: 'You have enabled ESD for spending.',
	status: 'success',
	duration: defaults.toast.duration,
	isClosable: true,
}

const approvalFailed = {
	title: 'Approval failed',
	description: 'ESD was not approved for spending.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const noDepositValue = {
	title: 'No amount specified',
	description: 'You have not specified amount to deposit.',
	status: 'warning',
	duration: defaults.toast.duration,
	isClosable: true,
}

const balanceLow = {
	title: 'Not enough balance',
	description: 'ESD balance on your wallet is not enough.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const stagedBalanceLow = {
	title: 'No ESD deposited',
	description: 'There is nothing to bond in the DAO pool.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const notFrozenOrLocked = {
	title: 'Lockup not yet expired',
	description: 'You can not take this action until lockup expires.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const stagingFailed = {
	title: 'Deposit failed',
	description: 'ESD was not deposited in to the DAO.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const stagingSuccess = {
	title: 'Successfull deposit',
	description: 'You have deposited ESD in to the DAO.',
	status: 'success',
	duration: defaults.toast.duration,
	isClosable: true,
}

const bondingFailed = {
	title: 'Bond failed',
	description: 'ESD was not bonded. Lockup remains unaffected.',
	status: 'error',
	duration: defaults.toast.duration,
	isClosable: true,
}

const bondingSuccess = {
	title: 'Successfull bond',
	description: 'You have bonded ESD. Lockup increased by 15 epochs.',
	status: 'success',
	duration: defaults.toast.duration,
	isClosable: true,
}

export default Index
