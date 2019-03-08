declare interface ICoreWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module "CoreWebPartStrings" {
  const strings: ICoreWebPartStrings;
  export = strings;
}
