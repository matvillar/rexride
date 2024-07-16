import React from 'react';

type Props = React.PropsWithChildren<{}>;

const ChatsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ChatsLayout;
