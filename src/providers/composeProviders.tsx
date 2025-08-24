import React, { ReactElement, ReactNode } from "react";

type Props = { children: ReactNode };
export type Provider = React.ComponentType<Props>;

/** Junta vários providers mantendo a ordem (o 1º fica mais externo). */
export const composeProviders = (...providers: Provider[]) =>
  providers.reduceRight<Provider>(
    (Acc, P) => {
      const Composed = ({ children }: Props): ReactElement | null => (
        <P>
          <Acc>{children}</Acc>
        </P>
      );
      const pName = (P as any).displayName ?? (P as any).name ?? "Provider";
      const aName = (Acc as any).displayName ?? (Acc as any).name ?? "Tree";
      Composed.displayName = `Compose(${pName}→${aName})`;
      return Composed;
    },
    function Leaf({ children }: Props): ReactElement | null {
      return <>{children}</>;
    },
  );

/** Helper para usar providers que precisam de props. */
export function withProps<P extends object>(
  Comp: React.ComponentType<P & Props>,
  props: P,
): Provider {
  const Wrapped = ({ children }: Props): ReactElement | null => (
    <Comp {...props}>{children}</Comp>
  );
  Wrapped.displayName = `WithProps(${
    Comp.displayName ?? Comp.name ?? "Provider"
  })`;
  return Wrapped;
}
