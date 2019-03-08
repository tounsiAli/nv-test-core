declare interface IRibbonMenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module "RibbonMenuCommandSetStrings" {
  const strings: IRibbonMenuCommandSetStrings;
  export = strings;
}
