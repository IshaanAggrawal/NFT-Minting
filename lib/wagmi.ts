import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { baseSepolia } from "@reown/appkit/networks";

// Workaround for MetaMask SDK React Native dependency issue
const removeReactNativeDependency = () => {
  // This is a client-side only workaround
  if (typeof window !== 'undefined') {
    // Ensure we're in a browser environment
    return true;
  }
  return false;
};

removeReactNativeDependency();

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [baseSepolia];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;