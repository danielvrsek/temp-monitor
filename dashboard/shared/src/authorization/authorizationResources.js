import Policies from "./policies.js";
import UserRoles from "./userRoles.js";

export const AuthorizationResources = {
    overview: { policy: Policies.anonymous },
    administration: { role: UserRoles.admin },
    subjectList: { policy: Policies.member },
    subjectDetail: { policy: Policies.member },
    subjectCreate: { role: UserRoles.studyDepartment },
    subjectEdit: { role: UserRoles.studyDepartment },
    subjectDelete: { role: UserRoles.studyDepartment },
    teacherList: { policy: Policies.teacherOrStudyDepartment },
    userList: { role: UserRoles.admin },
    userDetail: { role: UserRoles.admin },
    userProfile: { policy: Policies.authenticated },
    news: { policy: Policies.authenticated },
    studyDegreeList: { policy: Policies.authenticated },
    studyLanguageList: { policy: Policies.authenticated },
    studyMaterialList: { policy: Policies.member },
    studyMaterialAdd: { policy: Policies.teacherOrStudyDepartment },
    studyMaterialDelete: { policy: Policies.teacherOrStudyDepartment },
};
