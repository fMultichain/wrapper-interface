// import Link from "next/link";
import WrapperUI from "./wrapper-ui";
import type { NextPage } from "next";
// import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <WrapperUI />

      {/* <div className="flex items-center flex-col flex-grow pt-10"> */}
      {/* 
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome:</span>
            <span className="block text-4xl font-bold">Try installing on your home screen ;)</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/pages/index.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>
    */}

      {/* <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12"> */}
      {/* <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <Link href="/wrapper-ui" passHref className="link">
              <div
                className="flex flex-col bg-base-100 px-0 py-6 text-center items-center max-w-sm rounded-3xl"
                style={{
                  width: "8rem",
                  height: "8rem",
                  border: "8px solid black",
                }}
              >
                <SparklesIcon className="h-[72px] w-[72px] fill-secondary" />
                <p>
                  Wrapper UI
                </p>
              </div>
            </Link>{" "}
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Home;
