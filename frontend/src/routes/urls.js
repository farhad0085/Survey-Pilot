export const HOME_PAGE = "/"

// Auth
export const REGISTER_PAGE = "/register";
export const LOGIN_PAGE = "/login";
export const PASSWORD_RESET_PAGE = "/forget-password/reset/:uid/:token";

// Dashboard
export const DASHBOARD_PAGE = "/dashboard";
export const LIST_POLL_PAGE = "/dashboard/polls"
export const CREATE_POLL_PAGE = "/dashboard/polls/create"
export const UPDATE_POLL_PAGE = "/dashboard/polls/:pollId/update"

// public
export const POLL_PAGE = "/polls/:pollId"

export const buildUpdatePollPageUrl = (pollId) => {
  return UPDATE_POLL_PAGE.replace(":pollId", pollId);
};

export const buildPollPageUrl = (pollId) => {
  return POLL_PAGE.replace(":pollId", pollId);
};
