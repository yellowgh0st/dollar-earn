import React from 'react'
import PropTypes from 'prop-types'
import RcSteps, { Step } from 'rc-steps'
import styled from '@emotion/styled'
import { useColorModeValue } from '@chakra-ui/react'
import '../assets/css/rcicon.css'

export const Steps = (props) => {

	Steps.propTypes = {
		current: PropTypes.number,
		direction: PropTypes.string,
		children: PropTypes.any,
	}

	const accent = useColorModeValue('black', 'white')
	console.log(accent)

	const direction = () => {
		let flexDirection = 'row'
		if (props.direction === 'vertical') flexDirection = 'column'
		return flexDirection
	}

	const StepsComponent = styled(RcSteps)`
		width: 100%;
		display: flex;
		margin-bottom: 2rem;
		flex-direction: ${direction};
		& .rc-steps-item:nth-child(n+2) {
			margin-left: 16px;
		}
		& .rc-steps-item:last-child {
			width: auto;
			flex: none;
			.rc-steps-item-icon {
				float: left;
			}
		}
		& .rc-steps-item:nth-last-child(n+2) .rc-steps-item-container {
			width: 100%;
			display: flex;
		}	
		& .rc-steps-item:nth-last-child(n+2) .rc-steps-item-content {
			& .rc-steps-item-title::after {
				background: #f0f0f0;
				position: absolute;
				top: 11px;
				left: 93px;
				display: block;
				width: 100%;
				height: 1px;
				content: "";
			}
		}
		& .rc-steps-item.rc-steps-item-finish:nth-last-child(n+2) {
			.rc-steps-item-icon {
    			border-color: black;
    			color: white;
    			background: black;
    			font-size: 16px;
    		}
			.rc-steps-item-content {
				.rc-steps-item-title::after {
					background: black;
				}
			}
		}	
  		.rc-steps-item-active {
  			.rc-steps-item-title {
  				font-weight: bold;
  			}	
  			.rc-steps-item-icon {
  				background: #dedede;
  			}
  		}
  		.rc-steps-item-custom .rc-steps-item-icon {
  			border: transparent;
    		background: transparent;
  		}
	`

	return (
		<StepsComponent {...props} />
	)

}

Steps.defaultProps = {
	current: 0,
	direction: 'horizontal',
}

Steps.Step = RcSteps.Step

Steps.Step = styled(Step)`
	width: 100%;
	position: relative;
    display: inline-block;
    flex: 1;
    overflow: hidden;
    vertical-align: top;

    .rc-steps-item-icon {
    	margin-right: 6px;
    	width: 32px;
    	height: 32px;
    	margin: 0 8px 0 0;
    	font-size: 13px;
	    line-height: 29px;
   		text-align: center;
    	border: 1px solid rgba(0,0,0,.25);
    	border-radius: 32px;
    }    
`
