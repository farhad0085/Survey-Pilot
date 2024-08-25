import React from 'react';
import { useParams } from 'react-router-dom';
import PollForm from './PollForm';

const UpdatePoll = () => {
  const { pollId } = useParams();

  return (
    <PollForm isEdit={true} pollId={pollId} />
  );
};

export default UpdatePoll;
