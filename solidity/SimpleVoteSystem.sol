pragma solidity ^0.8.0;

contract Voting {
    // Structure pour représenter un candidat
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Tableau pour stocker les candidats
    Candidate[] public candidates;

    // Mapping pour stocker si une adresse a voté
    mapping(address => bool) public voters;

    // Ajouter un candidat au système de vote
    function addCandidate(string memory name) public {
        candidates.push(Candidate(name, 0));
    }

    // Voter pour un candidat
    function vote(uint candidateIndex) public {
        require(!voters[msg.sender], "You have already voted");
        require(candidateIndex < candidates.length, "Invalid candidate index");

        voters[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;
    }
}
