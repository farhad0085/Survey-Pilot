import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyForm from './SurveyForm';

const UpdateSurvey = () => {
  const { surveyId } = useParams();

  return (
    <SurveyForm isEdit={true} surveyId={surveyId} />
  );
};

export default UpdateSurvey;
