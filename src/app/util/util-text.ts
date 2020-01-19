import { Validator } from './validator';

export class UtilText {
  static replaceAll(value: string, searchValue: string, replaceValue: string): string {
    let ret = value;
    if (ret) {
      ret = value.split(searchValue).join(replaceValue);
    }
    return ret;
  }

  static stringToBoolean(value: string): boolean {
    if (value) {
      switch (value.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
        case 't':
          return true;
        case 'false':
        case 'no':
        case '0':
        case 'f':
        case null:
          return false;
        default:
          return Boolean(value);
      }
    } else {
      return undefined;
    }
  }

  static contains(value: string, searchValue: string, ignoreCase: boolean = false, removeAccents: boolean = false): boolean {
    if (removeAccents) {
      value = UtilText.accentFolding(value);
      searchValue = UtilText.accentFolding(searchValue);
    }

    if (ignoreCase) {
      return (
        value
          .toString()
          .toUpperCase()
          .search(searchValue.toString().toUpperCase()) >= 0
      );
    } else {
      return value.search(searchValue) >= 0;
    }
  }

  static accentFolding(value: string): string {
    const accent_map = {
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      æ: 'a', // a
      ç: 'c', // c
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e', // e
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i', // i
      ñ: 'n', // n
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ø: 'o', // o
      ß: 's', // s
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u', // u
      ÿ: 'y', // y
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      Æ: 'A', // A
      Ç: 'C', // C
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E', // E
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I', // I
      Ñ: 'N', // N
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ø: 'O', // O
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U', // U
      Ÿ: 'Y' // Y
    };

    if (Validator.isNullUndefinedEmpty(value)) {
      return '';
    } else {
      let ret = '';
      for (let i = 0; i < value.length; i++) {
        ret += accent_map[value.charAt(i)] || value.charAt(i);
      }
      return ret;
    }
  }

  static decodeHtmlEntities(str): string {
    // html entities reference -> https://dev.w3.org/html5/html-author/charref

    if (!Validator.isNullUndefinedEmpty(str)) {
      // prettier-ignore
      const HTML_ESC_MAP = {
        "nbsp": " ", "iexcl": "¡", "cent": "¢", "pound": "£", "curren": "¤", "yen": "¥",
        "brvbar": "¦", "sect": "§", "uml": "¨", "copy": "©", "ordf": "ª", "laquo": "«",
        "not": "¬", "reg": "®", "macr": "¯", "deg": "°", "plusmn": "±", "sup2": "²",
        "sup3": "³", "acute": "´", "micro": "µ", "para": "¶", "middot": "·", "cedil": "¸",
        "sup1": "¹", "ordm": "º", "raquo": "»", "frac14": "¼", "frac12": "½", "frac34": "¾",
        "iquest": "¿", "Agrave": "À", "Aacute": "Á", "Acirc": "Â", "Atilde": "Ã", "Auml": "Ä",
        "Aring": "Å", "AElig": "Æ", "Ccedil": "Ç", "Egrave": "È", "Eacute": "É", "Ecirc": "Ê",
        "Euml": "Ë", "Igrave": "Ì", "Iacute": "Í", "Icirc": "Î", "Iuml": "Ï", "ETH": "Ð",
        "Ntilde": "Ñ", "Ograve": "Ò", "Oacute": "Ó", "Ocirc": "Ô", "Otilde": "Õ", "Ouml": "Ö",
        "times": "×", "Oslash": "Ø", "Ugrave": "Ù", "Uacute": "Ú", "Ucirc": "Û", "Uuml": "Ü",
        "Yacute": "Ý", "THORN": "Þ", "szlig": "ß", "agrave": "à", "aacute": "á", "acirc": "â",
        "atilde": "ã", "auml": "ä", "aring": "å", "aelig": "æ", "ccedil": "ç", "egrave": "è",
        "eacute": "é", "ecirc": "ê", "euml": "ë", "igrave": "ì", "iacute": "í", "icirc": "î",
        "iuml": "ï", "eth": "ð", "ntilde": "ñ", "ograve": "ò", "oacute": "ó", "ocirc": "ô",
        "otilde": "õ", "ouml": "ö", "divide": "÷", "oslash": "ø", "ugrave": "ù", "uacute": "ú",
        "ucirc": "û", "uuml": "ü", "yacute": "ý", "thorn": "þ", "yuml": "ÿ", "fnof": "ƒ",
        "Alpha": "Α", "Beta": "Β", "Gamma": "Γ", "Delta": "Δ", "Epsilon": "Ε", "Zeta": "Ζ",
        "Eta": "Η", "Theta": "Θ", "Iota": "Ι", "Kappa": "Κ", "Lambda": "Λ", "Mu": "Μ", "Nu": "Ν",
        "Xi": "Ξ", "Omicron": "Ο", "Pi": "Π", "Rho": "Ρ", "Sigma": "Σ", "Tau": "Τ", "Upsilon": "Υ",
        "Phi": "Φ", "Chi": "Χ", "Psi": "Ψ", "Omega": "Ω", "alpha": "α", "beta": "β", "gamma": "γ",
        "delta": "δ", "epsilon": "ε", "zeta": "ζ", "eta": "η", "theta": "θ", "iota": "ι", "kappa": "κ",
        "lambda": "λ", "mu": "μ", "nu": "ν", "xi": "ξ", "omicron": "ο", "pi": "π", "rho": "ρ",
        "sigmaf": "ς", "sigma": "σ", "tau": "τ", "upsilon": "υ", "phi": "φ", "chi": "χ", "psi": "ψ",
        "omega": "ω", "thetasym": "ϑ", "upsih": "ϒ", "piv": "ϖ", "bull": "•", "hellip": "…", "prime": "′",
        "Prime": "″", "oline": "‾", "frasl": "⁄", "weierp": "℘", "image": "ℑ", "real": "ℜ", "trade": "™",
        "alefsym": "ℵ", "larr": "←", "uarr": "↑", "rarr": "→", "darr": "↓", "harr": "↔", "crarr": "↵",
        "lArr": "⇐", "uArr": "⇑", "rArr": "⇒", "dArr": "⇓", "hArr": "⇔", "forall": "∀", "part": "∂",
        "exist": "∃", "empty": "∅", "nabla": "∇", "isin": "∈", "notin": "∉", "ni": "∋", "prod": "∏",
        "sum": "∑", "minus": "−", "lowast": "∗", "radic": "√", "prop": "∝", "infin": "∞", "ang": "∠",
        "and": "∧", "or": "∨", "cap": "∩", "cup": "∪", "int": "∫", "there4": "∴", "sim": "∼", "cong": "≅",
        "asymp": "≈", "ne": "≠", "equiv": "≡", "le": "≤", "ge": "≥", "sub": "⊂", "sup": "⊃", "nsub": "⊄",
        "sube": "⊆", "supe": "⊇", "oplus": "⊕", "otimes": "⊗", "perp": "⊥", "sdot": "⋅", "lceil": "⌈",
        "rceil": "⌉", "lfloor": "⌊", "rfloor": "⌋", "lang": "〈", "rang": "〉", "loz": "◊", "spades": "♠",
        "clubs": "♣", "hearts": "♥", "diams": "♦", "\"": "quot", "amp": "&", "lt": "<", "gt": ">", "OElig": "Œ",
        "oelig": "œ", "Scaron": "Š", "scaron": "š", "Yuml": "Ÿ", "circ": "ˆ", "tilde": "˜", "ndash": "–",
        "mdash": "—", "lsquo": "‘", "rsquo": "’", "sbquo": "‚", "ldquo": "“", "rdquo": "”", "bdquo": "„",
        "dagger": "†", "Dagger": "‡", "permil": "‰", "lsaquo": "‹", "rsaquo": "›", "euro": "€",
        "lcub": "{", "lbrace": "{", "rcub": "}", "rbrace": "}", "colon": ":", "slash": "/"
      };

      const regex = new RegExp('&(' + Object.keys(HTML_ESC_MAP).join('|') + ');', 'g');
      return str
        ? str.toString().replace(regex, function (x) {
          return HTML_ESC_MAP[x.substring(1, x.length - 1)] || x;
        })
        : str;
    } else {
      return str;
    }
  }

  static encodeHtmlEntities(str): string {
    if (!Validator.isNullUndefinedEmpty(str)) {
      // prettier-ignore
      const HTML_ESC_MAP = {
        " ": "nbsp", "¡": "iexcl", "¢": "cent", "£": "pound", "¤": "curren", "¥": "yen",
        "¦": "brvbar", "§": "sect", "¨": "uml", "©": "copy", "ª": "ordf", "«": "laquo",
        "¬": "not", "®": "reg", "¯": "macr", "°": "deg", "±": "plusmn", "²": "sup2",
        "³": "sup3", "´": "acute", "µ": "micro", "¶": "para", "·": "middot", "¸": "cedil",
        "¹": "sup1", "º": "ordm", "»": "raquo", "¼": "frac14", "½": "frac12", "¾": "frac34",
        "¿": "iquest", "À": "Agrave", "Á": "Aacute", "Â": "Acirc", "Ã": "Atilde", "Ä": "Auml",
        "Å": "Aring", "Æ": "AElig", "Ç": "Ccedil", "È": "Egrave", "É": "Eacute", "Ê": "Ecirc",
        "Ë": "Euml", "Ì": "Igrave", "Í": "Iacute", "Î": "Icirc", "Ï": "Iuml", "Ð": "ETH",
        "Ñ": "Ntilde", "Ò": "Ograve", "Ó": "Oacute", "Ô": "Ocirc", "Õ": "Otilde", "Ö": "Ouml",
        "×": "times", "Ø": "Oslash", "Ù": "Ugrave", "Ú": "Uacute", "Û": "Ucirc", "Ü": "Uuml",
        "Ý": "Yacute", "Þ": "THORN", "ß": "szlig", "à": "agrave", "á": "aacute", "â": "acirc",
        "ã": "atilde", "ä": "auml", "å": "aring", "æ": "aelig", "ç": "ccedil", "è": "egrave",
        "é": "eacute", "ê": "ecirc", "ë": "euml", "ì": "igrave", "í": "iacute", "î": "icirc",
        "ï": "iuml", "ð": "eth", "ñ": "ntilde", "ò": "ograve", "ó": "oacute", "ô": "ocirc",
        "õ": "otilde", "ö": "ouml", "÷": "divide", "ø": "oslash", "ù": "ugrave", "ú": "uacute",
        "û": "ucirc", "ü": "uuml", "ý": "yacute", "þ": "thorn", "ÿ": "yuml", "ƒ": "fnof",
        "Α": "Alpha", "Β": "Beta", "Γ": "Gamma", "Δ": "Delta", "Ε": "Epsilon", "Ζ": "Zeta",
        "Η": "Eta", "Θ": "Theta", "Ι": "Iota", "Κ": "Kappa", "Λ": "Lambda", "Μ": "Mu", "Ν": "Nu",
        "Ξ": "Xi", "Ο": "Omicron", "Π": "Pi", "Ρ": "Rho", "Σ": "Sigma", "Τ": "Tau", "Υ": "Upsilon",
        "Φ": "Phi", "Χ": "Chi", "Ψ": "Psi", "Ω": "Omega", "α": "alpha", "β": "beta", "γ": "gamma",
        "δ": "delta", "ε": "epsilon", "ζ": "zeta", "η": "eta", "θ": "theta", "ι": "iota", "κ": "kappa",
        "λ": "lambda", "μ": "mu", "ν": "nu", "ξ": "xi", "ο": "omicron", "π": "pi", "ρ": "rho",
        "ς": "sigmaf", "σ": "sigma", "τ": "tau", "υ": "upsilon", "φ": "phi", "χ": "chi", "ψ": "psi",
        "ω": "omega", "ϑ": "thetasym", "ϒ": "upsih", "ϖ": "piv", "•": "bull", "…": "hellip", "′": "prime",
        "″": "Prime", "‾": "oline", "⁄": "frasl", "℘": "weierp", "ℑ": "image", "ℜ": "real", "™": "trade",
        "ℵ": "alefsym", "←": "larr", "↑": "uarr", "→": "rarr", "↓": "darr", "↔": "harr", "↵": "crarr",
        "⇐": "lArr", "⇑": "uArr", "⇒": "rArr", "⇓": "dArr", "⇔": "hArr", "∀": "forall", "∂": "part",
        "∃": "exist", "∅": "empty", "∇": "nabla", "∈": "isin", "∉": "notin", "∋": "ni", "∏": "prod",
        "∑": "sum", "−": "minus", "∗": "lowast", "√": "radic", "∝": "prop", "∞": "infin", "∠": "ang",
        "∧": "and", "∨": "or", "∩": "cap", "∪": "cup", "∫": "int", "∴": "there4", "∼": "sim", "≅": "cong",
        "≈": "asymp", "≠": "ne", "≡": "equiv", "≤": "le", "≥": "ge", "⊂": "sub", "⊃": "sup", "⊄": "nsub",
        "⊆": "sube", "⊇": "supe", "⊕": "oplus", "⊗": "otimes", "⊥": "perp", "⋅": "sdot", "⌈": "lceil",
        "⌉": "rceil", "⌊": "lfloor", "⌋": "rfloor", "〈": "lang", "〉": "rang", "◊": "loz", "♠": "spades",
        "♣": "clubs", "♥": "hearts", "♦": "diams", "quot": "\"", "&": "amp", "<": "lt", ">": "gt", "Œ": "OElig",
        "œ": "oelig", "Š": "Scaron", "š": "scaron", "Ÿ": "Yuml", "ˆ": "circ", "˜": "tilde", "–": "ndash",
        "—": "mdash", "‘": "lsquo", "’": "rsquo", "‚": "sbquo", "“": "ldquo", "”": "rdquo", "„": "bdquo",
        "†": "dagger", "‡": "Dagger", "‰": "permil", "‹": "lsaquo", "›": "rsaquo", "€": "euro",
        "{": "lcub", "}": "rcub", ":": "colon", "/": "slash"

      };
      var regexString = '[';
      for (var key in HTML_ESC_MAP) {
        regexString += key;
      }
      regexString += ']';

      const regex = new RegExp(regexString, 'g');

      return str
        ? str.toString().replace(regex, function (x) {
          if (!Validator.isNullUndefined(HTML_ESC_MAP[x])) {
            return '&' + HTML_ESC_MAP[x] + ';';
          } else {
            return x;
          }
        })
        : str;
    } else {
      return str;
    }
  }

  static test() {
    // replaceAll()

    // stringToBoolean()

    // contains()
    let texto: string = 'joão da silva sauro';
    let stexto1: string = 'SIL';
    console.log('Teste#1.1 - contains:', texto, stexto1, true, false, UtilText.contains(texto, stexto1, true, false));
    console.log('Teste#1.2 - contains:', texto, stexto1, false, false, UtilText.contains(texto, stexto1, false, false));
    let stexto2: string = 'joão';
    console.log('Teste#2.1 - contains:', texto, stexto2, true, false, UtilText.contains(texto, stexto2, true, false));
    console.log('Teste#2.2 - contains:', texto, stexto2, false, false, UtilText.contains(texto, stexto2, false, false));
    let stexto3: string = 'joÃo';
    console.log('Teste#3.1 - contains:', texto, stexto3, true, false, UtilText.contains(texto, stexto3, true, false));
    console.log('Teste#3.2 - contains:', texto, stexto3, false, false, UtilText.contains(texto, stexto3, false, false));
    let stexto4: string = 'maria';
    console.log('Teste#4.1 - contains:', texto, stexto4, true, false, UtilText.contains(texto, stexto4, true, false));
    console.log('Teste#4.2 - contains:', texto, stexto4, false, false, UtilText.contains(texto, stexto4, false, false));
    let stexto5: string = 'JoAo';
    console.log('Teste#5.1 - contains:', texto, stexto5, true, false, UtilText.contains(texto, stexto5, true, false));
    console.log('Teste#5.2 - contains:', texto, stexto5, false, false, UtilText.contains(texto, stexto5, false, false));
    console.log('Teste#5.3 - contains:', texto, stexto5, true, true, UtilText.contains(texto, stexto5, true, true));
    console.log('Teste#5.4 - contains:', texto, stexto5, false, true, UtilText.contains(texto, stexto5, false, true));

    // accentFolding()
    texto = 'aceinosuyACEINOSUYàáâãäåæçèéêëæìíîïñòóôõöøßùúûüÿÀÁÂÃÄÅÆÇÈÉÊËÆÌÍÎÏÑÒÓÔÕÖØßÙÚÛÜŸaceinosuyACEINOSUY';
    console.log('Teste#1 - accentFolding:', texto, UtilText.accentFolding(texto));
  }
}

Object.seal(UtilText);
