'use client';
/**
 * The Uptaco website's semantic DOM implementation.
 *
 * Product screens import only @acme/ui/html, never literal DOM primitives.
 * Expo/iOS/Android retain the existing @expo/html-elements + @expo/ui native
 * implementation in index.tsx. This explicit web fork preserves real DOM
 * className selectors, required by Uptaco's editorial responsive design.
 *
 * Unlike the react-native-css styleq bridge, custom class selectors must not
 * disappear when passed to native-web elements. The web boundary deliberately
 * renders actual semantic browser elements here, and nowhere in feature code.
 */
import React, { type ReactNode } from 'react';

type Props<E extends HTMLElement> = React.HTMLAttributes<E> & { children?: ReactNode };

export const Page = (props: Props<HTMLDivElement>) => <div {...props}/>;
export const Main = (props: Props<HTMLElement>) => <main {...props}/>;
export const Header = (props: Props<HTMLElement>) => <header {...props}/>;
export const Footer = (props: Props<HTMLElement>) => <footer {...props}/>;
export const Nav = (props: Props<HTMLElement>) => <nav {...props}/>;
export const Section = (props: Props<HTMLElement>) => <section {...props}/>;
export const Article = (props: Props<HTMLElement>) => <article {...props}/>;
export const Aside = (props: Props<HTMLElement>) => <aside {...props}/>;
export const Figure = (props: Props<HTMLElement>) => <figure {...props}/>;
export const Figcaption = (props: Props<HTMLElement>) => <figcaption {...props}/>;
export const Address = (props: Props<HTMLElement>) => <address {...props}/>;
export const Details = (props: React.DetailsHTMLAttributes<HTMLDetailsElement>) => <details {...props}/>;
export const Summary = (props: Props<HTMLElement>) => <summary {...props}/>;

export type HeadingProps = Props<HTMLHeadingElement> & {level?:1|2|3|4|5|6};
export const Heading = ({level=1,...rest}: HeadingProps) => React.createElement(
  ('h'+level) as 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',rest
);
export const Paragraph = (props: Props<HTMLParagraphElement>) => <p {...props}/>;
export const Text = (props: Props<HTMLSpanElement>) => <span {...props}/>;
export const Time = (props: React.TimeHTMLAttributes<HTMLTimeElement>) => <time {...props}/>;
export const List = (props: Props<HTMLUListElement>) => <ul {...props}/>;
export const ListItem = (props: Props<HTMLLIElement>) => <li {...props}/>;

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'onClick'> & {
  onPress?:()=>void;
  accessibilityLabel?:string;
  accessibilityState?:{disabled?:boolean;checked?:boolean;selected?:boolean};
};
export const Button = ({
  onPress,accessibilityLabel,accessibilityState,disabled,type='button',...props
}:ButtonProps) => <button {...props} type={type} disabled={disabled??accessibilityState?.disabled}
  aria-label={props['aria-label']??accessibilityLabel} onClick={onPress}/>;

export const Link = (props:React.AnchorHTMLAttributes<HTMLAnchorElement>)=><a {...props}/>;
export const Form = (props:React.FormHTMLAttributes<HTMLFormElement>)=><form {...props}/>;
export const Fieldset = (props:React.FieldsetHTMLAttributes<HTMLFieldSetElement>)=><fieldset {...props}/>;
export const Legend = (props:Props<HTMLLegendElement>)=><legend {...props}/>;
export const Label = (props:React.LabelHTMLAttributes<HTMLLabelElement>)=><label {...props}/>;

type InputProps=Omit<React.InputHTMLAttributes<HTMLInputElement>,'onChange'|'onSubmit'> & {
  onChangeText?:(text:string)=>void;onSubmitEditing?:()=>void;
  editable?:boolean;secureTextEntry?:boolean;numberOfLines?:number;
};
export const Input=({onChangeText,onSubmitEditing,editable,secureTextEntry,
  numberOfLines:_n,autoFocus,...props}:InputProps)=>
    <input {...props} type={secureTextEntry?'password':(props.type??'text')}
      autoFocus={autoFocus} readOnly={editable===false} onChange={e=>onChangeText?.(e.target.value)}
      onKeyDown={e=>{if(e.key==='Enter')onSubmitEditing?.();}}/>;

type TextareaProps=Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,'onChange'> & {
  onChangeText?:(text:string)=>void;editable?:boolean;numberOfLines?:number;
};
export const Textarea=({onChangeText,editable,numberOfLines,rows,...props}:TextareaProps)=>
  <textarea {...props} rows={rows??numberOfLines??4} readOnly={editable===false}
    onChange={e=>onChangeText?.(e.target.value)}/>;

type SelectProps=React.SelectHTMLAttributes<HTMLSelectElement> & {
  onValueChange?:(value:string)=>void;
};
export const Select=({onValueChange,onChange,...props}:SelectProps)=>
  <select {...props} onChange={e=>{onValueChange?.(e.target.value);onChange?.(e);}}/>;

export const Table=(props:React.TableHTMLAttributes<HTMLTableElement>)=><table {...props}/>;
export const TableHeader=(props:Props<HTMLTableSectionElement>)=><thead {...props}/>;
export const TableBody=(props:Props<HTMLTableSectionElement>)=><tbody {...props}/>;
export const TableRow=(props:Props<HTMLTableRowElement>)=><tr {...props}/>;
export const TableCell=(props:React.TdHTMLAttributes<HTMLTableCellElement>)=><td {...props}/>;
export const TableHeaderCell=(props:React.ThHTMLAttributes<HTMLTableCellElement>)=><th {...props}/>;
