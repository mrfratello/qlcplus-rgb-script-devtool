type AnyObject = Record<string, any>;

export interface AlgoBase {
  apiVersion: 1 | 2;
  name: string;
  author: string;
  acceptColors: 0 | 1 | 2;
  properties: unknown[];
  initialized?: boolean;
  rgbMap?(width: number, height: number, rgb: number, step: number): number[][];
  rgbMapStepCount?(width: number, height: number): number;
}

export type Algo<T extends AnyObject = AnyObject> = AlgoBase & T;

export interface UtilsBase {
  initialize(width: number, height: number): void;
}

export type Utils<T extends AnyObject = AnyObject> = UtilsBase & T;
