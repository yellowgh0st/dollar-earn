import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
	Heading, Grid, Flex, Stat, StatLabel, StatNumber, Tag, Button, useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'

export const PoolCards = (props) => {

	PoolCards.propTypes = {
		fetch: PropTypes.string.isRequired,
	}

	const [pools, setPools] = useState({})
	const [loading, setLoading] = useState(true)

	const [columns, setColumns] = useState(0)
	const templateColumns = useBreakpointValue({
		base: 'repeat($1, 1fr)',
		xs: 'repeat(1, 1fr)',
		md: `repeat(${columns}, 1fr)`,
	})
	const cardPadding = useBreakpointValue({
		base: '0.4rem 3.2rem 2.1rem',
		xs: '0.4rem 3.2rem 2.1rem',
		md: '2.4rem 3.2rem 5.1rem',
	})

	const background = useColorModeValue('#E0DEFF', '#00D661')
	const color = useColorModeValue('#231f20', '#000000')

	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(props.fetch, {
				headers: {
					'Access-Control-Allow-Origin' : '*',
				},
			})
			setPools(data)
			setLoading(false)
		}
		fetch()
		setColumns(2)
	}, [])

	return (
		<Grid
			minHeight='435px'
			m='0px auto 1.2rem auto'
			templateColumns={templateColumns}
			gap={{ base: 33.5, sm: 33.5, lg: 67 }}
		>
			{!loading &&
				<>
					{pools.data.map((pool, index) => {
						return (
							<Flex key={index}
								  flexDirection='column'
								  borderRadius='43px'
								  p={cardPadding}
								  bg={background}
								  style={{ cursor: 'pointer' }}
							>
								<Heading textStyle='h2'
										 size='lg'
										 color={color}>
									{pool.name}
								</Heading>
								<Stat>
									<StatLabel textStyle='body'
											   color={color}
									>Total value locked</StatLabel>
									<StatNumber textStyle='body'
										color={color}
										fontSize={{ base: 'xs', sm: 'lg', lg: 'xl' }}>
										{prettifyCurrency(pool.totalValueLockedInUSD)}
									</StatNumber>
								</Stat>
								<Tag size='md'
									 fontSize='1.1rem'
									 fontWeight='600'
									 justifyContent='flex-end'
									 alignItems='flex-start'
									 bg='transparent'
									 p='0'
									 color={color}
								>
									<Button bg='transparent'
										_hover={{ bg: 'transparent' }}
										color={color}
										fontSize='1.2rem'
										fontWeight='600'
									>
										earn<span style={{ marginLeft: '7px' }}>⟶</span>
									</Button>
								</Tag>
							</Flex>
						)
					})}
				</>
			}
		</Grid>
	)
}
