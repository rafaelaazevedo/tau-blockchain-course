pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestVoting {
    Voting voting = Voting(DeployedAddresses.Voting());

    uint256 expectedLocationId = 8;

    address expectedVotedLocation = address(this);

    function testUserCanVoteLocation() public {
        uint256 returnedId = voting.vote(expectedLocationId);

        Assert.equal(
            returnedId,
            expectedLocationId,
            "User was able to vote for the expected location and expectedVotedLocation should match what is returned."
        );
    }

    function testGetVotedLocationAddressByLocationId() public {
        address location = voting.locations(expectedLocationId);

        Assert.equal(
            location,
            expectedVotedLocation,
            "Voted Location of the expected location should be this contract"
        );
    }

    function testGetVotedLocationAddressByLocationIdInArray() public {
        address[16] memory locations = voting.getLocations();

        Assert.equal(
            locations[expectedLocationId],
            expectedVotedLocation,
            "Voted location of the expected location should be this contract"
        );
    }
}
