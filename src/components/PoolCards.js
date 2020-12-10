import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Heading, Grid, GridItem, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'

export const PoolCards = (props) => {

	PoolCards.propTypes = {
		fetch: PropTypes.string.isRequired,
	}

	const [pools, setPools] = useState({})
	const [loading, setLoading] = useState(true)

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
	}, [])

	return (
		<Grid
			h='400px'
			m='0px auto 1.2rem auto'
			templateColumns='repeat(2, 1fr)'
			gap={{ base: 25, sm: 25, lg: 50 }}
		>
			{!loading &&
				<>
					{pools.data.map((pool, index) => {
						return (
							<GridItem key={index}
									  borderRadius='23px'
									  colSpan={1}
									  p='0 2.4rem'
									  bg='#EDF2F7'>
								<Heading textStyle='h2'size='md'>{pool.name}</Heading>
								<Stat>
									<StatLabel>Total value locked</StatLabel>
									<StatNumber>{prettifyCurrency(pool.totalValueLockedInUSD)}</StatNumber>
								</Stat>
							</GridItem>
						)
					})}
				</>
			}
		</Grid>
	)
}
