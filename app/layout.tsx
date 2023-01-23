"use client";
/* eslint-disable @next/next/no-head-element */

import "../styles/globals.css";
import "../styles/tailwind.css";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import Navbar from "./Navbar";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY as string }),
      publicProvider(),
    ]
  );

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
  });

  return (
    <html>
      <head></head>
      <body>
        <WagmiConfig client={wagmiClient}>
          <div className="mx-auto">
            <Navbar />
            {children}
          </div>
        </WagmiConfig>
      </body>
    </html>
  );
}
