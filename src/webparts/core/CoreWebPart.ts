import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "CoreWebPartStrings";
import Core from "./components/Core";
import { ICoreProps } from "./components/ICoreProps";

export interface ICoreWebPartProps {
  description: string;
}

export default class CoreWebPart extends BaseClientSideWebPart<
  ICoreWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<ICoreProps> = React.createElement(Core, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
