import { ethers } from "hardhat";
import { expect } from "chai";

describe("Todos", function () {
  /* Tests to make sure addresses maintain separate todolists */
  it("Should be able to add todo items to mapping.", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Todos = await ethers.getContractFactory("Todos");
    const todos = await Todos.deploy();

    /* Account0 test todo list functionality */
    const beforeAdd0 = (await todos.getLength()).toNumber();
    await todos.create("test0");
    const afterAdd0 = (await todos.getLength()).toNumber();
    expect(beforeAdd0 + 1).to.equal(afterAdd0);
    expect((await todos.get(0)).text).to.equal("test0");
    expect((await todos.get(0)).completed).to.equal(false);

    /* Account1 test todo list functionality */
    const beforeAdd1 = (await todos.connect(addr1).getLength()).toNumber();
    await todos.connect(addr1).create("test1");
    const afterAdd1 = (await todos.connect(addr1).getLength()).toNumber();
    expect(beforeAdd1 + 1).to.equal(afterAdd1);
    expect((await todos.connect(addr1).get(0)).text).to.equal("test1");
    expect((await todos.connect(addr1).get(0)).completed).to.equal(false);
  });
});
