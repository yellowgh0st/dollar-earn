module.exports = [
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'dollar',
				'type': 'address',
			},
			{
				'internalType': 'address',
				'name': 'univ2',
				'type': 'address',
			},
		],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'constructor',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'start',
				'type': 'uint256',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'Bond',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'Claim',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'Deposit',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'lessUsdc',
				'type': 'uint256',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'newUniv2',
				'type': 'uint256',
			},
		],
		'name': 'Provide',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'start',
				'type': 'uint256',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'newClaimable',
				'type': 'uint256',
			},
		],
		'name': 'Unbond',
		'type': 'event',
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'Withdraw',
		'type': 'event',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'balanceOfBonded',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'balanceOfClaimable',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'balanceOfPhantom',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'balanceOfRewarded',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'balanceOfStaged',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'dao',
		'outputs': [
			{
				'internalType': 'contract IDAO',
				'name': '',
				'type': 'address',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'dollar',
		'outputs': [
			{
				'internalType': 'contract IDollar',
				'name': '',
				'type': 'address',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [
			{
				'internalType': 'address',
				'name': 'account',
				'type': 'address',
			},
		],
		'name': 'statusOf',
		'outputs': [
			{
				'internalType': 'enum PoolAccount.Status',
				'name': '',
				'type': 'uint8',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'totalBonded',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'totalClaimable',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'totalPhantom',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'totalRewarded',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'totalStaged',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': true,
		'inputs': [],
		'name': 'univ2',
		'outputs': [
			{
				'internalType': 'contract IERC20',
				'name': '',
				'type': 'address',
			},
		],
		'payable': false,
		'stateMutability': 'view',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'deposit',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'withdraw',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'claim',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'bond',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'unbond',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
	{
		'constant': false,
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'value',
				'type': 'uint256',
			},
		],
		'name': 'provide',
		'outputs': [],
		'payable': false,
		'stateMutability': 'nonpayable',
		'type': 'function',
	},
]
