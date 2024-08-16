export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

export const userSearchableFields = [
  'email',
  'id',
  'phone',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
