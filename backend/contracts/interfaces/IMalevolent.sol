// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

interface IMalevolent {
    function createToken(address account,uint8 nftType) external returns(uint);
    function maxSupply() external view returns(uint256);
    function rarity1_() external view returns(uint256);
    function rarity2_() external view returns(uint256);
    function rarity2_startlimit_() external view returns(uint256);
}