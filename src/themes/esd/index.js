import { extendTheme } from '@chakra-ui/react'
import typeface from './typeface'
import typography from './typography'
import { mode } from '@chakra-ui/theme-tools'

const overrides = {
	styles: {
		global: props => ({
			body: {
				fontFamily: 'Body',
				bg: mode('#ffffff', '#231f20')(props),
			},
			typeface,
		}),
	},
	textStyles: typography,
}

export default extendTheme(overrides)
