import {Address, CreateAddressDto} from "./address-interface";
import {Order} from "./order-interface";

export interface Customer {
  firstName?: string; // string? in C# is represented as Optional String in TypeScript
  lastName?: string; // string? in C# is represented as Optional String in TypeScript
  email?: string; // string? in C# is represented as Optional String in TypeScript
  address?: Address; // Assuming that Address is another interface we defined in TypeScript
  phoneNumber?: string; // string? in C# is represented as Optional String in TypeScript
  orders?: Order[]; // Assuming Order is another interface we defined in TypeScript. List<T> in C# = T[] in TypeScript
  simpsonImgUrl: string;
}

export interface CreateCustomerDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: CreateAddressDto;
  phoneNumber?: string;
  simpsonImgUrl?: string;
}
