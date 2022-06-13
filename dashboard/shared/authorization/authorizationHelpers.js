import { Policies } from "./policies.js";
import { PolicyRules } from "./policyRules.js";
import { UserRoles } from "./userRoles.js";

export function isInRoleIncludeAdmin(userInfo, role) {
    return isInRole(userInfo, role) || isInRole(userInfo, UserRoles.admin);
}

export function isInRole(userInfo, role) {
    if (!(role && Object.values(UserRoles).some((x) => x === role))) {
        throw new Error(`Invalid role '${role}'`);
    }

    if (!userInfo?.roles) {
        return false;
    }

    return userInfo.roles.includes(role);
}

export function isInPolicy(userInfo, policy, resource) {
    if (!(policy && Object.values(Policies).some((x) => x === policy))) {
        throw new Error(`Invalid policy '${policy}'`);
    }

    let rule = PolicyRules[policy];
    if (!rule) {
        throw new Error(`Rule for policy '${policy}' was not found`);
    }

    return (
        userInfo?.roles?.includes(UserRoles.admin) || rule(userInfo, resource)
    );
}
