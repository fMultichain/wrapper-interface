import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/wrapper-ui/ContractData";
import { ContractInteraction } from "~~/components/wrapper-ui/ContractInteraction";

const WrapperUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Wrapper UI | lz-fMULTI" description="Wrap FMULTI to lz-fMULTI.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        <ContractData />
      </div>
    </>
  );
};

export default WrapperUI;
