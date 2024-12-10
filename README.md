# Script to simplified changing DNS setting in a windows machine

## Using windows Powershell ISE

### Configuration settings
- **Google DNS**
  ```powershell
  $adapterName = "Wi-Fi"   # Name of the network adapter
  $ipAddress = "192.168.1.100"  # Static IP address
  $subnetMask = "255.255.255.0" # Subnet mask
  $gateway = "192.168.1.1"      # Gateway
  $dnsServers = @("8.8.8.8", "8.8.4.4") # DNS servers

  # Set static IP address
  Write-Output "Setting static IP address for adapter '$adapterName'..."
  New-NetIPAddress -InterfaceAlias $adapterName -IPAddress $ipAddress -PrefixLength (32 - [math]::Log([Convert]::
  ```

- **Cloudflare DNS**
  ```powershell
  $adapterName = "Wi-Fi"   # Name of the network adapter
  $ipAddress = "192.168.1.100"  # Static IP address
  $subnetMask = "255.255.255.0" # Subnet mask
  $gateway = "192.168.1.1"      # Gateway
  $dnsServers = @("1.1.1.1", "1.0.0.1") # DNS servers

  # Set static IP address
  Write-Output "Setting static IP address for adapter '$adapterName'..."
  New-NetIPAddress -InterfaceAlias $adapterName -IPAddress $ipAddress -PrefixLength (32 - [math]::Log([Convert]::
  ```


### Copy and run this script in Powershell ISE
- **Google DNS**
  ```powershell
  $adapterName = "Wi-Fi"
  $ipAddress = "192.168.1.100"
  $subnetMask = "255.255.255.0"
  $gateway = "192.168.1.1"
  $dnsServers = @("8.8.8.8", "8.8.4.4")
  Write-Output "Setting static IP address for adapter '$adapterName'..."
  New-NetIPAddress -InterfaceAlias $adapterName -IPAddress $ipAddress -PrefixLength (32 - [math]::Log([Convert]::
  ```
- **Cloudflare DNS**
  ```powershell
  $adapterName = "Wi-Fi"
  $ipAddress = "192.168.1.100"
  $subnetMask = "255.255.255.0"
  $gateway = "192.168.1.1"
  $dnsServers = @("1.1.1.1", "1.0.0.1")
  Write-Output "Setting static IP address for adapter '$adapterName'..."
  New-NetIPAddress -InterfaceAlias $adapterName -IPAddress $ipAddress -PrefixLength (32 - [math]::Log([Convert]::
  ```

## Using executable written in Typescript and compiled with Deno compile

You can view the content of the script in `main.ts`

### Running the script

- Copy the code or clone the repository
- Run `deno task compile:windows`
- It will compile `main.ts` script and generate `change_dns.exe`
- Run the script with administrator permission
- Choose available profile (write in lowercase):
  - google for Google DNS
  - cloudflare for Cloudflare DNS