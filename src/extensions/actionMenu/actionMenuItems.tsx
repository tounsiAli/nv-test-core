import * as React from "react";
import { ItemMenuSetting, MenuGroup } from "../../common/models/SPEntities";
import { NewItemMenuSetting } from "../../common/coreConstants";
import { CoreEventEmitter } from "../../services/CoreEventEmitter";

export interface IActionMenuItemProps {
}
export interface IActionMenuItemState {
    eventsList: Array<{ index: number, data: string }>;
    testMessage: string;
}

export default class actionMenuItem extends React.Component<IActionMenuItemProps, IActionMenuItemState> {

    private readonly _eventEmitter: CoreEventEmitter = CoreEventEmitter.getInstance();
    constructor(props: IActionMenuItemProps) {
        super();
        this.state = {
            eventsList: [],
            testMessage: "bla bla bla"
        }
    }

    public render(): React.ReactElement<IActionMenuItemProps> {
        return (<div></div>);

    }
    public componentWillMount(): void {
        this._eventEmitter.on(NewItemMenuSetting, this._receivedEvent.bind(this));
    }


    protected _receivedEvent(data: ItemMenuSetting): void {
        alert("onEmit");
    }
}