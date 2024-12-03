import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
  useBalance,
} from "wagmi";
import { useRouter } from "next/navigation";

import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";

export default function Demo(
  { title }: { title?: string } = { title: "Frames v2 Demo" }
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const { address, isConnected } = useAccount();
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const {
    signMessage,
    error: signError,
    isError: isSignError,
    isPending: isSignPending,
  } = useSignMessage();

  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  const router = useRouter();

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  const usdValue =
    balance && ethPrice ? parseFloat(balance.formatted) * ethPrice : null;

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((data) => setEthPrice(data.ethereum.usd))
      .catch(console.error);
  }, []);

  const openUrl = useCallback(() => {
    sdk.actions.openUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }, []);

  const openWarpcastUrl = useCallback(() => {
    sdk.actions.openUrl("https://warpcast.com/~/compose");
  }, []);

  const close = useCallback(() => {
    sdk.actions.close();
  }, []);

  const sendTx = useCallback(() => {
    sendTransaction(
      {
        to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
        data: "0x9846cd9efc000023c0",
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  }, [sendTransaction]);

  const sign = useCallback(() => {
    signMessage({ message: "Hello from Frames v2!" });
  }, [signMessage]);

  const signTyped = useCallback(() => {
    signTypedData({
      domain: {
        name: "Frames v2 Demo",
        version: "1",
        chainId: 8453,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "Hello from Frames v2!",
      },
      primaryType: "Message",
    });
  }, [signTypedData]);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  const openCoinFlip = useCallback(() => {
    const url = `/frames/games/coinflip`;
    router.push(url);
  }, [router]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
      <nav className="flex justify-end mb-4">
        <img
          src={context?.user.pfpUrl || ""}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </nav>
      <div className="mb-4">
        <h2 className="font-2xl font-bold">Context</h2>
        <button
          onClick={toggleContext}
          className="flex items-center gap-2 transition-colors"
        >
          <span
            className={`transform transition-transform ${
              isContextOpen ? "rotate-90" : ""
            }`}
          >
            ➤
          </span>
          Tap to expand
        </button>

        {isContextOpen && (
          <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              {JSON.stringify(context, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-2xl font-bold">Actions</h2>

        <div className="mb-8">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              Games
            </pre>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button onClick={openCoinFlip} className="w-full">
              Play Coin Flip 🎲
            </Button>
            {/* Add more game buttons here */}
          </div>
        </div>

        <div className="mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              sdk.actions.openUrl
            </pre>
          </div>
          <Button onClick={openUrl}>Open Link</Button>
        </div>

        <div className="mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              sdk.actions.openUrl
            </pre>
          </div>
          <Button onClick={openWarpcastUrl}>Open Warpcast Link</Button>
        </div>

        <div className="mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
            <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
              sdk.actions.close
            </pre>
          </div>
          <Button onClick={close}>Close Frame</Button>
        </div>
      </div>

      <div>
        <h2 className="font-2xl font-bold">Wallet</h2>

        {address && (
          <div className="my-2 text-xs">
            <div>
              Address: <pre className="inline">{truncateAddress(address)}</pre>
            </div>
            {balance && (
              <div className="mt-1">
                Balance: {balance.formatted} {balance.symbol}
                {usdValue && (
                  <span className="ml-1 text-gray-500">
                    (${usdValue.toFixed(2)})
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <Button
            onClick={() =>
              isConnected
                ? disconnect()
                : connect({ connector: config.connectors[0] })
            }
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>

        {isConnected && (
          <>
            <div className="mb-4">
              <Button
                onClick={sendTx}
                disabled={!isConnected || isSendTxPending}
                isLoading={isSendTxPending}
              >
                Send Transaction
              </Button>
              {isSendTxError && renderError(sendTxError)}
              {txHash && (
                <div className="mt-2 text-xs">
                  <div>Hash: {truncateAddress(txHash)}</div>
                  <div>
                    Status:{" "}
                    {isConfirming
                      ? "Confirming..."
                      : isConfirmed
                      ? "Confirmed!"
                      : "Pending"}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <Button
                onClick={sign}
                disabled={!isConnected || isSignPending}
                isLoading={isSignPending}
              >
                Sign Message
              </Button>
              {isSignError && renderError(signError)}
            </div>
            <div className="mb-4">
              <Button
                onClick={signTyped}
                disabled={!isConnected || isSignTypedPending}
                isLoading={isSignTypedPending}
              >
                Sign Typed Data
              </Button>
              {isSignTypedError && renderError(signTypedError)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
