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
	components: {
		Button: {
			variants: {
				solid: props => ({
					bg: props.colorMode === 'dark' ? '#5757ff' : '#b4b4fd',
					_hover: {
						bg: props.colorMode === 'dark' ? '#6161ff' : '#a1a1fd',
					},
					_active: {
						bg: props.colorMode === 'dark' ? '#7070ff' : '#c7c7fc',
					},
					_disabled: {
						bg: 'transparent',
					},
				}),
			},
		},
		Input: {
			variants: {
				filled: props => ({
					field: {
						bg: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.13)' : 'rgb(179 179 179)',
						_hover: {
							bg: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgb(168 168 168)',
						},
						_focus: {
							bg: props.colorMode === 'dark' ? 'rgba(21, 21, 21, 0.23)' : 'rgb(255, 255, 255)',
						},
					},
				}),
			},
		},
	},
}

export default extendTheme(overrides)
