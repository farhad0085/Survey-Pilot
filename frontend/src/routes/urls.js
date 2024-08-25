export const HOME_PAGE = "/"

// Auth
export const REGISTER_PAGE = "/register";
export const LOGIN_PAGE = "/login";
export const PASSWORD_RESET_PAGE = "/forget-password/reset/:uid/:token";

// Dashboard
export const DASHBOARD_PAGE = "/dashboard";
export const DASHBOARD_HOME_PAGE = "/dashboard/home";

// polls
export const LIST_POLL_PAGE = "/dashboard/polls"
export const CREATE_POLL_PAGE = "/dashboard/create-polls"
export const UPDATE_POLL_PAGE = "/dashboard/update-polls/:pollId"

// surveys
export const LIST_SURVEY_PAGE = "/dashboard/surveys"
export const CREATE_SURVEY_PAGE = "/dashboard/create-surveys"
export const UPDATE_SURVEY_PAGE = "/dashboard/update-surveys/:surveyId"

// users
export const LIST_USER_PAGE = "/dashboard/users"
export const CREATE_USER_PAGE = "/dashboard/users/create"
export const UPDATE_USER_PAGE = "/dashboard/users/:userId/update"

// public
export const POLL_PAGE = "/polls/:pollId"

export const buildUpdatePollPageUrl = (pollId) => {
  return UPDATE_POLL_PAGE.replace(":pollId", pollId);
};

export const buildPollPageUrl = (pollId) => {
  return POLL_PAGE.replace(":pollId", pollId);
};

export const buildUpdateSurveyPageUrl = (surveyId) => {
  return UPDATE_SURVEY_PAGE.replace(":surveyId", surveyId);
};
