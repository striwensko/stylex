// @author: somibuon, Duc Hoang
// TODO: need more review

import * as css from 'csstype';

type PseudoStyles = {
  ":first-child"?: css.Properties;
  ":last-child"?: css.Properties;
  ":hover"?: css.Properties;
  ":focus"?: css.Properties;
  ":selected"?: css.Properties;
};

type CssStyles = css.Properties & PseudoStyles;

type ClearCSSFields = {
  [Property in keyof css.Properties]: null;
};
export type RemoveUnusedStyles<ApprovedStyles> = {
  [Property in keyof ClearCSSFields as Exclude<
    Property,
    keyof ApprovedStyles
  >]: null;
} &
  ApprovedStyles;

export type Opaque<K, T> = T & {__TYPE__: K};
export type StyleX$CSS<T> = Opaque<"Styles", RemoveUnusedStyles<T>>;
export type CompiledStyles<Type extends CssStyles> = {
  [Property in keyof Omit<Type, keyof PseudoStyles>]: Opaque<"Styles", Type[Property]>;
};

// tslint:disable-next-line:export-just-namespace
export = stylex;
export as namespace stylex;

declare function stylex(...style: ( Opaque<"Styles", {[key : string]:any}> | (null | Opaque<"Styles", {[key : string]:any}>)[])[]): string;


declare namespace stylex {
  function create<T extends Record<string, CssStyles>>(styles: T ): CompiledStyles<T>; 

  function dedupe(...styles: CssStyles[]): string;

  // TODO: maybe remove in next release
  function compose(...styles: CssStyles[]): CssStyles;

  function keyframes(rules: CssStyles): string;

  function inject(cssString: string): void;
}
