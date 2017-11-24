Connect to the AWS console

From the EC2 dashboard, launch an instance, using the default setting except for : 
-	Amazon Machine Image: Amazon Linux AMI*
-	User data:
<pre>
#!/bin/bash
yum -y update
yum -y install R
wget https://download2.rstudio.org/rstudio-server-rhel-1.1.383-x86_64.rpm
yum -y install --nogpgcheck rstudio-server-rhel-1.1.383-x86_64.rpm
adduser <i>user</i>
echo user:password | chpasswd
</pre>

-	Tag : “Name”=”RStudio Server”
-	Security Group : create a new security group with the following rule :
-	Custom TCP Rule for Port 8787, accepting connection from Anywhere

Note : no need for other network inbound rules, SSH access can always be added later on in case of need (but the private key file associated to the instance should be kept securely).

When the instance is running get its Public DNS (IPv4) address from the EC2 instance screen.

In a browser, connect to the instance on port 8787 using its public DNS address (i.e. with a URL such as http://<my.public.dns.amazonaws.com>:8787) and enter the user id “*user*“ and the password “*password*” to access a R Studio instance.

