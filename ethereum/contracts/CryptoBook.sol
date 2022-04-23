// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract ContactFactory{
    mapping(address => address) public ownerToContact;

    modifier onlyNewRecords(){
        require(ownerToContact[msg.sender] == address(0), "You already leave your contact!");
        _;
    }

    function createContact(string memory _telegram, string memory _discord) public onlyNewRecords {
        Contact contact = new Contact(msg.sender, _telegram, _discord);
        ownerToContact[msg.sender] = address(contact);
    }

    function createContact(string memory _telegram) public onlyNewRecords {
        Contact contact = new Contact(msg.sender, _telegram, "");
        ownerToContact[msg.sender] = address(contact);
    }
}

contract Contact{
    address public owner;
    string public telegram;
    string public discord;
    string public desc;

    constructor (address _owner, string memory _telegram, string memory _discord){
        owner = _owner;
        telegram = _telegram;
        discord = _discord;
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "You are not an owner!!!");
        _;
    }

    function setTelegram(string memory _telegram) public onlyOwner {
        telegram = _telegram;
    }

    function setDiskord(string memory _discord) public onlyOwner {
        discord = _discord;
    }

    function setDesc(string memory _desc) public onlyOwner {
        desc = _desc;
    }






}

