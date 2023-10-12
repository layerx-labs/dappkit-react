import {WalletSelectorProps} from "../../types/wallet-selector";
import {useDappkit, useDappkitConnectionInfo} from "../../custom-hooks/use-dappkit";
import {provider as Provider} from "web3-core";
import {CoinbaseCard} from "../connector-card/coinbase-card";
import {MetamaskCard} from "../connector-card/metamask-card";
import {GnosisSafeCard} from "../connector-card/gnosis-safe-card";
import React from "react";
import {GridCol, GridContainer, GridRow, Modal} from "@taikai/rocket-kit";
import styled from "styled-components";

const WalletList = styled(GridRow)`flex-wrap: wrap;`;
const WalletCard = styled(GridCol)`display: inline-flex; justify-content: center;`;

export function WalletSelector({showWallets, showModal, modalCloseClicked = (() => {}), modalTitle}: WalletSelectorProps) {
  const {setProvider, initializeConnection} =
    useDappkit(({setProvider, initializeConnection}) =>
      ({setProvider, initializeConnection}));

  const {address} = useDappkitConnectionInfo();

  async function onConnectorConnect(provider: Provider) {
    setProvider(null);
    setProvider(provider);
    initializeConnection();
  }

  async function onConnectorDisconnect() {
    setProvider(null);
    window.location.reload();
  }

  return (
    <div className="wallet-selector-container">
      <Modal isShowing={showModal} hide={modalCloseClicked} title={modalTitle || "Select a wallet"} footer={false}>
        <GridContainer>
          <GridRow>
            <GridCol className="wallet-connected-address">{address}</GridCol>
          </GridRow>
          {!showWallets.length ? <GridRow><GridCol>No allowed list provided</GridCol></GridRow> : null}
          <WalletList>
            {showWallets.includes("coinbase") ? <WalletCard><CoinbaseCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/></WalletCard> : null}
            {showWallets.includes("metamask") ? <WalletCard><MetamaskCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/></WalletCard> : null}
            {showWallets.includes("gnosis") ? <WalletCard><GnosisSafeCard onConnectorConnect={onConnectorConnect} onConnectorDisconnect={onConnectorDisconnect}/></WalletCard> : null}
          </WalletList>
        </GridContainer>
      </Modal>



    </div>
  );
}