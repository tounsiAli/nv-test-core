
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
}
export interface ICommandSetMenuState {
    items?:Array<IContextualMenuItem>;
    ribbons?:Array<Ribbon>;
}
/**
 * if we use ribbon we need to collect all sharxx components in one list
 */
export class commandSetMenu extends React.Component<ICommandSetMenuProperties,ICommandSetMenuState> {
    private readonly _eventEmitter:CoreEventEmitter=CoreEventEmitter.getInstance();
    constructor(props:ICommandSetMenuProperties){
        super();
        this.state={
            items:[],
            ribbons:[]
        }
        this._ribbonClick=this._ribbonClick.bind(this);
    }
    public componentWillMount():void {
        this._eventEmitter.on(NewRibbonId,this._receiveRibbon.bind(this));

    }
    @override
    public render():JSX.Element {
        
        return(
            <div>
                <CommandBarButton
                id="sharxxContextualMenuId"
                text="Sharxx"
                className="nv-sharxxRibbonMenu"
                menuProps={{
                    shouldFocusOnMount: true,
                    items: this.state.items
                }}
                />
            </div>
        )
    }

    
  private _receiveRibbon(data:EventData):void{
    let _items:Array<IContextualMenuItem>=this.state.items;
    let _tempRibbons:Ribbon[]=this.state.ribbons;
    let _ribbon:Ribbon=find(_tempRibbons,(it)=> {return (it["Id"]===data.Id);});
    if(_ribbon!==undefined) { // exist 
        if(data.IsAdding) { // change Info : language changed
            _ribbon.Label=data.Label;
        } else { // delete ribbon
            let index:number=_tempRibbons.indexOf(_ribbon);
            _tempRibbons.splice(index,1);
        }
    } else {
        if(data.IsAdding) { // add new label
            _ribbon=new Ribbon();
            _ribbon.Id=data.Id;
            _ribbon.Label=data.Label;
            _tempRibbons.push(_ribbon);
        }
    }
    _items=this._castRibbonToContextMenu(data,_tempRibbons);
    this.setState({items:_items,ribbons:_tempRibbons});
  }
  private _castRibbonToContextMenu(data:EventData,_ribbons:Ribbon[]):Array<IContextualMenuItem> {
    let _items:Array<IContextualMenuItem>=[];
    _ribbons.forEach((rib)=> {
        _items.push({
                key:rib.Id,
                name:rib.Label,
                onClick:()=>this._ribbonClick(data)
        });
    });
    return _items;
  }

  private _ribbonClick(data:EventData):void {
     this._eventEmitter.emit(data.Id,data);
  }
}