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


export const buildUpdatePollPageUrl = (pollId) => {
  return UPDATE_POLL_PAGE.replace(":pollId", pollId);
};
