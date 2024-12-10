import { exec } from "node:child_process";

const google = {
  v4: {
    primary: "8.8.8.8",
    secondary: "8.8.4.4",
    name: "Google DNS",
  },
  v6: {
    primary: "2001:4860:4860::8888",
    secondary: "2001:4860:4860::8844",
    name: "Google DNS",
  },
};

const cloudflare = {
  v4: {
    primary: "1.1.1.1",
    secondary: "1.0.0.1",
    name: "Cloudflare DNS",
  },
  v6: {
    primary: "2606:4700:4700::1111",
    secondary: "2606:4700:4700::1001",
    name: "Cloudflare DNS",
  },
};

type DNSProfile = {
  v4: {
    primary: string;
    secondary: string;
    name: string;
  };
  v6: {
    primary: string;
    secondary: string;
    name: string;
  };
};

const DNS_PROFILES = new Map<string, DNSProfile>([
  ["google", google],
  ["cloudflare", cloudflare],
]);

const changeDNS = (interfaceName = "Wi-Fi"): Promise<void> => {
  const prompt_log = [
    "Choose dns profile",
    "- google: Google DNS",
    "- cloudflare: Cloudflare DNS",
    "- reset: reset to default DNS setting",
  ];

  const profile = prompt(prompt_log.join("\n")) ||
    "reset";
  const dnsConfig = DNS_PROFILES.get(profile);

  if (!dnsConfig || profile === "reset") {
    const resetCommand = [
      `netsh interface ipv4 set dns name="${interfaceName}" dhcp`,
      `netsh interface ipv6 set dns name="${interfaceName}" dhcp`,
    ];

    return new Promise((resolve, reject) => {
      exec(resetCommand.join(" && "), (error, _stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(new Error(stderr));
          return;
        }
        console.log("DNS reset to automatic (DHCP) successfully");
        resolve();
      });
    });
  }

  const commands = [
    `netsh interface ipv4 set dns name="${interfaceName}" static ${dnsConfig.v4.primary}`,
    `netsh interface ipv4 add dns name="${interfaceName}" ${dnsConfig.v4.secondary} index=2`,
    `netsh interface ipv6 set dns name="${interfaceName}" static ${dnsConfig.v6.primary}`,
    `netsh interface ipv6 add dns name="${interfaceName}" ${dnsConfig.v6.secondary} index=2`,
  ];

  return new Promise((resolve, reject) => {
    exec(commands.join(" && "), (error, _stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`DNS changed to ${profile} successfully`);
      resolve();
    });
  });
};

changeDNS().catch(console.error)
Deno.exit()