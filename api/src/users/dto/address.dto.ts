export class AddressDto {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: number;
  country: string;
  userId: number;
}
