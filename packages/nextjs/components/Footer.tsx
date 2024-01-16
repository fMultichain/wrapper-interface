// import { hardhat } from "wagmi/chains"
import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/outline"
// import { SwitchTheme } from "~~/components/SwitchTheme"
import { useGlobalState } from "~~/services/store/store";

// import { getTargetNetwork } from "~~/utils/scaffold-eth"

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0">
          <div className="flex space-x-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div className="btn btn-primary btn-sm font-normal cursor-auto gap-0">
                <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
                <span>{nativeCurrencyPrice}</span>
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-4 gap-4"
            // style={{
            //   display: 'grid',
            //   justifyContent: 'center',
            // }}
          >
            <div className={"flex justify-center p-2 border rounded-2xl"}>
              <Link
                href="https://t.me/FuckMulti" // todo
                target="_blank"
                rel="noopener noreferrer"
              >
                {`Docs`}
              </Link>
            </div>
            <div className={"flex justify-center p-2 border rounded-2xl"}>
              <Link href="https://x.com/FMultichain" target="_blank" rel="noopener noreferrer">
                {`Twitter`}
              </Link>
            </div>
            <div className={"flex justify-center p-2 border rounded-2xl"}>
              <Link
                href="https://discord.gg" // todo
                target="_blank"
                rel="noopener noreferrer"
              >
                {`Discord`}
              </Link>
            </div>
            <div className={"flex justify-center p-2 border rounded-2xl"}>
              <Link href="https://t.me/FuckMulti" target="_blank" rel="noopener noreferrer">
                {`Telegram`}
              </Link>
            </div>
          </div>
          {/* <SwitchTheme className="pointer-events-auto" /> */}
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full"></div>
        </ul>
      </div>
    </div>
  );
};
