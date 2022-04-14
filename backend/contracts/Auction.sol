// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./interfaces/IMalevolent.sol";
import "hardhat/console.sol";



contract Auction is Context , Ownable, ERC721Holder{


     bool public start;

     uint256 public basePrice;
        // Highest bidder
     address public highestBidder;
        // Highest bid (in wei)
     uint256 public highestBid;
        // Duration (in seconds) of auction
     uint256 public endingUnix;
        // Time when auction started
     uint256 public startingUnix;
        // To check if the auction has ended
     bool public ended;

     address public nft;

     address public _wallet;

     uint256 public blocksPerDay = 6647;

// Represents an auction on an NFT
    struct AuctionDetails {
        // Current owner of NFT
        address payable seller;
        // Price (in wei) at beginning of auction
        uint256 basePrice;
        // Highest bidder
        address highestBidder;
        // Highest bid (in wei)
        uint256 highestBid;
        // Duration (in seconds) of auction
        uint256 endingUnix;
        // Time when auction started
        uint256 startingUnix;
        // To check if the auction has ended
        bool ended;
          
    }

    struct Bid {
        
        // Bidders amount
        uint256 amount;
        // Time
        uint256 biddingUnix;
    }

    // Mappings

    // Array of auctions for a token
    mapping (address => mapping(uint256 => AuctionDetails)) private tokenIdToAuction;
    // BidsPayedPerToken
    mapping (address =>  uint256) payedBids;
    // Array of bids in an auction
    mapping( address => Bid) private auctionBids;
    // Allowed withdrawals for who didnt win the bid
    mapping(address => uint256) private pendingReturns;




    // Events

    function setNFTaddress(address _nft) public onlyOwner {
        require(_nft != address(0),"please add valid address");
        nft = _nft;
    }

    function setPaymentaddress(address __wallet) public onlyOwner {
        require(__wallet != address(0),"please add valid address");
        _wallet = __wallet;
    }
    
    function setBlocksPerDay(uint256 _blocks) public onlyOwner {
        blocksPerDay = _blocks;
    }

    function startAuction(uint256 _basePrice, uint256 _days ) public onlyOwner{

        require(IERC721(nft).ownerOf(5) == address(this) , "NFT not found");
        
        require(_days  > 0, "The ending unix should be greater than 0"); // for 1 block
        start = true;
        basePrice = _basePrice;
        endingUnix = block.number + (_days * blocksPerDay);
        startingUnix = block.number;

    }
    
    

    function getPendingReturns()public view returns(uint256){
        return pendingReturns[msg.sender];
    }

    function withdraw() public payable {  // msg.sender -> address in parameter
        require(_checkAuctionStatus(), "Auction has ended");
        require(_msgSender() != highestBidder , "no pending value");
        require(payedBids[_msgSender()] > 0 , "no pending value");

        uint256 amount = payedBids[_msgSender()];
         
        address payable receiver =payable(_msgSender());
        delete payedBids[_msgSender()];
        receiver.transfer(amount);
    } 


    function bid() public payable { // msg.sender -> address parameter
        
        require(_checkAuctionStatus()==false , "Auction has ended");
        

         

         uint256 amount = payedBids[_msgSender()];
        
         require (highestBid <  msg.value + amount && basePrice<=msg.value + amount ,"Please send more funds");
        
         payedBids[_msgSender()]=amount + msg.value;
         
         amount = payedBids[_msgSender()];
         
         highestBid = amount;
         highestBidder = _msgSender();
         auctionBids[_msgSender()].amount = amount;
         auctionBids[_msgSender()].biddingUnix = block.number;
        

    }

    function _checkAuctionStatus() public view returns(bool){
                  
     if(block.number > endingUnix){
        return true; // end it at the conclusion    
     }else {
         return false; 
     }
      }

    function concludeAuction() payable public {
    
    require(_checkAuctionStatus()," Auction Time remaining ");
    require(_msgSender() == highestBidder || _msgSender() == owner()," caller is not the owner ");

     uint256 payment = highestBid * 1 wei;
     IERC721(nft).transferFrom(address(this), highestBidder , IMalevolent(nft).rarity2_()+1);
     payable(address(_wallet)).transfer(payment);

    }
}