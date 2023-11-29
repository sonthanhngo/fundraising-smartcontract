// SPDX-License-Identifier: UNLICENSE
pragma solidity >=0.8.2 <0.9.0;

contract Fundraising {
    // Contract owner
    address private admin;

    constructor(){
        admin = msg.sender;
    }

    // modifier onlyAdmin(){
    //     require(msg.sender == admin);
    //     _;
    // }
    // Contract data

    struct Campaign {
        string id;
        address owner;
        string ownerName;
        string title;
        string description;
        uint256 target;
        uint256 timeCreated;
        uint256 deadline;
        uint256 amountCollected;
        string[] images;
    }

    struct Donation{
        address owner;
        address[] donators;
        uint256[] donations;
        uint256[] donationsTime;
    }


    mapping(uint256 => Campaign) private campaigns;
    mapping(uint256 => Donation) private donations;

    // Contract statistics
    uint256 private totalCampaigns = 0;
    uint256 private totalDonations = 0;
    uint256 private totalDonators = 0; 

    // Get contract statistics
    function getStatistics() public view returns (uint256 ,uint256,uint256){
        return (totalCampaigns,totalDonations,totalDonators);
    }
    // Create campaign
    function createCampaign(string memory _id, address _address, string memory _ownerName, string memory _title, string memory _description, uint256 _target, uint256 _timeCreated, uint256 _deadline, string[] memory _images) public {
        Campaign storage campaign = campaigns[totalCampaigns];

        campaign.id = _id;
        campaign.owner = _address;
        campaign.ownerName = _ownerName;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.timeCreated = _timeCreated;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        for(uint i = 0; i < _images.length; i++) {
            campaign.images.push(_images[i]);
        }

        Donation storage donation = donations[totalCampaigns];
        donation.owner = _address;

        totalCampaigns = totalCampaigns + 1;   
    }


    function donateToCampaign(uint256 _id,uint256 _amount) public payable {
        uint256 amount = _amount;    
        Campaign storage campaign = campaigns[_id];
        Donation storage donation = donations[_id];

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
            totalDonations = totalDonations + amount;
            totalDonators = totalDonators + 1;
            donation.donators.push(msg.sender);
            donation.donations.push(amount);
            donation.donationsTime.push(block.timestamp);
        }
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns);
        for(uint i = 0; i < totalCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaign;
        }
        return allCampaigns;
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory allDonations = new Donation[](totalCampaigns);
        for(uint i = 0; i < totalCampaigns; i++) {
            Donation storage donation = donations[i];
            allDonations[i] = donation;
        }
        return allDonations;
    }
    
    function getCampaignById(uint256 _id) public view returns (Campaign memory) {
        return campaigns[_id];
    }

    function getDonationById(uint256 _id) public view returns (Donation memory) {
        return donations[_id];
    }

}