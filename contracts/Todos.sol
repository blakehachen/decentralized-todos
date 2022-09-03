//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todos {
  
  struct Todo {
    string text;
    bool completed;
  }

  
  mapping(address => Todo[]) public todos;
  
  /* Adds item to list in contract memory */
  function create(string calldata _text) public {

    Todo memory todo;
    todo.text = _text;
      //.completed = false default

    todos[msg.sender].push(todo);
  }

  /* Gets item from list in contract storage */
  function get(uint _index) public view returns (string memory text, bool completed) {
    Todo storage todo = todos[msg.sender][_index];
    return (todo.text, todo.completed);
  }

  /* Gets the length of the list in contract storage */
  function getLength() public view returns (uint) {
    return todos[msg.sender].length;
  }

  /* Updates text of item in list at specific index within the contract storage */
  function updateText(uint _index, string calldata _text) public {
      Todo storage todo = todos[msg.sender][_index];
      todo.text = _text;
  }

  /* Marks item in list as completed */
  function toggleCompleted(uint _index) public {
      Todo storage todo = todos[msg.sender][_index];
      todo.completed = !todo.completed;
  }

}