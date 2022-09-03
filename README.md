# Decentralized Todo List

In order to test this specific todo list application you will need an ARCHIVE_NODE endpoint from Alchemy
or another infura provider. Get an api key and create an app with an endpoint to a forked mainnet. Any user that interacts with this contract has the ability to store lists mapped to their personal wallet address.

## Setting Up Environment

1. Obtain dependencies from package.json:

```shell
npm install
```

2. Compile contract and run test(s):

```shell
npx hardhat compile && npx hardhat test
```

3. Start sending RPC requests to archive node:

```shell
npx hardhat node
```

4. Deploy the contract:

```shell
npx hardhat run scripts/deploy.ts --network localhost
```

There are three wallets included in `runner.ts` each with the ability to add their own todo items to their list. Before interactions can occur you must add the 'Todos' contract address to the DEPLOYED_ADDRESS environment variable and add the Alchemy API key to the ARCHIVE_NODE envioronment variable.

5. Interact with the contract:

```shell
npx hardhat run scripts/runner.ts --network localhost
```

the main function within `runner.ts` can be imagined as the REMIX tooling for interacting with a smart contract. Test the contract by adding, completing and updating items by attaching to the contract address and interacting with its functions.

## More Help

```shell
npx hardhat help
```

[Try Alchemy!](https://www.alchemy.com/)
