The goal is to create an isolated VPC accessible from the Internet only through a dedicated jump box.

However, the VPC instance(s) should be able to access to the Internet.

It can be achieved by 2 means:
- either creating a NAT Internet Gateway and dedicated jump box,
- or by creating a NAT instance also used as a jump box.

Both solutions are described below.

###  Network settings
- create a VPC named "JumpBoxTest", allocating a non routing CIDR, e.g. 172.20.0.0/16 and supporting DNS hostnames and DNS resolution,


Note : a default route table get created for the VPC.


- in that VPC, create a subnet named "JumpBoxTest-Public" having the CIDR 172.20.10.0/24,
- in that VPC, create a subnet in that VPC named "JumpBoxTest-Private" having the CIDR 172.20.11.0/24 in another availability zone,
- create an Internet Gateway named "JumpBoxTest-IGW",
- attach it to the "JumpBoxTest" VPC,
- Add to the route table "JumpBoxTest" the route :
  - 0.0.0.0/0 : "JumpBoxTest-IGW",
- create a new route table "JumpBoxPrivate" in the VPC "JumpBoxTest",
- in the "JumpBoxTest" VPC, create a security group named "JumpBox-SecurityGroup" accepting SSH and all ICMP from anywhere,


### Private Server Settings
- create an EC2 instance :
   - AMI: Amazon Linux,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Private",
   - Public IP address: Disabled,
   - Name : "JumpBoxPrivate-1",
   - Security Group : JumpBox-SecurityGroup

### NAT Internet Gateway and dedicated Jumpbox
#### NAT Internet Gateway Settings 
- create an NAT Internet Gateway named "JumpBoxTest-IGW" associating it a new Elastic IP,

#### Private Subnet route table Configuration
- Add to the route table "JumpBoxPrivate" the route :
  - 0.0.0.0/0 : NAT Internet Gateway created above,

#### Jump box Settings:
- create an EC2 instance :
   - AMI: Amazon Linux,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Public",
   - Public IP address: Enabled,
   - Name : "JumpBox",
   - Security Group : JumpBox-SecurityGroup
- From a terminal:
  - Copy the private key to the Jumpbox using scp (the connect string can be used a basis) :   
    scp -i *private_key.pem* *private_key.pem* ec2-user@*instance*.compute.amazonaws.com:.
  - connect ping 8.8.8.8 to check internet access

### NAT Instance
#### Nat instance Settings:
- create an EC2 instance :
   - AMI: **amzn-ami-vpc-nat**-hvm-2017.09.1.20171120-x86_64-ebs,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Public",
   - Public IP address: Enabled,
   - Name : "JumpBoxNatInstance",
   - Security Group : JumpBox-SecurityGroup

#### Nat instance Configuration:
- disable Source/Destination Check,
- From a terminal:
  - Copy the private key to the NAT instance using scp (the connect string can be used a basis) :   
    scp -i *private_key.pem* *private_key.pem* ec2-user@*instance*.compute.amazonaws.com:.

#### Private Subnet route table Configuration
- Add to the route table "JumpBoxPrivate" the route :
  - 0.0.0.0/0 : NAT Instance created above,

### Private Server Checking:
- ssh to the "JumpBox" or the NAT instance,
- from that instance ssh to "JumpBoxPrivate-1",
- once on "JumpBoxPrivate-1", check internet access using  curl --head http://www.google.com/

### Reference:
- http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html#nat-gateway-basics
- http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_NAT_Instance.html
