// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMalevolent.sol";
import "hardhat/console.sol";



contract NFTCrowdsale is Context, ReentrancyGuard,Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // The token being sold
    IERC20 private _token;
    address private nft;
    address private nft_angel;
    address private nft_guardian;
    // Address where funds are collected
    address payable private _wallet;
    address payable public _manager;
    address public auction;

    uint256 public startTime;
    uint256 public blocksPerDay = 6647;
    uint256 private _rate;
    uint256 private limit = 4;//600;
    uint256 public whitePrice = 0.1 ether;
    uint256 public pubPrice = 0.2 ether;
    

    // Amount of wei raised
    uint256 private _weiRaised;
    uint256 private _nftPurchased;
    bool public success;
    bool public finalized;
    bool public pub;


    
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    
    
    mapping (address => uint256) purchase;
    mapping (address => uint256) msgValue;
    uint256 current = block.timestamp * 1 seconds;
    uint256 limitationtime = block.timestamp + 7776000   * 1 seconds;
    mapping(address => bool) private _whitelist;
   
    function setAngelNFTaddress(address _nft)public onlyOwner{
        require(_nft !=address(0),"invalid address");
        nft_angel = _nft;
    }

    function setGuardNFTaddress(address _nft)public onlyOwner{
        require(_nft !=address(0),"invalid address");
        nft_guardian = _nft;
    }

    function setBlocksPerDay(uint256 _blocks) public onlyOwner {
        blocksPerDay = _blocks;
    }

    function setAuctionAddress(address _auction) public onlyOwner {
        require(_auction != address(0),"please add valid address");
        auction = _auction;
    }

    
    function startSale(address[] memory accounts, address payable wallet_ ) public onlyOwner { //once
        require(startTime == 0 , "already started");
        require(accounts.length > 0 ,"add whitelist accounts");
        require(wallet_ !=address(0),"invalid address");
        require(nft_angel != address(0),"set nft address");
            pub = false;
            for (uint256 i = 0; i < accounts.length; i++) {
                _addPayee(accounts[i]);
            }
        _wallet = wallet_;
        startTime = block.number;
    }
 
    fallback () external payable {
        buyNFT(1);
    }

    receive () external payable {
        buyNFT(1);
    }


    /**
     * @return the address where funds are collected.
     */
    function wallet() public view returns (address payable) {
        return _wallet;
    }

    /**
     * @return the number of token units a buyer gets per wei.
     */
    function rate() public view returns (uint256) {
        return _rate;
    }

    /**
     * @return the amount of wei raised.
     */
    function weiRaised() public view returns (uint256) {
        return _weiRaised;
    }

    function startPublisSale() private {
        if(block.number > startTime + blocksPerDay){
            pub = true;
        }
    }

    
    
    function buyNFT(uint8 _nftType) public nonReentrant payable {
        uint256 price;
        startPublisSale();
        if(!pub){
            check_nftTypeCount(_nftType);
            require (_whitelist[_msgSender()] == true,"you are not whitelisted");
            require(_nftPurchased < limit ,"All nft Sold");
            price = whitePrice;
        }
        else{
            require (!finalized,"Sale Ended");
            price = pubPrice;
            Finalize();
        }
        uint256 weiAmount = msg.value;
        require (weiAmount ==  price,"please provide exact amount for one NFT");

        IMalevolent(get_nftTypeAddress(_nftType)).createToken(_msgSender());

        startAuction();
        _nftPurchased ++;

        purchase[_msgSender()]++;
        _weiRaised = _weiRaised.add(weiAmount);
        _wallet.transfer(weiAmount);   
    }

    function Finalize() private returns(bool) {
        if(_nftPurchased>2){
        if(pub && totalSupply() == _nftPurchased-1){
           
            finalized = true;
        }}
        return finalized;
    }

    function _addPayee(address account) private {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        _whitelist[account]=true; 
    }

    function check_nftTypeCount(uint8 no) view  private {
            if(no==1){
                console.log(IMalevolent(get_nftTypeAddress(no)).totalSupply());
                require(IMalevolent(get_nftTypeAddress(no)).totalSupply()<1,"all fallen angels minted");
            }else if(no==2){
                console.log(IMalevolent(get_nftTypeAddress(no)).totalSupply());
                require( IMalevolent(get_nftTypeAddress(no)).totalSupply()< 1,"all guardian angels minted");
            }
            else{
                require(false,"Type not found");
            }
    }

    function get_nftTypeAddress(uint8 no) view  private returns(address temp_nft) {
            if(no==1){
                temp_nft = nft_angel;
            }else if(no==2){
                temp_nft = nft_guardian;
                }
            else{
                require(false,"Type not found");
            }
    }

    function startAuction() private {
        if(totalSupply() == maxSupply()){
                IMalevolent(get_nftTypeAddress(2)).createToken(auction);
        }
    }

    function totalSupply() public view returns(uint256 supply){
         supply = IMalevolent(nft_angel).totalSupply() + IMalevolent(nft_guardian).totalSupply(); 
    }

    function maxSupply() public view returns(uint256 supply){
         supply = IMalevolent(nft_guardian).maxSupply() - 1 ; 
    }
      
}