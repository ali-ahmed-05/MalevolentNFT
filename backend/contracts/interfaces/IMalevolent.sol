// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

interface IMalevolent {
    function createToken(address account) external returns(uint);
    function maxSupply() external view returns(uint256);
    function totalSupply() external view returns(uint256);
}