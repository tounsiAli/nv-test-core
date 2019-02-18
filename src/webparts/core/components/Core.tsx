import * as React from 'react';
import styles from './Core.module.scss';
import { ICoreProps } from './ICoreProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {IFrameDialog} from "../../../controls/DialogModal/IFrameDialog";
import { DialogType }           from 'office-ui-fabric-react/lib/Dialog';

export default class Core extends React.Component<ICoreProps, {}> {
  public render(): React.ReactElement<ICoreProps> {
    return (
      <IFrameDialog  className="am-distributorDialog"
      url={"www.google.com"}
      iframeOnLoad={this._onIframeLoaded.bind(this)}
      hidden={false}
      onDismiss={this._onDialogDismiss.bind(this)}
      modalProps={{
          isBlocking: true,
          containerClassName: "ms-dialogMainOverride"
      }}
      dialogContentProps={{
          type: DialogType.close,
          showCloseButton: true
      }}
      width={'970px'}
  height={'800px'}/>
    );
  }

  private _onIframeLoaded(iframe: any):void {
  }
  private _onDialogDismiss():void{
  }
}
