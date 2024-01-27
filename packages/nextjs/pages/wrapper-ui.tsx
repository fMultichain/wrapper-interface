import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BridgeInteraction } from "~~/components/wrapper-ui/BridgeInteraction";
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
        <div
          className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 p-0 m-1.5"
          style={{
            borderLeftColor: "#005AFF", // BLUE
            borderRightColor: "#005AFF", // BLUE
            fontWeight: "bold",
          }}
        >
          {`Upgrade fMULTI`}
          <WrapInteraction />
        </div>
        {/* <ContractData /> */}
        <div
          className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 p-0 m-1.5"
          style={{
            borderLeftColor: "#005AFF", // BLUE
            borderRightColor: "#005AFF", // BLUE
            fontWeight: "bold",
          }}
        >
          {`Bridge lz-fMULTI`}
          <BridgeInteraction />
        </div>
      </div>
    </>
  );
};

export default WrapperUI;
