// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20VotableToken is IERC20 {
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;

    function buyTokens() external payable;

    function sellTokens(uint256 amount) external payable;

    function getPastVotes(address account, uint256 blockNumber) external returns (uint256);
}
