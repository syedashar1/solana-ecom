import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <div style={{fontSize: '20px', textAlign: 'right', margin: '15px'}}>
        by <a href='https://github.com/syedashar1'>Ashar Saghir</a>
      </div>
    </div>
  );
}
