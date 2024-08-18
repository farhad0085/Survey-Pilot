import React from 'react';
import PollForm from './PollForm';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const CreatePoll = () => {
  return (
    <DashboardLayout>
      <PollForm />
    </DashboardLayout>
  );
};

export default CreatePoll