const defaults = {}

defaults.api = {}
defaults.api.esd = {}
defaults.api.esd = 'https://cors-anywhere.herokuapp.com/https://esd.tools/api/'

defaults.network = {}
defaults.network.chainId = 1
defaults.network.connectors = undefined

defaults.contracts = {}
defaults.contracts.esd = '0x36F3FD68E7325a35EB768F1AedaAe9EA0689d723'
defaults.contracts.root = '0x443D2f2755DB5942601fa062Cc248aAA153313D3'
defaults.contracts.usdc = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

defaults.toast = {}
defaults.toast.duration = 5000

defaults.layout = {}
defaults.layout.width = '768px'

export default defaults
