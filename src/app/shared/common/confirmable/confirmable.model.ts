export abstract class ConfirmableService {
  abstract showConfirm(parameters?: ConfirmableData): Promise<ConfirmableResponse>;
  abstract defaultConfirm(): ConfirmableData
}

export type KeyConfirmableData = keyof ConfirmableData;

export type TypeConfirmable = 'warning' | 'danger' | 'info';

export interface ConfirmableData {
  title?: string;
  message?: string;
  confirmButtonText?: string;
  deniedButtonText?: string;
  type?: TypeConfirmable
}

export interface ConfirmableResponse {
  isConfirmed: boolean;
}
