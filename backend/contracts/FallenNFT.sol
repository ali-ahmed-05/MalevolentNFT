// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "@rarible/royalties/contracts/LibPart.sol";
import "@rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "./interfaces/IMalevolent.sol";
import "hardhat/console.sol";

contract FallenNFT is IMalevolent, ERC721 , Ownable ,RoyaltiesV2Impl {
    using Counters for Counters.Counter;
     using Strings for uint256;
      Counters.Counter private _tokenIds;
       address public auction;

        uint256 private _maxSupply = 2;//4901;

        uint256 private rarity1 = 1;//1 
       

        uint256 public rarity1_limit = 3;//2450;//1
        
        
    
        uint256[] _allTokens;

    
    mapping(address => bool) private _owner;
    mapping(address => uint256) public addressMintedBalance;
    mapping(uint256 => uint256) public nftType;
     // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

     // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    

     mapping(uint256 => uint256) private _allTokensIndex;
    //,address pubSale
    constructor(address _presale) ERC721("Malevolent", "ML") {
        _owner[_msgSender()] = true;
        _owner[_presale] = true;  
    }

    function setAuctionAddress(address _auction) public onlyOwner {
        require(_auction != address(0),"please add valid address");
        auction = _auction;
    }

    

    function baseURI() public view returns(string memory){
        string memory _uri = "https://ipfs.io/ipfs/QmdZzz5vtgXMeYKKfYi795hze1GdMfxbyP4CLDFy4MUXEz/";
        return _uri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        
        // string memory base = baseURI();
        // string memory _tokenURI = string(abi.encodePacked(base, toString(tokenId)));

        // // If there is no base URI, return the token URI.
        // if (bytes(base).length == 0) {
        //     return _tokenURI;
        // }
        // // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        // if (bytes(_tokenURI).length > 0) {
        //     return string(abi.encodePacked(_tokenURI, ".json"));
        // }

        //return super.tokenURI(tokenId);
        return "https://ipfs.io/ipfs/QmXPot2syTnmAm7sNfc5a894cicU6ebSNGPpM2FMeZyWZL?filename=2.json";
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function maxSupply() public override view returns(uint256){
        return _maxSupply;
    }
   

    function addOwner(address owner_) public {
        require(_owner[_msgSender()]==true,"cannot Assign owner");
        _owner[owner_]=true;
    }

    

    function createToken(address account) public override returns(uint) {
        require(_owner[_msgSender()]==true,"Not authorized to mint"); //must uncomment
        require(_tokenIds.current() < maxSupply() ,"all NFTs Minted");
        
        _tokenIds.increment();
        uint256 newItemId = inc_nftType();

        _mint(account, newItemId);
        
        
        return newItemId;
    }

     //returns the total number of Nfts minted from this contract
    function totalSupply() public override view returns(uint256){
        return _tokenIds.current();
    }

    function getTime() private view returns(uint256){
        return block.timestamp;
    }


    function inc_nftType() private returns(uint256){
        require(rarity1<rarity1_limit,"all fallen angels minted");
        return rarity1++;
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256) {
        require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    function tokenByIndex(uint256 index) public view virtual  returns (uint256) {
        require(index <= maxSupply(), "ERC721Enumerable: global index out of bounds");
        return _allTokens[index];
    }

      function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = ERC721.balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

     function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }


    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            _addTokenToAllTokensEnumeration(tokenId);
        } else if (from != to) {
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }
        if (to == address(0)) {
            _removeTokenFromAllTokensEnumeration(tokenId);
        } else if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }
    }

   
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721.balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function AirDrop(address account) public onlyOwner {
        createToken(account);
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    //configure royalties for Rariable
    function setRoyalties(uint _tokenId, address payable _royaltiesRecipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }


    //configure royalties for Mintable using the ERC2981 standard
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
      //use the same royalties that were saved for Rariable
      LibPart.Part[] memory _royalties = royalties[_tokenId];
      if(_royalties.length > 0) {
        return (_royalties[0].account, (_salePrice * _royalties[0].value) / 10000);
      }
      return (address(0), 0);
    }

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if(interfaceId == _INTERFACE_ID_ERC2981) {
          return true;
        }

        return super.supportsInterface(interfaceId);
    }

}