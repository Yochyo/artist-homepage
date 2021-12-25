import {Injectable} from '@angular/core';
import {values} from '../../assets/i18n/en';

// https://medium.com/swlh/angular-ngx-translate-typings-f29e3049f726
// The article shows non-working code, do not copy it blindly

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GenericClass = <Props>(): new () => Props => (class {
} as any);

const concatIfExistsPath = (path: string, suffix: string): string => path ? `${path}.${suffix}` : suffix;

const transformObjectToPath = <T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = ''
): T => typeof objectToTransformOrEndOfPath === 'object'
  ? Object.entries(objectToTransformOrEndOfPath).reduce(
    (objectToTransform: any, [key, value]) => {
      objectToTransform[key] = transformObjectToPath(
        key,
        value,
        concatIfExistsPath(path, suffix)
      );
      return objectToTransform;
    }, {} as T
  )
  : (concatIfExistsPath(path, suffix) as T);

@Injectable({
  providedIn: 'root'
})
export class TypedTranslateService extends GenericClass<typeof values>() {
  constructor() {
    super();
    Object.assign(this, transformObjectToPath('', values));
  }
}
