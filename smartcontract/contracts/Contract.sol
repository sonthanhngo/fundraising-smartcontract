// SPDX-License-Identifier: UNLICENSE
pragma solidity >=0.8.2 <0.9.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Fundraising {
    // Contract owner
    address private admin;
    AggregatorV3Interface internal dataFeed;
    uint256 USDInWei;
    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }

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
        bool campaignFee;
    }

    struct Donation{
        address owner;
        address[] donators;
        uint256[] donations;
        uint256[] donationsTime;
    }

    mapping(string => uint256) private campaignsMap;
    mapping(uint256 => Campaign) private campaigns;
    mapping(uint256 => Donation) private donations;

    // Contract statistics
    // totalCampaigns is 1 because i use this to access to mapping, and 0 is set for undefined which i can't use it.
    uint256 private totalCampaigns = 1;
    uint256 private totalDonations = 0;
    uint256 private totalDonators = 0; 

    // Get contract statistics
    function getStatistics() public view returns (uint256 ,uint256,uint256){
        return (totalCampaigns - 1,totalDonations,totalDonators);
    }
    // Create campaign
    function createCampaign(string memory _id, address _address, string memory _ownerName, string memory _title, string memory _description, uint256 _target, uint256 _timeCreated, uint256 _deadline, string[] memory _images) public onlyAdmin{
        campaignsMap[_id] = totalCampaigns;

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
        campaign.campaignFee = false;
        for(uint i = 0; i < _images.length; i++) {
            campaign.images.push(_images[i]);
        }

        Donation storage donation = donations[totalCampaigns];
        donation.owner = _address;
        totalCampaigns = totalCampaigns + 1;   
    }


    function donateToCampaign(string memory _id,uint256 _amount, uint256 _donationTime) public payable {
        uint256 campaignId = campaignsMap[_id];
        require(campaignId !=0, "Campaign not found!");
        Campaign storage campaign = campaigns[campaignId];
        Donation storage donation = donations[campaignId];
        bool sentCampaignFee;
        bool sentOwner;

        if(campaign.campaignFee == false){
            dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
            USDInWei = uint256(10**18/(answer/10**8));
            uint256 FeeInWei= 5*USDInWei;
            require(msg.value > FeeInWei,"Donate amount must not be 0");
            (sentCampaignFee,) = payable(admin).call{value: FeeInWei}("");
            (sentOwner,) = payable(campaign.owner).call{value: msg.value - FeeInWei}("");
        }else{
            (sentOwner,) = payable(campaign.owner).call{value: msg.value}("");
        }

        if(sentOwner) {
            campaign.amountCollected = campaign.amountCollected + _amount;
            totalDonations = totalDonations + _amount;
            totalDonators = totalDonators + 1;
            donation.donators.push(msg.sender);
            donation.donations.push(_amount);
            donation.donationsTime.push(_donationTime);
        }
        if(sentCampaignFee){
            campaign.campaignFee= true;
        }
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns - 1);
        for(uint i = 1; i < totalCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i-1] = campaign;
        }
        return allCampaigns;
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory allDonations = new Donation[](totalCampaigns - 1);
        for(uint i = 1; i < totalCampaigns; i++) {
            Donation storage donation = donations[i];
            allDonations[i-1] = donation;
        }
        return allDonations;
    }
    
    function getCampaignById(string memory _id) public view returns (Campaign memory) {
        uint256 campaignId = campaignsMap[_id];
        require(campaignId != 0, "Campaign not found!");
        return campaigns[campaignId];
    }

    function getDonationById(string memory _id) public view returns (Donation memory) {
        uint256 campaignId = campaignsMap[_id];
        require(campaignId != 0, "Campaign not found!");
        return donations[campaignId];
    }

}