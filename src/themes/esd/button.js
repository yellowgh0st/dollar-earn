export default {
	baseStyle: {
		lineHeight: '0px',
	},
	variants: {
		solid: props => ({
			bg: props.colorMode === 'dark' ? 'accent.light' : 'accent.dark',
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
}

