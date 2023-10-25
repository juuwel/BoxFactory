import {Box} from "./box-inteface";
import {CreateCustomerDto, Customer} from "./customer-interface";

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  boxes: Record<string, number>; // Dictionary<Guid, int> is represented as Record<string, number> in TypeScript
  customer?: Customer; // Assuming Customer is an interface we defined in TypeScript
  shippingStatus?: ShippingStatus; // Assuming ShippingStatus is either an interface or type alias we defined in TypeScript
  totalPrice?: number;
  totalBoxes?: number;
}

export interface OrderCreateDto {
  boxes: Record<string, number>;
  customer?: CreateCustomerDto;
}

export enum ShippingStatus {
  Received = 'Received',
  Preparing = 'Preparing',
  Shipped = 'Shipped'
}

export interface ShippingStatusDto {
  shippingStatus: ShippingStatus;
}
