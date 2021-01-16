import { ethers } from 'ethers'
import humanStandardTokenAbi from '../abi/humanStandardTokenAbi'

const getERC20Allowance = async (tokenAddress, accountAddress, spenderAddress, provider) => {
	const contract = new ethers.Contract(
		tokenAddress,
		humanStandardTokenAbi,
		provider,
	)
	return await contract.allowance(accountAddress, spenderAddress)
}

const getDAOImplementation = async (address, provider) => {
	return ethers.utils.hexStripZeros(
		await provider.getStorageAt(
			address,
			'0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
			// bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
		))
}

const getERC20BalanceOf = async (tokenAddress, address, provider) => {
	const contract = new ethers.Contract(
		tokenAddress,
		humanStandardTokenAbi,
		provider,
	)
	return await contract.balanceOf(address)
}

const approveERC20 = async (tokenAddress, spenderAddress,
	amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	provider,
) => {
	const contract = new ethers.Contract(
		tokenAddress,
		humanStandardTokenAbi,
		provider.getSigner(0),
	)
	return await contract.approve(spenderAddress, amount)
}

export { getERC20Allowance, getDAOImplementation, getERC20BalanceOf, approveERC20 }
