// SPDX-License-Identifier: UNLICENSE
pragma solidity >=0.8.2 <0.9.0;

contract Fundraising {
    // Contract owner
    address private admin;

    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }
    // Contract data

    uint256 private numberOfCampaigns = 0;

    enum Status{ NON_VERIFIED, WAITING, VERIFIED }

    struct Campaign {
        address owner;
        string ownerName;
        Status verified;
        string title;
        string description;
        uint256 target;
        uint256 timeCreated;
        uint256 deadline;
        uint256 amountCollected;
        string[] images;
        address[] donators;
        uint256[] donations;
    }
    mapping(uint256 => Campaign) private campaigns;

    // Contract statistics
    uint256 private totalCampaignsVerified = 0;
    uint256 private totalDonations = 0;
    uint256 private totalDonators = 0; 

    // Get contract statistics
    function getStatistics() public view returns (uint256 ,uint256,uint256){
        return (totalCampaignsVerified,totalDonations,totalDonators);
    }
    // Create campaign
    function createCampaign(string memory _ownerName, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string[] memory _image) public{
        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = msg.sender;
        campaign.ownerName = _ownerName;
        campaign.verified = Status.WAITING;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.timeCreated = block.timestamp;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        for(uint i = 0; i < _image.length; i++) {
            campaign.images.push(_image[i]);
        }
        numberOfCampaigns = numberOfCampaigns + 1;  
    }


    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;    
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
            totalDonations = totalDonations + amount;
            totalDonators = totalDonators + 1;
        }
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function getCampaignById(uint256 _id) public view returns (Campaign memory) {
        return campaigns[_id];
    }
    
    function acceptCampaign(uint256 _id) public onlyAdmin{
        campaigns[_id].verified = Status.VERIFIED;
        totalCampaignsVerified += 1;
    }

    function declineCampaign(uint256 _id) public onlyAdmin{
        campaigns[_id].verified = Status.NON_VERIFIED;
    }
}