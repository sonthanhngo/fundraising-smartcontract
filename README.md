# Fundraising platform using smart contract

## How to run

Create your own Sepolia account using [MetaMask](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn).

Request Sepolia Ethers via [Sepolia Faucet](https://www.infura.io/faucet/sepolia) for paying transaction in the Sepolia network.

Install [NodeJS](https://github.com/nvm-sh/nvm).

Install Yarn:

```
corepack enable
```

Clone the repository:

```
git clone https://github.com/sonthanhngo/fundraising-smartcontract && cd fundraising-smartcontract
```

Install front-end dependencies and run:

```
cd client && yarn
yarn dev
```

Install back-end dependencies and run:

```
cd server && yarn
yarn start:dev
```

Back-end secret in `backend/.env`

Visit the page: https://localhost:5173

## How to set up the project from scratch

Create your own free MongoDB instance using [MongoDB Atlas Cloud Database](https://www.mongodb.com/atlas/database).

Create ThirdWeb account for publishing smart contract to network [ThirdWeb](https://thirdweb.com/dashboard).

Modify contract code in `smartcontract/contracts/Contract.sol`

Publish smart contract to Sepolia Testnet: `yarn deploy`
