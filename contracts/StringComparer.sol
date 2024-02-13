
pragma solidity >=0.4.16 <0.9.0;

library StringComparer {
    function compare(string memory str1, string memory str2) public pure returns (bool){
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}
