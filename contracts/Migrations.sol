// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Migrations {
  address public user = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == user,
      "This function is restricted to the contract's user"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
