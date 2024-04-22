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
git clone https://github.com/sonthanhngo/fundraising-smartcontract && cd fundraising-smart contract
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

Visit the page at https://localhost:3030
