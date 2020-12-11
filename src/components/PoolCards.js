import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
	Heading, Grid, Fade, Flex, Stat, StatLabel, StatNumber, Tag, Button, useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'

export const PoolCards = (props) => {

	PoolCards.propTypes = {
		pools: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	const [columns] = useState(2)
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
	const cardMinHeight = useBreakpointValue({
		base: '0',
		xs: '0',
		md: '435px',
	})

	const background = useColorModeValue('#E0DEFF', '#00D661')
	const color = useColorModeValue('#231f20', '#000000')

	return (
		<>
			{!props.loading &&
				<Fade in={true}>
					<Grid
						m='0px auto 1.2rem auto'
						templateColumns={templateColumns}
						gap={{ base: 36.5, sm: 84 }}
					>					{props.pools.map((pool, index) => {
							return (
								<Link to={`${pool.collateral[0]}/${pool.collateral[1]}`} key={index}>
									<Flex
										flexDirection='column'
										borderRadius='43px'
										p={cardPadding}
										bg={background}
										minH={cardMinHeight}
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
											>earn<span style={{ marginLeft: '7px' }}>⟶</span>
											</Button>
										</Tag>
									</Flex>
								</Link>
							)
						})}
					</Grid>
				</Fade>
			}
		</>
	)
}
