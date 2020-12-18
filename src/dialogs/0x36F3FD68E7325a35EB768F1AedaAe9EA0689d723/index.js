import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Heading, Spinner, Flex, useNumberInput, HStack, Button,
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

	const { Step } = Steps
	const [current] = useState(2)
	const iconHold = current === 1 ? <Spinner size='md' /> : null

	const [value, setValue] = useState(0)

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
		step: 1,
		defaultValue: 0,
		min: 0,
		precision: 2,
	})

	const inc = getIncrementButtonProps()
	const dec = getDecrementButtonProps()
	const input = getInputProps({
		isReadOnly: false,
	})

	const bondIcon = useBreakpointValue({
		sm: <ArrowForwardIcon />,
	})

	return (
		<>
			<Heading textStyle='h2' size='lg' marginBottom='0.7rem'>{props.data.name}</Heading>
			<p style={{ marginBottom: '2rem' }}>Bond your tokens in the Empty Set Dollar DAO to gain rewards.</p>

			<Steps current={current}
				   className={'test'}
				   padding='0 0.33rem'
			>
				<Step title='Bond' description={'Bonding is the act of locking your token in order to gain rewards.'} />
				<Step title='Hold' icon={iconHold} description={'You will be able to withdraw once lockup expires.'} />
				<Step title='Collect' description={'Get your token back along with the accrued reward.'} style={{ maxWidth: '227px' }}/>
			</Steps>

			<ContentBox>
				<Heading textStyle='h3' size='lg'>Bond</Heading>
				<Text align='justify'>You are about to bond ESD token in the Empty Set Dollar DAO. These tokens are going to be locked up for a <b>15 epochs</b>.
				Once they are bonded, they will become non-transferable and you will be not able to retrieve them back before the lockup expires.
				You will be also not able to increase the amount of tokens for bonding before the expiry.
				</Text>
				<Heading textStyle='h3' size='sm'>Bonded token do not always receive rewards.</Heading>
				<Text align='justify'>ESD rewards for the DAO occur when the Time Weighted Average Price (TWAP) is over $1.00&nbsp;USDC during an epoch, and coupon redemption has been credited.</Text>
				<Heading textStyle='h3' size='sm'>How much would you like to bond?</Heading>
				<Heading textStyle='h4' size='xs'>Amount</Heading>
				<Flex flexWrap='wrap'>
					<HStack width='100%'
						maxWidth='313px'
						marginBottom='1rem'>
						<Text as='span'>ESD</Text>
						<Img height='32px'
							 alt={`${props.data.name} Collateral Icon`}
							 src={`
					 svg/tokens/${props.data.collateral[1]
								 ? props.data.collateral[1]
								 : props.data.collateral[0]}/index.svg
							`}
						/>
						<Input variant='filled'
							   marginRight='0.5rem'
							   value={value}
							   onChange={(e) => setValue(e.target.value)}
							   {...input}
						/>
					</HStack>
					<HStack width='100%'
						maxWidth='313px'
						paddingRight='0.5rem'
						marginBottom='1rem'>
						<Button {...dec}>-</Button>
						<Button {...inc}>+</Button>
						<Button>Max</Button>
						<Button flex='1'
							rightIcon={bondIcon}>
							Bond
						</Button>
					</HStack>
				</Flex>
			</ContentBox>
		</>
	)
}

export default Index