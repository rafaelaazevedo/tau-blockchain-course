pragma solidity >=0.4.22 <0.8.0;

contract Voting {
    address[16] public locations;

    function vote(uint256 locationId) public returns (uint256) {
        require(locationId >= 0 && locationId <= 15);

        locations[locationId] = msg.sender;

        return locationId;
    }

    function getLocations() public view returns (address[16] memory) {
        return locations;
    }
}
