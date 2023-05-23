var PULSEX_FACTORY_ABI = require('./abi/factory.json');
var PULSEX_POOL_ABI = require('./abi/pool.json');
var PULSEX_ROUTER_ABI = require('./abi/router.json');

var config = {
    PULSEX_ROUTER_ADDRESS : "0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7",
    PULSEX_FACTORY_ADDRESS : "0xFf0538782D122d3112F75dc7121F61562261c0f7",
    PULSEX_WPLS_ADDRESS : "0x70499adEBB11Efd915E3b69E700c331778628707",

    PULSEX_ROUTER_ABI : PULSEX_ROUTER_ABI,
    PULSEX_FACTORY_ABI : PULSEX_FACTORY_ABI,
    PULSEX_POOL_ABI: PULSEX_POOL_ABI,

    HTTP_PROVIDER_LINK : "https://rpc.v4.testnet.pulsechain.com",
    WEBSOCKET_PROVIDER_LINK : "wss://rpc.v4.testnet.pulsechain.com",
};

export default config;