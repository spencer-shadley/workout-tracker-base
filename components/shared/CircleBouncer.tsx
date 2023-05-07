import { PropsWithChildren } from 'react';

export default function CircleBouncer({ children }: PropsWithChildren) {
  return <div className="bounce circle">{children}</div>;
}
