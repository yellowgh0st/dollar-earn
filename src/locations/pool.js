import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import defaults from '../common/defaults'
import { Box, Fade, Text } from '@chakra-ui/react'

const Pool = (props) => {

	Pool.propTypes = {
		data: PropTypes.object.isRequired,
		path: PropTypes.string,
		loading: PropTypes.bool,
		error: PropTypes.object,
	}

	const Dialog = React.lazy(() => import('../dialogs' + props.path))

	return (
		<Box maxW={defaults.layout.width} m='0 auto'>
			<Fade in={true}>
				<Suspense fallback={
					<Text align='center'>Loading...</Text>
				}>
					<Dialog data={props.data} loading={props.loading} error={props.error} />
				</Suspense>
			</Fade>
		</Box>
	)
}

export default Pool
