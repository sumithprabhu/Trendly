// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DAOCommunity {
    struct Community {
        string name;
        string description;
        address creator;
        string baseURI;
        address[] members;
        mapping(address => bool) isMember;
        uint256 proposalCount;
        mapping(uint256 => Proposal) proposals;
    }

    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) hasVoted;
        bool executed;
    }

    mapping(bytes32 => Community) public communities;
    mapping(address => bytes32) public ownerToCommunity;
    bytes32[] public communityList;
    
    event CommunityCreated(bytes32 indexed communityId, string name, address creator);
    event JoinedCommunity(bytes32 indexed communityId, address member);
    event ProposalCreated(bytes32 indexed communityId, uint256 proposalId, string description);
    event Voted(bytes32 indexed communityId, uint256 proposalId, address voter, bool support);
    event ProposalExecuted(bytes32 indexed communityId, uint256 proposalId);

    function createCommunity(string memory _name, string memory _description, string memory _baseURI) external {
        require(ownerToCommunity[msg.sender] == bytes32(0), "User already owns a community");
        
        bytes32 communityId = keccak256(abi.encodePacked(_name, msg.sender, block.timestamp));
        require(communities[communityId].creator == address(0), "Community already exists");
        
        Community storage newCommunity = communities[communityId];
        newCommunity.name = _name;
        newCommunity.description = _description;
        newCommunity.creator = msg.sender;
        newCommunity.baseURI = _baseURI;
        newCommunity.members.push(msg.sender);
        newCommunity.isMember[msg.sender] = true;
        
        ownerToCommunity[msg.sender] = communityId;
        communityList.push(communityId);
        emit CommunityCreated(communityId, _name, msg.sender);
    }

    function joinCommunity(bytes32 _communityId) external {
        require(communities[_communityId].creator != address(0), "Community does not exist");
        require(!communities[_communityId].isMember[msg.sender], "Already a member");
        
        communities[_communityId].members.push(msg.sender);
        communities[_communityId].isMember[msg.sender] = true;
        
        emit JoinedCommunity(_communityId, msg.sender);
    }

    function createProposal(bytes32 _communityId, string memory _description) external {
        require(communities[_communityId].isMember[msg.sender], "Not a member");
        
        Community storage community = communities[_communityId];
        uint256 proposalId = community.proposalCount++;
        
        community.proposals[proposalId].description = _description;
        emit ProposalCreated(_communityId, proposalId, _description);
    }

    function voteOnProposal(bytes32 _communityId, uint256 _proposalId, bool _support) external {
        require(communities[_communityId].isMember[msg.sender], "Not a member");
        
        Proposal storage proposal = communities[_communityId].proposals[_proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        proposal.hasVoted[msg.sender] = true;
        if (_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        emit Voted(_communityId, _proposalId, msg.sender, _support);
    }

    function executeProposal(bytes32 _communityId, uint256 _proposalId) external {
        require(communities[_communityId].isMember[msg.sender], "Not a member");
        
        Proposal storage proposal = communities[_communityId].proposals[_proposalId];
        require(!proposal.executed, "Already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal not passed");
        
        proposal.executed = true;
        emit ProposalExecuted(_communityId, _proposalId);
    }

    function getCommunityDetails(address _owner) external view returns (
        string memory name,
        string memory description,
        address creator,
        string memory baseURI,
        address[] memory members,
        uint256 proposalCount
    ) {
        bytes32 communityId = ownerToCommunity[_owner];
        require(communityId != bytes32(0), "No community found for owner");

        Community storage community = communities[communityId];

        return (
            community.name,
            community.description,
            community.creator,
            community.baseURI,
            community.members,
            community.proposalCount
        );
    }

    function getCommunityByOwner(address _owner) external view returns (bytes32) {
        return ownerToCommunity[_owner];
    }
}
