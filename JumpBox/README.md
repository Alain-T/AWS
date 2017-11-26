The goal is to create an isolated VPC accessible from the Internet only through a dedicated jump box.

However, the VPC instance(s) should be able to access to the Internet.

Network settings:
- create a VPC named "JumpBoxTest", allocating a non routing CIDR, e.g. 172.20.0.0/16 and supporting DNS hostnames and DNS resolution,
Note : a default route table also named "JumpBoxTest" also get created.

- in that VPC, create a subnet named "JumpBoxTest-Public" having the CIDR 172.20.10.0/24,
- in that VPC, create a subnet in that VPC named "JumpBoxTest-Private" having the CIDR 172.20.11.0/24 in another availability zone,
- create an Internet Gateway named "JumpBoxTest-IGW",
- attach it to the "JumpBoxTest" VPC,
- Add to the route table "JumpBoxTest" the route :
  - 0.0.0.0/0 : "JumpBoxTest-IGW",
- create a new route table "JumpBoxPrivate",
- in the "JumpBoxTest" VPC, create a security group named "JumpBox-SecurityGroup" accepting SSH from anywhere,

Instances Settings:
- create an EC2 instance :
   - AMI: Amazon Linux,
   - Network : "JumpBoxTest",
   - Subnet : "JumpBoxTest-Public",
   - Public IP address: Enabled,
   - Name : "JumpBox",
   - Security Group : JumpBox-SecurityGroup
