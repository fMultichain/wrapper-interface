import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
// import { ContractData } from "~~/components/wrapper-ui/ContractData"
import { WrapInteraction } from "~~/components/wrapper-ui/WrapInteraction";

const WrapperUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Wrapper | lz-fMULTI" description="Wrap FMULTI to lz-fMULTI.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid flex-grow" data-theme="exampleUi">
        <WrapInteraction />
        {/* <ContractData /> */}
      </div>
    </>
  );
};

export default WrapperUI;
