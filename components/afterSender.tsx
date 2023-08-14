import React from 'react';

interface AfterSenderProps {
  Uid: string;
  UidBrq: string;
}

const AfterSender: React.FC<AfterSenderProps> = ({ Uid, UidBrq }) => {
  return (
    <div>
      <p>afterSender with Uid: {Uid} and UidBrq: {UidBrq}</p>
      <p>http://localhost:3000/{Uid}-{UidBrq}</p>
    </div>
  );
};

export default AfterSender;
