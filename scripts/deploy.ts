import { ethers } from "hardhat";

/* Uncomment for fork reset 
import { network } from "hardhat";
import dotenv from "dotenv";
dotenv.config()
*/

async function main() {
  //Resets mainnet fork---------------------------------------------------------------
  /*
  await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl:
              `https://eth-mainnet.g.alchemy.com/v2/${process.env.ARCHIVE_NODE}`,
          },
        },
      ],
    });
  }
  */
  const CONTRACT_NAME = "Todos";
  const Todos = await ethers.getContractFactory(CONTRACT_NAME);
  const todos = await Todos.deploy();
  await todos.deployed();

  console.log(
    `Contract '${CONTRACT_NAME}' deployed at address: ${todos.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
