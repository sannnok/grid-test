export interface TableData {
  offset: number,
  limit: number,
  total: number,
  result: DeviceEvent[];
}

 export interface Event {
  cowId: number;
  animalId: string;
  eventId: number;
  deletable: boolean;
  lactationNumber: number;
  daysInLactation: number;
  ageInDays: number;
  startDateTime: number;
  reportingDateTime: number;
}

 export interface SystemHealthEvent extends Event {
  healthIndex: number;
  endDate: number | null;
  minValueDateTime: number;
  type: "systemHealth";
}

 export interface DistressEvent extends Event {
  alertType: string;
  duration: number;
  originalStartDateTime: number | null;
  endDateTime: number | null;
  daysInPregnancy: number | null;
  type: "distress";
}

 export interface ChangeGroupEvent extends Event {
  newGroupId: number;
  newGroupName: string;
  currentGroupId: number | null;
  currentGroupName: string | null;
  type: "changeGroup";
}

 export interface CalvingEvent extends Event {
  destinationGroup: number;
  destinationGroupName: string;
  calvingEase: string | null;
  daysInPregnancy: number;
  oldLactationNumber: number;
  newborns: null | any[];
  type: "calving";
}

 export interface BirthEvent extends Event {
  birthDateCalculated: boolean;
  type: "birth";
}

 export interface BreedingEvent extends Event {
  sire: string | null;
  breedingNumber: number;
  isOutOfBreedingWindow: boolean;
  interval: number;
  type: "breeding";
}

export type DeviceEvent = SystemHealthEvent | DistressEvent | ChangeGroupEvent | CalvingEvent | BirthEvent | BreedingEvent;
