export interface IMeasure {
  doc?: string;
  acronym?: string;
  title: string;
  type: 'mass' | 'length';
  multiple: number;
}

export class Measure implements Omit<IMeasure, 'doc'> {
  public acronym: string;
  public title: string;
  public type: 'mass' | 'length';
  public multiple: number;

  constructor(measure: Omit<IMeasure, 'doc'>) {
    this.acronym = measure.acronym;
    this.title = measure.title.trim();
    this.type = measure.type;
    this.multiple = measure.multiple;
  }
}

export const buildSchemaMeasure = () => {};
