export interface EventData {
  Id: string;
  Label: string;
  IsAdding: boolean;
  onClick?: (eventData?: EventData) => void;
}
