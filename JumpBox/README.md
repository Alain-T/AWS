The goal is to create an isolated VPC accessible from the Internet only through a dedicated jump box.

However, the VPC instance(s) should be able to access to the Internet.

Network settings:
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
- create an NAT Internet Gateway named "JumpBoxTest-IGW" associating it a new Elastic IP,
- Add to the route table "JumpBoxPrivate" the route :
  - 0.0.0.0/0 : NAT Internet Gateway created above,

Jumpbox Settings:
- create an EC2 instance :
   - AMI: Amazon Linux,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Public",
   - Public IP address: Enabled,
   - Name : "JumpBox",
   - Security Group : JumpBox-SecurityGroup
- connect to the instance:
  - add the private key to the .ssh directory (copy/paste its content for instance),
  - ping 8.8.8.8 to check internet access

Nat instance Settings:
- create an EC2 instance :
   - AMI: **amzn-ami-vpc-nat**-hvm-2017.09.1.20171120-x86_64-ebs,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Public",
   - Public IP address: Enabled,
   - Name : "JumpBoxNatInstance",
   - Security Group : JumpBox-SecurityGroup

From a terminal:
scp the private key to the NAT instance (the connect string can be used a basis)
 scp -i *private_key.pem* *private_key.pem* ec2-user@*instance*.compute.amazonaws.com:.ssh

Note: using the IP address or its DNS name, check that it is possible to ping the jump box from anywhere


Private Server Settings:
- create an EC2 instance :
   - AMI: Amazon Linux,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Private",
   - Public IP address: Enabled,
   - Name : "JumpBoxPrivate-1",
   - Security Group : JumpBox-SecurityGroup

Private Server Checking:
- check that it is not possible to ping or to connect to the "JumpBoxPrivate-1"
- ssh to the "JumpBox" and from that instance ssh to "JumpBoxPrivate-1"
- once on "JumpBoxPrivate-1", ping 8.8.8.8 to check internet access


Reference:
- http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html#nat-gateway-basics
- http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_NAT_Instance.html
