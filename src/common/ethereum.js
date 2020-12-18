import { ethers } from 'ethers'
import humanStandardTokenAbi from '../abi/humanStandardTokenAbi'

const getERC20Allowance = async (tokenAddress, walletAddress, spenderAddress, provider) => {
	const contract = new ethers.Contract(
		tokenAddress,
		humanStandardTokenAbi,
		provider,
	)
	return await contract.allowance(walletAddress, spenderAddress)
}

export { getERC20Allowance }
