import { extendTheme } from '@chakra-ui/react'
import typeface from './typeface'
import typography from './typography'

const overrides = {
	styles: {
		global: {
			typeface,
		},
	},
	textStyles: typography,
}

export default extendTheme(overrides)
