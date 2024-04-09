// SPDX-License-Identifier: MIT
// Ce contrat intelligent SimpleStorage permet de stocker et récupérer une valeur uint256.

pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
