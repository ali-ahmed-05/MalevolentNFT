// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AuctionV1 is Context , Ownable{


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

     address public paymentContract;

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



     constructor(){
        transferOwnership(_msgSender());
     }

    // Events

    function setNFTaddress(address _nft) public onlyOwner {
        require(_nft != address(0),"please add valid address");
        nft = _nft;
    }

    function setPaymentaddress(address _paymentContract) public onlyOwner {
        require(_paymentContract != address(0),"please add valid address");
        paymentContract = _paymentContract;
    }

    function startAuction(uint256 _basePrice, uint256 _endingUnix ) public onlyOwner{
        require(IERC721(nft).ownerOf(4901) == address(this) , "NFT not found");
        require(_endingUnix - block.timestamp >= 20, "The ending unix should be atleast 5 minutes from now"); // for 1 block
        start = true;
        basePrice = _basePrice;
        endingUnix = block.timestamp + _endingUnix;
        startingUnix = block.timestamp;
    }

    
    function _updateStatus() public {      //private

     require(ended == false,"This auction has Ended");
    
     if(block.timestamp > endingUnix){
        ended = true; // end it at the conclusion
        //require(false , "the auction has ended"); 
      //  _returnBids(_nftContract,_tokenId);
     }
    }

    function canSell(address _nftContract,uint256 _tokenId) public view onlyOwner returns(bool) {      //private

     AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
    
     if(block.timestamp > auction.endingUnix){
         return true;
     }
     else 
     return false;
    }



    function getLastTime(address _nftContract ,uint256 _tokenId) public view returns(uint){
        AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
        return auction.endingUnix;
    }

    function getCurrentTime()public view returns(uint256){
        return block.timestamp;
    }

    function _returnBids(address _nftContract,uint256 _tokenId) private {
        
        Bid[] memory _bid = auctionBids[_nftContract][_tokenId];
        AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
                
        for(uint256 i=0;i<=_bid.length-1;i++){
            if(_bid[i].amount != auction.highestBid ){
            pendingReturns[_bid[i].bidder] += payedBids[_bid[i].bidder][_nftContract][_tokenId];
            }
        }
    }
    
    function getHighestBid(address _nftContract,uint256 _tokenId)public view returns(uint256){

        AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
        return auction.highestBid;

    }
    function getHighestBidder(address _nftContract,uint256 _tokenId)public view returns(address){

        AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
        return auction.highestBidder;

    }
    
    function getAuctionEnded(address _nftContract,uint256 _tokenId)public returns(bool){

        AuctionDetails memory auction= tokenIdToAuction[_nftContract][_tokenId];
        _updateStatus(_nftContract,_tokenId);
        return auction.ended;

    }

    function getPendingReturns()public view returns(uint256){
        return pendingReturns[msg.sender];
    }

    function withdraw() public payable {  // msg.sender -> address in parameter
       
        require(pendingReturns[msg.sender] > 0 , "No Tokens pending");

        uint256 amount = pendingReturns[msg.sender];
        address payable receiver =payable(msg.sender);

        receiver.transfer(amount);
    } 


    function bid() public payable { // msg.sender -> address parameter
         require(ended == false , "Auction has ended");

         _updateStatus();

         if(block.timestamp < endingUnix){ 

         uint256 amount = payedBids[_msgSender()];
        
         require (highestBid <  msg.value + amount && basePrice<=msg.value + amount ,"Please send more funds");
        
         payedBids[_msgSender()]=amount + msg.value;
         amount = payedBids[_msgSender()];
         
         highestBid = amount;
         highestBidder = msg.sender;
         auctionBids[_msgSender()].amount = amount;
         auctionBids[_msgSender()].biddingUnix = block.timestamp;

         }               
    }

    function _checkAuctionStatus(uint256 _tokenId, address _nftContract) public view returns(bool){
                  
     if(block.timestamp > endingUnix){
        return true; // end it at the conclusion    
     }else {
         return false; 
     }
      }

    function concludeAuction(uint256 _tokenId, address _nftContract,address _msgSender) payable public {

    AuctionDetails memory auction = tokenIdToAuction[_nftContract][_tokenId];
    
    require(endingUnix < block.timestamp," Auction Time remaining ");

    ended = _checkAuctionStatus(_tokenId,_nftContract);

    
    
    uint256 payment = auction.highestBid * 1 wei;
    // ERC721(auction.nftContract).transferFrom(address(this), auction.highestBidder , _tokenId);
     address(payable(paymentContract)).transfer(payment);

    }
}