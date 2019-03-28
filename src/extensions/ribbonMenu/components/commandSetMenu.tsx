
import * as React                               from "react";
import { IContextualMenuItem, 
         CommandBarButton,
         find}                                  from 'office-ui-fabric-react';
import { CoreEventEmitter }                     from "../../../services/CoreEventEmitter";
import { NewRibbonId,NewItemMenuSetting }       from "../../../common/coreConstants";
import { override }                             from "@microsoft/decorators";
import { EventData }                            from "../../../common/models/EventData"; 
import { Ribbon }                               from "../../../common/models/SPEntities";
import './commandSetMenu.scss';

export interface ICommandSetMenuProperties {
    items?: Array<IContextualMenuItem>;
    ribbons?: Array<Ribbon>;
    ribbonsActive?: boolean;
}
export interface ICommandSetMenuState {
}
/**
 * if we use ribbon we need to collect all sharxx components in one list
 */
export class commandSetMenu extends React.Component<ICommandSetMenuProperties,ICommandSetMenuState> {
    constructor(props:ICommandSetMenuProperties){
        super();
    }
    @override
    public render():JSX.Element {
        
        return(
            <div>
                <CommandBarButton
                id="sharxxContextualMenuId"
                text="Sharxx"
                className="nv-sharxxRibbonMenu"
                disabled={this.props.ribbonsActive}
                menuProps={{
                    shouldFocusOnMount: true,
                    items: this.props.items
                }}
                />
            </div>
        )
    }
}