import web3 from './web3'

const address = "0xa3a24A01Ee3fE47D6DFc9dA32023fcEC8c412294"
const ABI = [
    {
        "inputs":[],
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "inputs":[],
        "name":"enter",
        "outputs":[],
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "inputs":[],
        "name":"getPlayers",
        "outputs":[{
            "internalType":"address[]",
            "name":"",
            "type":"address[]"
        }],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "name":"manager",
        "outputs":[{
            "internalType":"address",
            "name":"",
            "type":"address"
        }],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "name":"pickWinner",
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
        "name":"players",
        "outputs":[{
            "internalType":"address",
            "name":"",
            "type":"address"
        }],
        "stateMutability":"view",
        "type":"function"
    }]

export default  new web3.eth.Contract(ABI,address);
