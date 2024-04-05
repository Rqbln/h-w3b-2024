// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Message {
    string private message;

    constructor() {
        message = "jus de solana";
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
