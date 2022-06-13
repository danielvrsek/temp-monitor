import { isInRoleIncludeAdmin } from "./authorizationHelpers.js";
import { Policies } from "./policies.js";
import UserRoles from "./userRoles.js";

export const PolicyRules = {
    [Policies.anonymous]: (_) => true,
    [Policies.authenticated]: (userInfo) => !!userInfo,
    [Policies.member]: (userInfo) => userInfo?.roles?.length > 0,
    [Policies.teacherOrStudyDepartment]: (userInfo) =>
        isInRoleIncludeAdmin(userInfo, UserRoles.teacher) ||
        isInRoleIncludeAdmin(userInfo, UserRoles.studyDepartment),
};

export default PolicyRules;
