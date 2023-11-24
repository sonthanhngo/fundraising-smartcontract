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
        uint256[] donationsTime;
    }
    // struct Review{
    //     uint256 star;
    //     string content;
    // }
    // mapping(uint256 => Review[]) private reviews;
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
        campaign.donationsTime.push(block.timestamp);

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

    // function sendReview(uint256 _id, uint256 _star, string memory _content) public{
    //     reviews[_id].push(Review(_star,_content));
    // }
    // function getReviews() public returns (Review[] memory){
    //     return rev
    // }
}

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
    uint256 private totalCampaignsVerified = 0;
    uint256 private totalDonations = 0;
    uint256 private totalDonators = 0; 

    // Get contract statistics
    function getStatistics() public view returns (uint256 ,uint256,uint256){
        return (totalCampaignsVerified,totalDonations,totalDonators);
    }
    // Create campaign
    function createCampaign(address _address, string memory _ownerName, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string[] memory _image) public{
        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _address;
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

        Donation storage donation = donations[numberOfCampaigns];
        donation.owner = _address;

        numberOfCampaigns = numberOfCampaigns + 1;   
    }


    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;    
        Campaign storage campaign = campaigns[_id];
        Donation storage donation = donations[_id];

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

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
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaign;
        }
        return allCampaigns;
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory allDonations = new Donation[](numberOfCampaigns);
        for(uint i = 0; i < numberOfCampaigns; i++) {
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
    function acceptCampaign(uint256 _id) public onlyAdmin{
        campaigns[_id].verified = Status.VERIFIED;
        totalCampaignsVerified += 1;
    }
}
/// cúng cuồi
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
        uint256 deadline;
                uint256 timeCreated;

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
    function createCampaign(string memory _id, address _address, string memory _ownerName, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string[] memory _images) public{
        Campaign storage campaign = campaigns[totalCampaigns];

        campaign.id = _id;
        campaign.owner = _address;
        campaign.ownerName = _ownerName;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.timeCreated = block.timestamp;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        for(uint i = 0; i < _images.length; i++) {
            campaign.images.push(_images[i]);
        }

        Donation storage donation = donations[totalCampaigns];
        donation.owner = _address;

        totalCampaigns = totalCampaigns + 1;   
    }


    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;    
        Campaign storage campaign = campaigns[_id];
        Donation storage donation = donations[_id];

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

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