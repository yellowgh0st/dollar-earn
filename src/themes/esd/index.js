import { extendTheme } from '@chakra-ui/react'
import typography from './typography'
import { mode } from '@chakra-ui/theme-tools'

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
}

export default extendTheme(overrides)
