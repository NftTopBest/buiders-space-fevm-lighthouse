// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Negentropy is ERC20, Pausable, Ownable {
    IERC20 public paytoken;
    uint public costvalue;

    constructor(IERC20 _paytoken, uint _costvalue) ERC20("Negentropy", "NS") {
        paytoken = _paytoken;
        costvalue = _costvalue;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function updateCurrency(IERC20 _paytoken, uint _costvalue) public onlyOwner {
        paytoken = _paytoken;
        costvalue = _costvalue;
    }

    function mint(address to, uint amount) public payable whenNotPaused {
        require(amount > 0);
        if (msg.sender != owner()) {
            require(msg.value == costvalue * amount, "Not enough balance to complete transaction.");

            bool sentRz = paytoken.transferFrom(msg.sender, address(this), costvalue * amount);
            require(sentRz, "Token transfer failed");
        }

        _mint(to, amount);
    }

    function faucetMint(address to, uint amount) public whenNotPaused {
        _mint(to, amount);
    }

    function withdraw(IERC20 _token) public onlyOwner {
        _token.transfer(msg.sender, _token.balanceOf(address(this)));
    }
}
