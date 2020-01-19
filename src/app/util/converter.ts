import * as moment from 'moment';
import { Validator } from './validator';

export class Converter {
  public static date2DateString(value: Date, dateFormat: String): string {
    value = this.removeStringDateUtc(value);
    let ret: string;

    if (!Validator.isNullUndefinedEmpty(value)) {
      ret = moment(value).format(dateFormat.toString());
    }
    
    return ret;
  }

  public static dateString2Date(value: String, dateFormat: String): Date {
    value = this.removeStringDateUtc(value);
    let ret: Date;

    if (!Validator.isNullUndefinedEmpty(value)) {
      const aux = moment(value.toString(), dateFormat.toString());
      if (!Validator.isNullUndefinedEmpty(aux)) {
        ret = aux.toDate();
      }
    }

    return ret;
  }

  public static dateUtcString2utcDate(value: any): Date {
    value = this.removeStringDateUtc(value);
    let ret: Date;

    if (!Validator.isNullUndefinedEmpty(value)) {
      const dt: Date = value as Date;
      let strval = '';
      if (dt) {
        const strValue = value.toString();
        const dateValue: Date = new Date(strValue.slice(0, -1));
        strval = dateValue.toISOString();
      } else {
        strval = value.toString();
      }

      const aux = moment(strval);
      if (!Validator.isNullUndefinedEmpty(aux)) {
        ret = aux.toDate();
      }
    }

    // console.log('dateUtcString2utcDate ==>', typeof value, ret, value, value.toString(), value.toISOString());
    return ret;
  }

  /**
   * Converter um Texto de Data do Oracle => um Texto de Data.
   */
  public static oracleDS2DS(value: string, oracleDateFormat: string, dateFormat: string): string {
    let ret: string = null;

    if (!Validator.isNullUndefinedEmpty(value)) {
      const aux = moment(value, oracleDateFormat);
      if (!Validator.isNullUndefinedEmpty(aux)) {
        ret = moment(aux.toDate()).format(dateFormat);
      }
    }

    return ret;
  }

  /**
   * Converter um Texto de Data Hora do Oracle => um Texto de Data Hora.
   */
  public static oracleDTS2DTS(value: string, oracleDateTimeFormat: string, dateTimeFormat: string): string {
    let ret: string = null;

    if (!Validator.isNullUndefinedEmpty(value)) {
      const aux = moment(value.toString(), oracleDateTimeFormat);
      if (!Validator.isNullUndefinedEmpty(aux)) {
        ret = moment(aux.toDate()).format(dateTimeFormat);
      }
    }

    return ret;
  }

  public static string2int(value: string): number {
    return parseInt(value, 10);
  }

  public static number2CurrencyString(value: number, currencySimbol: string = '', decimalSeparator: string = ',', thousandSeparator: string = '.'): string {
    let ret: string = null;

    if (!Validator.isNullUndefinedEmpty(value)) {
      let dp = 2;
      let n = Math.abs(Math.ceil(value)).toString();
      let i = n.length % 3;
      let f = n.substr(0, i);

      if (value < 0) f = '-' + f;

      for (; i < n.length; i += 3) {
        if (i != 0) f += thousandSeparator;
        f += n.substr(i, 3);
      }

      if (dp > 0) f += decimalSeparator + value.toFixed(dp).split('.')[1];

      if (currencySimbol) {
        ret = currencySimbol + ' ' + f;
      } else {
        ret = f;
      }
    }

    return ret;
  }

  private static removeStringDateUtc(value: any): any {
    if(!(value instanceof Date)){
      return !Validator.isNullUndefined(value) ? value.replace('Z', '') : value;
    } else {
      return value;
    }
  }

  static test() {
    const dateFormat: string = 'DD/MM/YYYY';
    const dateTimeFormat: string = 'DD/MM/YYYY hh:mm:ss';
    const oracleDateFormat: string = 'YYYY-MM-DD';
    const oracleDateTimeFormat: string = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]';

    const date1: Date = new Date();

    console.log('utcDate2dateString#1:', Converter.date2DateString(date1, dateFormat));

    console.log('dateString2utcDate#1:', Converter.dateString2Date('01/08/2016', dateFormat));
    console.log('dateString2utcDate#2:', Converter.dateString2Date('29/02/2016', dateFormat));
    console.log('dateString2utcDate#3:', Converter.dateString2Date('31/12/2016', dateFormat));
    console.log('dateString2utcDate#4:', Converter.dateString2Date('01/01/2016', dateFormat));

    console.log('oracleDateString2DateString#0', 'nulo', Converter.oracleDS2DS(null, oracleDateFormat, dateFormat));
    console.log('oracleDateString2DateString#1', '1990-01-01T03:00:00.000Z', Converter.oracleDS2DS('1990-01-01T03:00:00.000Z', oracleDateFormat, dateFormat));
    console.log('oracleDateString2DateString#2', '1962-01-18T03:00:00.000Z', Converter.oracleDS2DS('1962-01-18T03:00:00.000Z', oracleDateFormat, dateFormat));

    console.log('oracleDateString2DateString#3', 'nulo', Converter.oracleDTS2DTS(null, oracleDateTimeFormat, dateTimeFormat));
    console.log(
      'oracleDateString2DateString#4',
      '1990-01-01T03:00:00.000Z',
      Converter.oracleDTS2DTS('1990-01-01T03:00:00.000Z', oracleDateTimeFormat, dateTimeFormat)
    );
    console.log(
      'oracleDateString2DateString#5',
      '1962-01-18T03:00:00.000Z',
      Converter.oracleDTS2DTS('1962-01-18T03:00:00.000Z', oracleDateTimeFormat, dateTimeFormat)
    );

    console.log('number2CurrencyString #1', '12345.23', Converter.number2CurrencyString(12345.23, 'R$'));
    console.log('number2CurrencyString #2', '1', Converter.number2CurrencyString(1, 'R$'));
    console.log('number2CurrencyString #3', '-30.5', Converter.number2CurrencyString(-30.5, 'R$'));
    console.log('number2CurrencyString #4 sem o símbolo', '123232345445.23456', Converter.number2CurrencyString(123232345445.23456));
  }
}

Object.seal(Converter);
