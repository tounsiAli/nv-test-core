import * as React                   from "react";
import {Spinner,SpinnerSize}        from "office-ui-fabric-react/lib/Spinner";
// import styles                       from "./IFrameDialogContent.module.scss";
import * as $                       from "jquery";

require("./IFrameDialogContent.module.scss");

export interface IIFrameDialogContentProps {
    url: string;
    close: () => void;
    iframeOnLoad?: (iframe: any) => void;
    width: string;
    height: string;
}

export interface IIFrameDialogContentState {
    isContentVisible?: boolean;
}

export class IFrameDialogContent extends React.Component<IIFrameDialogContentProps, IIFrameDialogContentState> {
    private _iframe: any;

    constructor(props: IIFrameDialogContentProps) {
        super(props);

        this.state = {
            isContentVisible: false
        };
    }

    public render(): JSX.Element {
        return (<div style={{border:"none"}}> 
            <iframe id="sPFxDialogIframe" name="sPFxDialogIframe" ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} src={this.props.url} onLoad={this._iframeOnLoad.bind(this)} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} />
            {!this.state.isContentVisible &&
                <div style={{position:"absolute",left:"50%",top:"50%",marginLeft:"-14px",marginTop:"-14px"}}>
                    <Spinner size={SpinnerSize.large} />
                </div>}
        </div>);
    }

    private _iframeOnLoad(): void {
        this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;


        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }

        this.setState({
            isContentVisible: true
        });
    }
}