import React from 'react';
import { useParams } from 'react-router-dom';
import PollForm from './PollForm';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const UpdatePoll = () => {
  const { pollId } = useParams();

  return (
    <DashboardLayout>
      <PollForm isEdit={true} pollId={pollId} />
    </DashboardLayout>
  );
};

export default UpdatePoll;
