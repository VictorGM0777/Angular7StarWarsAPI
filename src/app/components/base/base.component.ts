import { Injectable, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Validator } from 'src/app/util/validator';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export abstract class BaseComponent implements OnInit {
  constructor(
    public servicoTraducao?: TranslateService,
    public zone?: NgZone,
    public changeDetectorRef?: ChangeDetectorRef
  ) {
  }

  ngOnInit() {}

  // forcar redesenho da tela
  render(): void {
    if (!Validator.isNullUndefined(this.zone)) {
      this.zone.run(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  internacionalizacao(chaveInternacionalizacao: string) {
    let textoInternacionalizado = this.servicoTraducao.instant(chaveInternacionalizacao);

    this.servicoTraducao.get(chaveInternacionalizacao).subscribe(value => {
      this.servicoTraducao.onLangChange.subscribe((event: LangChangeEvent) => {
        textoInternacionalizado = this.servicoTraducao.instant(chaveInternacionalizacao);
      });
    });

    return textoInternacionalizado;
  }

  getIdioma() {
    let idioma = this.servicoTraducao.currentLang;

    this.servicoTraducao.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      idioma = langChangeEvent.lang;
    });

    return idioma;
  }

  // Bloqueio de toda e qualquer string
  keyDownOnlyNumber(event: KeyboardEvent) {
    let keycode = 0;

    if (window.event) {
      keycode = event.keyCode; // IE
    } else {
      keycode = event.which; // Firefox
    }

    // console.log('KEYDOWN =>', event.charCode, event.keyCode, keycode, event.which, event.shiftKey, event.getModifierState('Shift'));
    // valida senão está com SHIFT pressionado.
    if (!event.getModifierState('Shift')) {
      // valida se foi uma das teclas permitidas precionadas.
      // Numpad0 = 96 | Numpad9 = 105
      // 0 = 48 | 9 = 57
      // Backspace = 8
      if (!((keycode > 95 && keycode < 106) || (keycode > 47 && keycode < 58) || keycode === 8 || keycode === 9)) {
        return false;
      }
    } else {
      return false;
    }
  }

  // Bloqueio tudo que não for número
  keyUpOnlyNumber(event: KeyboardEvent) {
    // console.log('KEYUP#1 =>', window.event);
    let keycode = 0;

    if (window.event) {
      keycode = event.keyCode; // IE
    } else {
      keycode = event.which; // Firefox
    }

    // console.log('KEYUP =>', event.charCode, event.keyCode, keycode, event.which, event.shiftKey, event.getModifierState('Shift'));
    // valida senão está com SHIFT pressionado.
    if (event.shiftKey === false) {
      // valida se foi uma das teclas permitidas precionadas.
      // Numpad0 = 96 | Numpad9 = 105
      // 0 = 48 | 9 = 57
      // Backspace = 8
      if (!((keycode > 95 && keycode < 106) || (keycode > 47 && keycode < 58) || keycode === 8)) {
        return false;
      }
    } else {
      return false;
    }
  }

  keyPressOnlyNumber(event: KeyboardEvent) {
    let keycode = 0;

    if (window.event) {
      keycode = event.keyCode; // IE
    } else {
      keycode = event.which; // Firefox
    }

    // console.log('KEYPRESS =>', event.charCode, event.keyCode, keycode, event.which, event.shiftKey, event.getModifierState('Shift'));
    // valida senão está com SHIFT pressionado.
    if (event.shiftKey === false) {
      // valida se foi uma das teclas permitidas precionadas.
      // Numpad0 = 96 | Numpad9 = 105
      // 0 = 48 | 9 = 57
      // Backspace = 8
      if (!((keycode > 95 && keycode < 106) || (keycode > 47 && keycode < 58) || keycode === 8)) {
        return false;
      }
    } else {
      return false;
    }
  }
}
