import { plainToInstance } from 'class-transformer';

import { list } from '../../assets/json/list';

export class File {
  title!: string;
  path?: string;

  static fromJson(json: any): File {
    const result = plainToInstance(File, json);
    return result;
  }

  static async load() {
    const results = list.map((x) => File.fromJson(x));
    // console.log({ files: results });
    return results;
  }
}
