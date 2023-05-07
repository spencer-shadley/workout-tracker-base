import { PropsWithChildren } from 'react';

export default function RectangleBouncer({ children }: PropsWithChildren) {
  return <div className="bounce rectangle">{children}</div>;
}
