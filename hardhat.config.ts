import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts: {
        initialIndex: 0,
      },
      mining: {
        mempool: {
          order: "fifo",
        },
      },
      gasPrice: 2000000000000,
      gas: 10000000,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ARCHIVE_NODE}`,
      },
    },
  },
};

export default config;
