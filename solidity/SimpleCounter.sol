// Définit la version de Solidity
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count = 0;

    // Incrémente la valeur de count
    function increment() public {
        count += 1;
    }

    // Décrémente la valeur de count
    function decrement() public {
        require(count > 0, "Count is already zero");
        count -= 1;
    }
}
