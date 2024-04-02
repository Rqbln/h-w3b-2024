pragma solidity ^0.8.0;

contract Owned {
    address public owner;

    // Constructeur : définit le propriétaire initial
    constructor() {
        owner = msg.sender;
    }

    // Modifieur pour restreindre l'accès aux fonctions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Permet au propriétaire actuel de transférer le contrôle
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
