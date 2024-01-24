import React from "react";
import type { NextPage } from "next";
import { PaginationButton } from "~~/components/blockexplorer/PaginationButton";
import { SearchBar } from "~~/components/blockexplorer/SearchBar";
import { TransactionsTable } from "~~/components/blockexplorer/TransactionsTable";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";

// import { useTimeoutHook } from '~~/hooks'
// import { useEffect } from "react"
// import { hardhat } from "wagmi/chains"
// import { getTargetNetwork, notification } from "~~/utils/scaffold-eth"

const Blockexplorer: NextPage = () => {
  const { blocks, currentPage, isLoading, setCurrentPage, totalBlocks, transactionReceipts } = useFetchBlocks();

  // const getBlocks = () => {
  //   const { blocks } = useFetchBlocks()
  //   return blocks
  // }

  console.log("blocks[0]: %s", blocks[0]?.number?.toString());

  // useEffect(() => {
  //   if (getTargetNetwork().id === hardhat.id && error) {
  //     notification.error(
  //       <>
  //         <p className="font-bold mt-0 mb-1">Cannot connect to local provider</p>
  //         <p className="m-0">
  //           - Did you forget to run <code className="italic bg-base-300 text-base font-bold">yarn chain</code> ?
  //         </p>
  //         <p className="mt-1 break-normal">
  //           - Or you can change <code className="italic bg-base-300 text-base font-bold">targetNetwork</code> in{" "}
  //           <code className="italic bg-base-300 text-base font-bold">scaffold.config.ts</code>
  //         </p>
  //       </>,
  //     )
  //   }

  //   if (getTargetNetwork().id !== hardhat.id) {
  //     notification.error(
  //       <>
  //         <p className="font-bold mt-0 mb-1">
  //           <code className="italic bg-base-300 text-base font-bold"> targeNetwork </code> is not localhost
  //         </p>
  //         <p className="m-0">
  //           - You are on <code className="italic bg-base-300 text-base font-bold">{getTargetNetwork().name}</code> .This
  //           block explorer is only for <code className="italic bg-base-300 text-base font-bold">localhost</code>.
  //         </p>
  //         <p className="mt-1 break-normal">
  //           - You can use{" "}
  //           <a className="text-accent" href={getTargetNetwork().blockExplorers?.default.url}>
  //             {getTargetNetwork().blockExplorers?.default.name}
  //           </a>{" "}
  //           instead
  //         </p>
  //       </>,
  //     );
  //   }
  // }, [error]);

  return (
    <div
      className="container mx-auto my-10"
      style={{
        backgroundColor: "#FFFFFF",
        // padding: '12',
      }}
    >
      <SearchBar />
      {/* <iframe
        height={'100%'}
        width={'100%'}
        src="https://blockhead.info/explorer"
      /> */}
      <TransactionsTable blocks={blocks} transactionReceipts={transactionReceipts} isLoading={isLoading} />
      <PaginationButton currentPage={currentPage} totalItems={Number(totalBlocks)} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Blockexplorer;
