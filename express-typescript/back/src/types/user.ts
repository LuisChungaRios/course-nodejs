export interface User {
  name: string;
  lastName: string;
  bornDate: string;
  documentType: "DNI" | "PASAPORTE";
  documentNumber: string;
  isActive: boolean;
}
