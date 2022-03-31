// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NFT is ERC721 , Ownable{
    using Counters for Counters.Counter;
     using Strings for uint256;
      Counters.Counter private _tokenIds;

       uint256 public maxSupply = 5260;

        uint256 public rarity1 = 1;//1 BRAVETY 0.035
        uint256 public rarity2 = 84;//2 SPEECHLESS 0.035
        uint256 public rarity3 = 147;//3 DRAGONS COLLECTIBLE
        //ELEPHANTS
        uint256 public rarity4 = 493;//4 ELEPHANTS 0.035
        uint256 public rarity5 = 596;//4/1 ELEPHANTS GOES TO SCHOOL 0.02
        uint256 public rarity6 = 647;//4/2 ELEPHANTS WINKLESS 0.019
        uint256 public rarity7 = 713;//4/3 ELEPHANTS FULL BODY 0.18
        uint256 public rarity8 = 873;//4/4 ELEPHANTS THE KING 0.022
        uint256 public rarity9 = 954;//4/5 ELEPHANTS SUNGLASSES 0.010

        uint256 public rarity10 = 1065;//5 VISERION (DRAGONS) 0.075
        uint256 public rarity11 = 1421;//6 VISERION DRAGONS CHARACTER
        uint256 public rarity12 = 1482;//7 ALWAYS IN MY HEAD 0.025
        //CRYPTO QUACK
        uint256 public rarity13 = 1543;//8_1 CRYPTO QUACK 1 0.012
        uint256 public rarity14 = 1577;//8_2 CRYPTO QUACK 2 0.012
        uint256 public rarity15 = 1613;//8_3 CRYPTO QUACK 3 0.012
        uint256 public rarity16 = 1703;//8_4 CRYPTO QUACK 4 0.012
        uint256 public rarity17 = 1769;//8_5 CRYPTO QUACK 5 0.012
        uint256 public rarity18 = 1859;//8_6 CRYPTO QUACK 6 0.012
        uint256 public rarity19 = 1956;//8_7 CRYPTO QUACK 7 0.012
        uint256 public rarity20 = 2056;//8_8 CRYPTO QUACK 8 0.012
        uint256 public rarity21 = 2182;//8_9 CRYPTO QUACK 9 0.012
        uint256 public rarity22 = 2282;//8_10 CRYPTO QUACK 10 0.012
        uint256 public rarity23 = 2380;//8_11 CRYPTO QUACK 11 0.012
        uint256 public rarity24 = 2486;//8_12 CRYPTO QUACK 12 0.012
        //PUGS
        uint256 public rarity25 = 2579;//9_1 PUGS 1 0.013
        uint256 public rarity26 = 2712;//9_2 PUGS 2 0.013
        uint256 public rarity27 = 2950;//9_3 PUGS 3 0.013
        uint256 public rarity28 = 3043;//9_4 PUGS 4 0.013
        uint256 public rarity29 = 3149;//9_5 PUGS 5 0.013
        uint256 public rarity30 = 3256;//9_6 PUGS 6 0.013
        uint256 public rarity31 = 3357;//9_7 PUGS 7 0.013
        uint256 public rarity32 = 3406;//9_8 PUGS 8 0.013
        uint256 public rarity33 = 3496;//9_9 PUGS 9 0.013
        uint256 public rarity34 = 3526;//9_10 PUGS 10 0.013
        uint256 public rarity35 = 3584;//9_11 PUGS 11 0.013
         
        

        uint256 public rarity1_limit = 83;//1
        uint256 public rarity2_limit = 146;//2
        uint256 public rarity3_limit = 492;//3
        
        uint256 public rarity4_limit = 595;//4
        uint256 public rarity5_limit=646;//4/1
        uint256 public rarity6_limit=712;//4/2
        uint256 public rarity7_limit=872;//4/3
        uint256 public rarity8_limit=953;//4/4
        uint256 public rarity9_limit=1064;//4/5
        
        uint256 public rarity10_limit=1420;//5
        uint256 public rarity11_limit=1481;//6
        uint256 public rarity12_limit=1542;//7
        
        
        uint256 public rarity13_limit=1576;//8_1
        uint256 public rarity14_limit=1612;//8_2
        uint256 public rarity15_limit=1702;//8_3
        uint256 public rarity16_limit=1768;//8_4
        uint256 public rarity17_limit=1858;//8_5
        uint256 public rarity18_limit=1955;//8_6
        uint256 public rarity19_limit=2055;//8_7
        uint256 public rarity20_limit=2181;//8_8
        uint256 public rarity21_limit=2281;//8_9
        uint256 public rarity22_limit=2379;//8_10
        uint256 public rarity23_limit=2485;//8_11
        uint256 public rarity24_limit=2578;//8_12
        
        uint256 public rarity25_limit=2711;//9_1
        uint256 public rarity26_limit=2949;//9_2
        uint256 public rarity27_limit=3042;//9_3
        uint256 public rarity28_limit=3148;//9_4
        uint256 public rarity29_limit=3255;//9_5
        uint256 public rarity30_limit=3356;//9_6
        uint256 public rarity31_limit=3405;//9_7
        uint256 public rarity32_limit=3495;//9_8
        uint256 public rarity33_limit=3525;//9_9
        uint256 public rarity34_limit=3583;//9_10
        uint256 public rarity35_limit=3638;//9_11
        
        
        

     struct NftDetails{
        address[] owners;
        
    }

    uint256[] _allTokens;

    
    mapping(address => bool) private _owner;
    mapping(uint256=>NftDetails) private _NftDetails;
    mapping(address => uint256) public addressMintedBalance;
    mapping(uint256 => uint256) public nftType;
     // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

     // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _tokenIdType;

     mapping(uint256 => uint256) private _allTokensIndex;
//,address pubSale
    constructor() ERC721("Jarlath", "JR") {
        _owner[_msgSender()] = true;
        
    }

    function tokenType(uint256 id)public view returns(uint256){
        return _tokenIdType[id];
    }

    function baseURI() public view returns(string memory){
        // return "https://ipfs.io/ipfs/uyjkfuy";
        return "https://ipfs.io/ipfs/QmdZzz5vtgXMeYKKfYi795hze1GdMfxbyP4CLDFy4MUXEz/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        
        string memory base = baseURI();
        string memory _tokenURI = string(abi.encodePacked(base, toString(tokenId)));

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(_tokenURI, ".json"));
        }

        return super.tokenURI(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setNftDetails(uint256 _newItemId,address owner)private{
        _NftDetails[_newItemId].owners.push(owner);
        
    }

    function addOwner(address owner_) public {
        require(_owner[_msgSender()]==true,"cannot Assign owner");
        _owner[owner_]=true;
    }

    function getNftDetails(uint256 _tokenId)private view returns(NftDetails memory){
        return _NftDetails[_tokenId];
    }

        function createToken(address account,uint8 nftType) public returns(uint) {
        //require(_owner[_msgSender()]==true,"Not authorized to mint");
        require(_tokenIds.current() < 3638 ,"all NFTs Minted");
        //require(addressMintedBalance[account] < 5 , "You cannot have more than 5 NFTs");
        _tokenIds.increment();
        uint256 newItemId = inc_nftType(nftType);
        setNftDetails(newItemId,account);

        _mint(account, newItemId);
        
        _tokenIdType[newItemId]=nftType;
        addressMintedBalance[account]++;
        return newItemId;
    }

     //returns the total number of Nfts minted from this contract
    function totalSupply() private view returns(uint256){
        return _tokenIds.current();
    }

    function getTime() private view returns(uint256){
        return block.timestamp;
    }


    function inc_nftType(uint8 no) private returns(uint256){
            if(no==1){
                require(rarity1<rarity1_limit,"all Rare trains minted");
                
                return rarity1++;
            }else if(no==2){
                require(rarity2<rarity2_limit,"all Epic trains minted");
                
                return rarity2++;
            }else if(no==3){
                require(rarity3<rarity3_limit,"all Legendry trains minted");
               
                return rarity3++;
            }else if(no==4){
                require(rarity4<rarity4_limit,"all Common staions minted");
                
                return rarity4++;
            }else if(no==5){
                require(rarity5<rarity5_limit,"all Common staions minted");
                
                return rarity4++;
            }else if(no==6){
                require(rarity6<rarity6_limit,"all Mitic stations minted");
                
                return  rarity6++;
            }
            else if(no==7){
                require(rarity7<rarity7_limit,"all Mitic stations minted");
                
                return  rarity7++;
            }
            else if(no==8){
                require(rarity8<rarity8_limit,"all Mitic stations minted");
                
                return rarity8++;
            }
            else if(no==9){
                require(rarity9<rarity9_limit,"all Mitic stations minted");
                
                return rarity9++;
            }
            else if(no==10){
                require(rarity10<rarity10_limit,"all Mitic stations minted");
                
                return rarity10++;
            }
            else if(no==12){
                require(rarity12<rarity12_limit,"all Mitic stations minted");
                
                return rarity12++;
            }
            else if(no==13){
                require(rarity13<rarity13_limit,"all Mitic stations minted");
                
                return rarity13++;
            }
            else if(no==14){
                require(rarity14<rarity14_limit,"all Mitic stations minted");
                
                return rarity14++;
            }
            else if(no==15){
                require(rarity15<rarity15_limit,"all Mitic stations minted");
                
                return rarity15++;
            }
            else if(no==16){
                require(rarity16<rarity16_limit,"all Mitic stations minted");
                
                return rarity16++;
            }
            else if(no==17){
                require(rarity17<rarity17_limit,"all Mitic stations minted");
               
                return rarity17++;
            }
            else if(no==18){
                require(rarity18<rarity18_limit,"all Mitic stations minted");
                
                return rarity18++;
            }
            else if(no==19){
                require(rarity19<rarity19_limit,"all Mitic stations minted");
               
                return  rarity19++;
            }
            else if(no==20){
                require(rarity20<rarity20_limit,"all Mitic stations minted");
                
                return rarity20++;
            }
            else if(no==21){
                require(rarity21<rarity21_limit,"all Mitic stations minted");
                
                return rarity21++;
            }
            else if(no==22){
                require(rarity22<rarity22_limit,"all Mitic stations minted");
                
                return rarity22++;
            }
            else if(no==23){
                require(rarity23<rarity23_limit,"all Mitic stations minted");
                
                return rarity23++;
            }
            else if(no==24){
                require(rarity24<rarity24_limit,"all Mitic stations minted");
               
                return  rarity24++;
            }
            else if(no==25){
                require(rarity25<rarity25_limit,"all Mitic stations minted");
                
                return rarity25++;
            }
            else if(no==26){
                require(rarity26<rarity26_limit,"all Mitic stations minted");
                
                return rarity26++;
            }
            else if(no==27){
                require(rarity27<rarity27_limit,"all Mitic stations minted");
                
                return rarity27++;
            }
            else if(no==28){
                require(rarity28<rarity28_limit,"all Mitic stations minted");
                
                return rarity28++;
            }
            else if(no==29){
                require(rarity29<rarity29_limit,"all Mitic stations minted");
                
                return rarity29++;
            }
            else if(no==30){
                require(rarity30<rarity30_limit,"all Mitic stations minted");
                
                return rarity30++;
            }
            else if(no==31){
                require(rarity31<rarity31_limit,"all Mitic stations minted");
                
                return rarity31++;
            }
            else if(no==32){
                require(rarity32<rarity32_limit,"all Mitic stations minted");
                
                return rarity32++;
            }
            else if(no==33){
                require(rarity33<rarity33_limit,"all Mitic stations minted");
                
                return rarity33++;
            }
            else if(no==34){
                require(rarity34<rarity34_limit,"all Mitic stations minted");
                
                return rarity34++;
            }
            else if(no==35){
                require(rarity35<rarity35_limit,"all Mitic stations minted");
                
                return rarity35++;
            }
            else{

                require(false,"Type not found");
            }
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256) {
        require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    function tokenByIndex(uint256 index) public view virtual  returns (uint256) {
        require(index <= maxSupply, "ERC721Enumerable: global index out of bounds");
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

    function AirDrop(string memory tokenURI , address account,uint8 nftType) public onlyOwner {
        createToken(account,nftType);
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


}