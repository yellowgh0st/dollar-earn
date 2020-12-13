import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import typography from './typography'
import colors from './colors'

const overrides = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
	styles: {
		global: props => ({
			body: {
				fontFamily: 'Body',
				bg: mode('#ffffff', '#231f20')(props),
			},
		}),
	},
	textStyles: typography,
	colors: colors,
}

export default extendTheme(overrides)
