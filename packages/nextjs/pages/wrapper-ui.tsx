import React, { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BridgeInteraction } from "~~/components/wrapper-ui/BridgeInteraction";
// import { ContractData } from "~~/components/wrapper-ui/ContractData"
import { WrapInteraction } from "~~/components/wrapper-ui/WrapInteraction";

const WrapperUI: NextPage = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showBridge, setShowBridge] = useState(false);
  const showBoth = showUpgrade && showBridge;
  return (
    <>
      <MetaHeader title="Wrapper | lz-fMULTI" description="Wrap FMULTI to lz-fMULTI.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className={`grid grid-cols-1 flex-grow ${showBoth ? "sm:gap-12" : "sm:gap-36"}`} data-theme="exampleUi">
        {!showBoth && (
          <div className={"grids sm:grid sm:grid-cols-2 flex-grow justfify-center w-[100%] h-[100%] p-2 m-0 gap-2"}>
            <div
              className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 sm:w-[100%] sm:h-[100%] mb-4"
              style={{
                display: "grid",
                justifyContent: "center",
                // alignItems: "center",
                borderTopColor: "#005AFF", // BLUE
                borderLeftColor: "#005AFF", // BLUE
                borderRightColor: "#005AFF", // BLUE
                borderBottomColor: "#005AFF", // BLUE
                fontWeight: "bold",
                padding: "0.5rem",
              }}
            >
              <Image
                className="grids text-center font-bold justify-center rounded-lg sm:w-[100%] sm:h-[100%] sm:mb-64 md:mb-32 lg:mb-24"
                src="/assets/gifs/upgrade.gif"
                alt="Upgrade"
                width={2400}
                height={1800}
              />
              <button
                className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 mt-4 sm:h-[60%] md:h-[80%]"
                style={{
                  borderTopColor: "#005AFF", // BLUE
                  borderLeftColor: "#005AFF", // BLUE
                  borderRightColor: "#005AFF", // BLUE
                  borderBottomColor: "#005AFF", // BLUE
                  fontWeight: "bold",
                  fontSize: "1.85rem",
                }}
                onClick={() => setShowUpgrade(true)}
              >
                {`Upgrade`}
              </button>
            </div>
            <div
              className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 sm:w-[100%] sm:h-[100%] mb-4"
              style={{
                display: "grid",
                justifyContent: "center",
                // alignItems: "center",
                borderTopColor: "#005AFF", // BLUE
                borderLeftColor: "#005AFF", // BLUE
                borderRightColor: "#005AFF", // BLUE
                borderBottomColor: "#005AFF", // BLUE
                fontWeight: "bold",
                padding: "0.5rem",
              }}
            >
              <Image
                className="grids text-center font-bold justify-center rounded-lg sm:w-[100%] sm:h-[100%] sm:mb-64 md:mb-32 lg:mb-24"
                src="/assets/gifs/bridge.gif"
                alt="Bridge"
                width={2400}
                height={1800}
              />
              <button
                className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 mt-4 sm:h-[60%] md:h-[80%]"
                style={{
                  borderTopColor: "#005AFF", // BLUE
                  borderLeftColor: "#005AFF", // BLUE
                  borderRightColor: "#005AFF", // BLUE
                  borderBottomColor: "#005AFF", // BLUE
                  fontWeight: "bold",
                  fontSize: "1.85rem",
                }}
                onClick={() => setShowBridge(true)}
              >
                {`Bridge`}
              </button>
            </div>
          </div>
        )}
        {showUpgrade && (
          <div
            className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 p-0 m-1.5"
            style={{
              borderTopColor: "#005AFF", // BLUE
              borderLeftColor: "#005AFF", // BLUE
              borderRightColor: "#005AFF", // BLUE
              borderBottomColor: "#005AFF", // BLUE
              fontWeight: "bold",
            }}
          >
            {`Upgrade fMULTI`}
            <WrapInteraction />
          </div>
        )}
        {showBridge && (
          <div
            className="grids text-center text-2xl font-bold justify-center rounded-lg border-8 p-0 m-1.5"
            style={{
              borderTopColor: "#005AFF", // BLUE
              borderLeftColor: "#005AFF", // BLUE
              borderRightColor: "#005AFF", // BLUE
              borderBottomColor: "#005AFF", // BLUE
              fontWeight: "bold",
            }}
          >
            {`Bridge lz-fMULTI`}
            <BridgeInteraction />
          </div>
        )}
      </div>
    </>
  );
};

export default WrapperUI;
