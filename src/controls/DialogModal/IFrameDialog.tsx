import * as React                 from  "react";
import { Dialog, IDialogProps }   from "office-ui-fabric-react/lib/Dialog";
import { Guid }                   from "@microsoft/sp-core-library";
import { IFrameDialogContent }    from "./IFrameDialogContent";
import  omit=require("lodash.omit");


export interface IFrameDialogProps extends IDialogProps {
    url: string;
    iframeOnLoad?: (iframe: any) => void;
    width: string;
    height: string;
  }
export interface IFrameDialogState {
    dialogId:string;
}
export class IFrameDialog extends React.Component<IFrameDialogProps, IFrameDialogState> {

    public constructor(props: IFrameDialogProps, state: IFrameDialogState) {
      super(props, state);  
    //   telemetry.track('IFrameDialog', {});
      this.state = {
        dialogId: null
      };
    }
  
    /**
     * componentWillMount lifecycle hook
     */
    public componentWillMount(): void {
      this.setState({
        dialogId: `dialog-${Guid.newGuid().toString()}`
      });
    }
  
    /**
     * componentDidMount lifecycle hook
     */
    public componentDidMount(): void {
      this.setDialogStyling();
    }
  
    public componentDidUpdate(prevProps: IFrameDialogProps, prevState: IFrameDialogState): void {
      this.setDialogStyling();
    }
  
    public render(): JSX.Element {
      return (
        <Dialog className={`${this.state.dialogId} ${this.props.className}`}
                {...omit(this.props, "className")}>
          <IFrameDialogContent url={this.props.url}
                               iframeOnLoad={this.props.iframeOnLoad}
                               close={this.props.onDismiss}
                               width={this.props.width}
                               height={this.props.height} />
        </Dialog>);
    }
    /**
     * Set the dialog style
     */
    private setDialogStyling(): void {
      if (!this.props.hidden && this.state.dialogId) {
        const element = document.querySelector(`.${this.state.dialogId} .ms-Dialog-main`) as HTMLElement;
        if (element && this.props.width) {
          element.style.width = this.props.width;
          element.style.minWidth = this.props.width;
          element.style.maxWidth = this.props.width;
        }
      }
    }
  }