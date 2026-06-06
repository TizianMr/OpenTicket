import { Pipe, PipeTransform } from '@angular/core';

/**
 * Angular pipe to transform enum-like string values into human-readable text.
 *
 * Example: 'MY_ENUM_VALUE' -> 'My enum value'
 */
@Pipe({
  name: 'enumTransform',
})
export class EnumTransformPipe implements PipeTransform {
  transform(value: string): string;
  transform(value: null | undefined): null;
  transform(value: string | null | undefined): string | null;
  transform(value: string | null | undefined): string | null {
    if (value == null) return null;

    return value[0].toUpperCase() + value.slice(1).replaceAll('_', ' ').toLowerCase();
  }
}
