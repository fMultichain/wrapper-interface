import React from "react";
import type { NextPage } from "next";
import { PaginationButton } from "~~/components/blockexplorer/PaginationButton";
import { SearchBar } from "~~/components/blockexplorer/SearchBar";
import { TransactionsTable } from "~~/components/blockexplorer/TransactionsTable";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";

const Blockexplorer: NextPage = () => {
  const { blocks, currentPage, isLoading, setCurrentPage, totalBlocks, transactionReceipts } = useFetchBlocks();

  // console.log("blocks[0]: %s", blocks[0]?.number?.toString());

  return (
    <div className="container mx-auto my-10">
      <SearchBar />
      <TransactionsTable blocks={blocks} transactionReceipts={transactionReceipts} isLoading={isLoading} />
      <PaginationButton currentPage={currentPage} totalItems={Number(totalBlocks)} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Blockexplorer;
