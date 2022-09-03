import { ethers } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

type Todo = {
  text: string;
  completed: boolean;
};

async function main() {
  const Todos = await ethers.getContractFactory("Todos");
  const DEPLOYED_ADDRESS: string | undefined =
    process.env.DEPLOYED_ADDRESS?.toString();
  let contractAddr: string =
    typeof DEPLOYED_ADDRESS === "undefined" ? "" : DEPLOYED_ADDRESS;

  /* Address specific to mainnet fork for deployed contract Todos */
  const [owner, addr1, addr2] = await ethers.getSigners();
  const todos = Todos.attach(contractAddr);

  let todoList0: [...Todo[]] = [];
  let todoList1: [...Todo[]] = [];
  let todoList2: [...Todo[]] = [];

  console.log("Creating todos...\n");

  /* Add item to list and get new length (interacts with contract abi) 
     Interact with multiple wallets todo lists by manipulating contract
     functions
  */

  await todos.create("Create a new DAO");
  //await todos.toggleCompleted(1);
  const todoListLength0 = (await todos.getLength()).toBigInt();

  await todos.connect(addr1).create("Learn Solidity");
  //await todos.connect(addr1).toggleCompleted(2);
  const todoListLength1 = (await todos.connect(addr1).getLength()).toBigInt();

  await todos.connect(addr2).create("Volunteer firefighting");
  //await todos.connect(addr2).toggleCompleted(3);
  const todoListLength2 = (await todos.connect(addr2).getLength()).toBigInt();

  /* Loop through Contract todos and add to local array */
  await pushTodos(todos, todoListLength0, todoList0);
  await pushTodos(todos.connect(addr1), todoListLength1, todoList1);
  await pushTodos(todos.connect(addr2), todoListLength2, todoList2);

  /* Print todos */
  await printTodos(todoList0, owner.address);
  await printTodos(todoList1, addr1.address);
  await printTodos(todoList2, addr2.address);

  /* Gets the contract address for attachment purposes */
  console.log("Todo List contract address: ", todos.address);
}

async function printTodos(list: [...Todo[]], addr: string) {
  console.log(`${addr} todo list:`);
  list.forEach((element, index) => {
    let status: string = !element.completed ? "" : "DONE";
    console.log(`${index + 1}. ${element.text}\t ${status}`);
  });
  console.log("\n");
}

async function pushTodos(contract: any, length: bigint, to: [...Todo[]]) {
  for (let i = 0; i < length; i++) {
    const item = await contract.get(i).catch((error: Error) => {
      console.error(error);
      process.exitCode = 1;
    });
    const itemTodo: Todo = { text: item.text, completed: item.completed };
    to.push(itemTodo);
  }
}

/* User async and await pattern for error handling */
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
