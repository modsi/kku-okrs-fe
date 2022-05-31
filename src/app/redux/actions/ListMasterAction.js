import {
  ListInstitutions,
  ListRoles,
  ListTypeTemplate,
  ListFieldMasterTemplate,
  ListYear,
  ListStatus,
} from "../../services/MainService";
import { Payload } from "../../utils/Payload";

export const LIST_INSTITUTIONS = "listInstitutions";
export const ListInstitutionsAction = async () => {
  const result = await ListInstitutions();
  return Payload({
    params: { [LIST_INSTITUTIONS]: result?.data?.data ?? null },
    type: LIST_INSTITUTIONS,
  });
};

export const LIST_YEARS = "listYears";
export const ListYearsAction = async () => {
  const result = await ListYear();
  return Payload({
    params: { [LIST_YEARS]: result?.data?.data ?? null },
    type: LIST_YEARS,
  });
};

export const LIST_ROLES = "listRoles";
export const ListRolesAction = async () => {
  const result = await ListRoles();
  return Payload({
    params: { [LIST_ROLES]: result?.data?.data ?? null },
    type: LIST_ROLES,
  });
};

export const LIST_STATUS = "listStatus";
export const ListStatusAction = async () => {
  const result = await ListStatus();
  return Payload({
    params: { [LIST_STATUS]: result?.data?.data ?? null },
    type: LIST_STATUS,
  });
};

export const LIST_TYPE_TEPM = "listTypeTemplate";
export const ListTypeTemplateAction = async () => {
  const result = await ListTypeTemplate();
  return Payload({
    params: { [LIST_TYPE_TEPM]: result?.data?.data ?? null },
    type: LIST_TYPE_TEPM,
  });
};

export const LIST_FIELD_TEPM = "listFieldMasterTemplate";
export const ListFieldMasterTemplateAction = async (typeId) => {
  const result = await ListFieldMasterTemplate(typeId);
  return Payload({
    params: { [LIST_FIELD_TEPM]: result?.data?.data ?? null },
    type: LIST_FIELD_TEPM,
  });
};
