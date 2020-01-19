import { UtilText } from './util-text';

export class Validator {
  public static isEmail(value: String): Boolean {
    let ret: Boolean = false;

    if (!this.isNullUndefinedEmpty(value)) {
      const strongRegex = new RegExp('^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$', 'i');
      if (strongRegex.test(value.toString())) {
        ret = true;
      }
    }
    return ret;
  }

  public static isSecurePassword(value: String): Boolean {
    /************** REGRA APLICADA  **************
     * RegEx	            Description
     * -----------------------------------------------------------------------------------------
     * ^	                A string da senha vai iniciar nessa sequencia.
     * (?=.{6,})	        A string precisa ter 6 caracteres ou mais.
     * (?=.*[a-z])	        A string precisa ter ao menos 1 caracter alfabetico minusculo.
     * (?=.*[A-Z])	        A string precisa ter ao menos 1 caracter alfabetico maiusculo.
     * (?=.*[0-9])	        A string precisa ter ao menos 1 caracter numerico.
     * (?=.*[!@#\$%\^&\*])	A string precisa ter ao menos 1 caracter especial,
     *                      mas estamos ignorando os caracteres reservados do RegEx para evitar erros.
     */

    let ret: Boolean = false;

    if (value !== undefined) {
      const strongRegex = new RegExp('^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
      if (strongRegex.test(value.toString())) {
        ret = true;
      }
    }

    return ret;

    /************** EXEMPLOS **************
     * RegEx	            Description
     * -----------------------------------------------------------------------------------------
     * ^	                The password string will start this way.
     * (?=.*[a-z])	        The string must contain at least 1 lowercase alphabetical character.
     * (?=.*[A-Z])	        The string must contain at least 1 uppercase alphabetical character.
     * (?=.*[0-9])	        The string must contain at least 1 numeric character.
     * (?=.*[!@#\$%\^&\*])	The string must contain at least one special character,
     *                      but we are escaping reserved RegEx characters to avoid conflict.
     * (?=.{8,})	        The string must be eight characters or longer.
     */
    // let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    // let mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
  }

  // Valida se o valor é um Array
  static isArray(value: any): Boolean {
    if (value instanceof Array) {
      return true;
    } else {
      return false;
    }
  }

  static isArrayWithItems(value: any): Boolean {
    if (!this.isNullUndefined(value) && this.isArray(value)) {
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static isNumber(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  // Valida se o valor é nulo, undefined, ou vazio
  static isNullUndefinedEmpty(value: any, trimText: boolean = false) {
    if (trimText && typeof value === 'string') {
      value = value.trim();
    }

    if (value === undefined || value === null || value === '') {
      return true;
    } else {
      return false;
    }
  }

  // Valida se o valor é nulo ou undefined
  static isNullUndefined(value: any) {
    if (value === undefined || value === null) {
      return true;
    } else {
      return false;
    }
  }

  static isEqual(str1: string, str2: string, ignoreCase: boolean = false): boolean {
    let ret = false;
    if (ignoreCase) {
      ret =
        (str1 === undefined && str2 === undefined) ||
        (str1 === null && str2 === null) ||
        (str1 != null && str2 != null && typeof str1 === 'string' && typeof str2 === 'string' && str1.toUpperCase() === str2.toUpperCase());
    } else {
      ret =
        (str1 === undefined && str2 === undefined) ||
        (str1 === null && str2 === null) ||
        (str1 != null && str2 != null && typeof str1 === 'string' && typeof str2 === 'string' && str1 === str2);
    }
    return ret;
  }

  static isEquals(value: string, ...equals: string[]): boolean {
    let ret = false;

    for (let i: number = 0; i < equals.length; i++) {
      if (this.isEqual(value, equals[i], false)) {
        ret = true;
        break;
      }
    }

    return ret;
  }

  static isEqualsIgnoreCase(value: string, ...equals: string[]): boolean {
    let ret = false;

    for (let i: number = 0; i < equals.length; i++) {
      if (this.isEqual(value, equals[i], true)) {
        ret = true;
        break;
      }
    }

    return ret;
  }

  static isObjectIdEqual(obj1: any, obj2: any): boolean {
    let ret = false;

    let id1: string = null;
    if (obj1['_id']) {
      id1 = typeof obj1['_id'] === 'string' ? obj1['_id'].toString() : obj1['_id'].toHexString();
    }

    let id2: string = null;
    if (obj2['_id']) {
      id2 = typeof obj2['_id'] === 'string' ? obj2['_id'].toString() : obj2['_id'].toHexString();
    }

    ret = id1 === id2;
    return ret;
  }

  static isEnumEqual(obj1: number | string, obj2: number | string): boolean {
    let ret = false;

    if (typeof obj1 === 'number') {
      ret = obj1.valueOf() === obj2.valueOf();
    } else {
      ret = obj1.toString() === obj2.toString();
    }

    return ret;
  }

  static isEnumGreaterEqual(obj1: number, obj2: number): boolean {
    let ret = false;

    ret = obj1.valueOf() >= obj2.valueOf();

    return ret;
  }

  static isRegExp(text: string, pattern: string): Boolean {
    const regexp = new RegExp(pattern);
    return regexp.test(text);
  }

  // Valida se o valor é nulo ou undefined, caso seja, retorna o parâmetro valorRetornoSeNulo, senão retorna o próprio valor.
  static tratarNullUndefined(valor: any, valorRetornoSeNulo: any = ''): any {
    if (valor === undefined || valor === null) {
      return valorRetornoSeNulo;
    } else {
      return valor;
    }
  }

  /**
   * Valida se é um nome de arquivo válido para linux ou windows.
   *
   * @static
   * @param {string} filename nome do arquivo a ser criado.
   * @returns {Boolean} se é válido ou não.
   * @memberof Validator
   */
  static isFilename(filename: string): Boolean {
    const f: RegExp = /[<>:"\/\\|?*\x00-\x1F]/g;
    const fWindows: RegExp = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;

    if (!filename || filename.length > 255) {
      return false;
    }

    if (f.test(filename) || fWindows.test(filename)) {
      return false;
    }

    if (/^\.\.?$/.test(filename)) {
      return false;
    }

    return true;
  }

  static isCpfCnpj(doc: string): Boolean {
    if (Validator.isNullUndefinedEmpty(doc)) {
      return false;
    } else if (doc.length === 11) {
      return this.isCpf(doc);
    } else if (doc.length === 14) {
      return this.isCnpj(doc);
    } else {
      return false;
    }
  }

  static isCpf(doc: string): Boolean {
    // Elimina caracteres.
    doc = UtilText.replaceAll(doc, '.', '');
    doc = UtilText.replaceAll(doc, '-', '');

    if (
      this.isNullUndefinedEmpty(doc) ||
      doc.length !== 11 ||
      this.isEquals(
        doc,
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
      )
    ) {
      return false;
    }

    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = doc.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (doc !== cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  static isCnpj(doc: string): Boolean {
    // Elimina caracteres.
    doc = UtilText.replaceAll(doc, '.', '');
    doc = UtilText.replaceAll(doc, '-', '');
    doc = UtilText.replaceAll(doc, '/', '');

    // Elimina CNPJs nulos, tamanho errado e CNPJs invalidos conhecidos
    if (
      this.isNullUndefinedEmpty(doc) ||
      doc.length !== 14 ||
      this.isEquals(
        doc,
        '00000000000000',
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999'
      )
    ) {
      return false;
    }

    // Valida DVs
    let tamanho: number = doc.length - 2;
    let numeros: string = doc.substring(0, tamanho);
    let digitos: string = doc.substring(tamanho);
    let soma: number = 0;
    let pos: number = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado: number = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number.parseInt(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = doc.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i: number = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number.parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  }

  /**
   * Verifica se é um telefone válido.
   *
   * @param areaNumber Código da área do telefone - DDD
   * @param foneNumber Número do telefone
   * @param isCellphone Se é um telefone celular, se for valida com 9 dígitos, senão com 8 dígitos.
   */
  static isFoneNumber(areaNumber: string, foneNumber: string, isCellphone: boolean = false): Boolean {
    // validar o código de área.
    if (areaNumber.startsWith('0')) {
      areaNumber = areaNumber.substr(1);
    }
    if (!this.isNumber(areaNumber)) {
      return false;
    }
    if (areaNumber.length < 2) {
      return false;
    }

    // validar o telefone.
    foneNumber = foneNumber.trim();
    if (foneNumber.startsWith('0')) {
      return false;
    }
    if (foneNumber.length < 8) {
      return false;
    }
    if (isCellphone) {
      foneNumber = foneNumber.substr(0, 9).trim();
      if (foneNumber.length !== 9) {
        return false;
      }
    } else {
      if (foneNumber.length > 8) {
        return false;
      }
      foneNumber = foneNumber.substr(0, 8).trim();
      if (foneNumber.length !== 8) {
        return false;
      }
    }
    if (!this.isNumber(foneNumber)) {
      return false;
    }

    return true;
  }

  static test() {
    // isEmail
    const email1: String = 'joão da silva sauro';
    console.log('Teste#1 - isEmail:', email1, Validator.isEmail(email1));
    const email2: String = 'joãodasilva@sauro';
    console.log('Teste#2 - isEmail:', email2, Validator.isEmail(email2));
    const email3: String = 'joaoda@silva.sauro';
    console.log('Teste#3 - isEmail:', email3, Validator.isEmail(email3));

    // isSecurePassword
    const pass1: String = '1234';
    console.log('Teste#1 - isSecurePassword:', pass1, Validator.isSecurePassword(pass1));
    const pass2: String = 'teste123';
    console.log('Teste#2 - isSecurePassword:', pass2, Validator.isSecurePassword(pass2));
    const pass3: String = 'JoAo@silva123';
    console.log('Teste#3 - isSecurePassword:', pass3, Validator.isSecurePassword(pass3));

    // isArray
    const arr1: any = null;
    const arr2: any = '1234';
    const arr3: any = ['1234', 'erer', 'fsdf'];
    console.log('Teste#1 - isArray:', arr1, Validator.isArray(arr1));
    console.log('Teste#2 - isArray:', arr2, Validator.isArray(arr2));
    console.log('Teste#3 - isArray:', arr3, Validator.isArray(arr3));

    // isNullUndefinedEmpty
    const nulo1: String = 'joão';
    console.log('Teste#1 - isNullUndefinedEmpty:', nulo1, Validator.isNullUndefinedEmpty(nulo1));
    const nulo2: String = null;
    console.log('Teste#2 - isNullUndefinedEmpty:', nulo2, Validator.isNullUndefinedEmpty(nulo2));
    const nulo3: String = null;
    console.log('Teste#3 - isNullUndefinedEmpty:', nulo3, Validator.isNullUndefinedEmpty(nulo3));
    const nulo4: String = '';
    console.log('Teste#4 - isNullUndefinedEmpty:', nulo4, Validator.isNullUndefinedEmpty(nulo4));

    // isEqual
    console.log('Teste#1 - isEqual: ', 'teste', 'Teste', Validator.isEqual('teste', 'Teste'));
    console.log('Teste#1 - isEqual: ignoreCase', 'teste', 'Teste', Validator.isEqual('teste', 'Teste', true));

    // isRegExp
    console.log('Teste#1 - isRegExp:', 'nome do Arquivo ? /  ', '/[a-zA-Z0-9_]/g', Validator.isRegExp('nome do Arquivo ? /  ', '/[a-zA-Z0-9_]/g'));
    console.log('Teste#2 - isRegExp:', 'nome_do_ARquivo-001', '/[a-zA-Z0-9_]/g', Validator.isRegExp('nome_do_ARquivo-001', '/[a-zA-Z0-9_]/g'));
    console.log('Teste#3 - isRegExp:', 'nome do Arquivo ? /  ', '[a-zA-Z0-9_]', Validator.isRegExp('nome do Arquivo ? /  ', '[a-zA-Z0-9_]'));
    console.log('Teste#4 - isRegExp:', 'nome_do_ARquivo-001', '[a-zA-Z0-9_]', Validator.isRegExp('nome_do_ARquivo-001', '[a-zA-Z0-9_]'));
    console.log('Teste#5 - isRegExp:', 'nome do Arquivo ? /  ', '[a-zA-Z0-9]', Validator.isRegExp('nome do Arquivo ? /  ', '[a-zA-Z0-9]'));
    console.log('Teste#6 - isRegExp:', 'nome_do_ARquivo-001', '[a-zA-Z0-9]', Validator.isRegExp('nome_do_ARquivo-001', '[a-zA-Z0-9]'));

    // isFilename
    console.log('Teste#1 - isFilename:', 'foo/bar', Validator.isFilename('foo/bar'));
    console.log('Teste#2 - isFilename:', 'foo\x00bar', Validator.isFilename('foo\x00bar'));
    console.log('Teste#3 - isFilename:', 'foo\x1Fbar', Validator.isFilename('foo\x1Fbar'));
    console.log('Teste#4 - isFilename:', 'foo*bar', Validator.isFilename('foo*bar'));
    console.log('Teste#5 - isFilename:', 'foo\\bar', Validator.isFilename('foo\\bar'));
    console.log('Teste#6 - isFilename:', 'foo:bar', Validator.isFilename('foo:bar'));
    console.log('Teste#7 - isFilename:', 'foo-bar', Validator.isFilename('foo-bar'));
    console.log('Teste#8 - isFilename:', 'foo_bar', Validator.isFilename('foo_bar'));
    console.log('Teste#9 - isFilename:', 'AUX', Validator.isFilename('AUX'));
    console.log('Teste#10 - isFilename:', 'AUX Teste', Validator.isFilename('AUX Teste'));
    console.log('Teste#11 - isFilename:', 'com1', Validator.isFilename('com1'));
    console.log('Teste#12 - isFilename:', 'Com1_Com2-Com3 Com4', Validator.isFilename('Com1_Com2-Com3 Com4'));

    // isCpf
    console.log('Teste#1 - isCpf: ', '27811059886', Validator.isCpf('27811059886'));
    console.log('Teste#2 - isCpf: ', '27811059888', Validator.isCpf('27811059888'));
    console.log('Teste#3 - isCpf: ', 'NULL', Validator.isCpf(null));
    console.log('Teste#4 - isCpf: ', '278.110.598-86', Validator.isCpf('278.110.598-86'));

    // isCnpj
    console.log('Teste#1 - isCnpj: ', '03186792000129', Validator.isCnpj('03186792000129'));
    console.log('Teste#2 - isCnpj: ', '03186792000100', Validator.isCnpj('03186792000100'));
    console.log('Teste#3 - isCnpj: ', 'NULL', Validator.isCnpj(null));
    console.log('Teste#4 - isCnpj: ', '03.186.792/0001-29', Validator.isCnpj('03.186.792/0001-29'));
    console.log('Teste#5 - isCnpj: ', '04.065.791/0001-99', Validator.isCnpj('04.065.791/0001-99'));

    // isFoneNumber
    console.log('Teste#1 - isFoneNumber: ', '011 31267426', Validator.isFoneNumber('011', '31267426'));
    console.log('Teste#2 - isFoneNumber: ', '011 31267426 true', Validator.isFoneNumber('011', '31267426', true));
    console.log('Teste#3 - isFoneNumber: ', '11 931267426', Validator.isFoneNumber('11', '931267426'));
    console.log('Teste#4 - isFoneNumber: ', '11 931267426 true', Validator.isFoneNumber('11', '931267426', true));
    console.log('Teste#5 - isFoneNumber: ', 'D11 3126 7426', Validator.isFoneNumber('D11', '3126 7426'));
    console.log('Teste#6 - isFoneNumber: ', 'D11 3126 7426 true', Validator.isFoneNumber('D11', '3126 7426', true));
  }
}

Object.seal(Validator);
