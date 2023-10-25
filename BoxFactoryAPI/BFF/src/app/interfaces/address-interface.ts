export interface Address {
  streetName?: string; // string? in C# is represented as Optional String in TypeScript
  houseNumber: number; // int in C# = number in TypeScript
  houseNumberAddition: string;
  city?: string; // string? in C# is represented as Optional String in TypeScript
  country?: string; // string? in C# is represented as Optional String in TypeScript
  postalCode?: string; // string? in C# is represented as Optional String in TypeScript
}

export interface CreateAddressDto {
  streetName?: string;
  houseNumber: number;
  houseNumberAddition: string;
  city?: string;
  country?: string;
  postalCode?: string;
}
