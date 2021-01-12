import { ethers } from 'ethers'

const prettifyAddress = (address) => {
	return `${address.substring(0, 7)}...${address.substring(address.length - 4, address.length)}`
}

const prettifyCurrency = (amount, minFractionDigits = 0, maxFractionDigits = 2, currency = 'USD', locales = 'en-US') => {
	let symbol
	let cryptocurrency = false
	let options = {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: minFractionDigits,
		maximumFractionDigits: maxFractionDigits,
	}

	if (currency === 'ETH') {
		options = {
			style: 'decimal',
			minimumFractionDigits: minFractionDigits,
			maximumFractionDigits: maxFractionDigits,
		}
		symbol = 'Ξ'
		cryptocurrency = true
	}

	const currencyValue = new Intl.NumberFormat(locales, options)

	return (cryptocurrency ? `${currencyValue.format(amount)}${String.fromCharCode(160)}${symbol}` : currencyValue.format(amount))
}

const prettifyNumber = (amount, minFractionDigits = 0, maxFractionDigits = 0, locales = 'en-US') => {
	const options = {
		minimumFractionDigits: minFractionDigits,
		maximumFractionDigits: maxFractionDigits,
	}
	const value = isFinite(amount) ? amount : 0
	return (new Intl.NumberFormat(locales, options).format(value))
}

const getPercentage = (amount, minFractionDigits = 0, maxFractionDigits = 2, locales = 'en-US') => {
	const options = {
		style: 'percent',
		minimumFractionDigits: minFractionDigits,
		maximumFractionDigits: maxFractionDigits,
	}
	const value = isFinite(amount) ? amount : 0
	return (new Intl.NumberFormat(locales, options).format(value))
}

const getPoolLocation = (collateralA = '', collateralB = '') => {
	return `/${collateralA}${collateralB ? `&${collateralB}` : ''}`
}

const getDaoImplementation = async (address, provider) => {
	return ethers.utils.hexStripZeros(
		await provider.getStorageAt(
			address,
			'0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
			// bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
		))
}

export { prettifyAddress, prettifyCurrency, prettifyNumber, getPercentage, getPoolLocation, getDaoImplementation }
