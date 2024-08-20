import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const UpdateSurvey = () => {
  const { surveyId } = useParams();

  return (
    <DashboardLayout>
      <SurveyForm isEdit={true} surveyId={surveyId} />
    </DashboardLayout>
  );
};

export default UpdateSurvey;
