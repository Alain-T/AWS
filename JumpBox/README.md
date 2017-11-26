The goal is to create an isolated VPC accessible from the Internet only through a dedicated jump box.

However, the VPC instance(s) should be able to access to the Internet.

- create a VPN named "JumpBoxTest", allocating a non routing CIDR, e.g. 172.20.0.0/16,
- create a subnet in that VPN named "JumpBoxTest-Public" having the CIDR 172.20.10.0/24,
- create a subnet in that VPN named "JumpBoxTest-Private" having the CIDR 172.20.11.0/24 in another availability zone,
- create an Internet Gateway named "JumpBoxTest-IGW",
- attach it to the "JumpBoxTest" VPN,
