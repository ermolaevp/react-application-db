const errorTranslates = {
  'invalid password': 'invalid password',
  'passwords not match': 'passwords do not match',
  'password is too short, at least 8 symbols required': 'password is too short, at least 8 symbols required',
  'duplicate key value violates unique constraint "application_types_market_link_key"': 'Link should be uniq',
  'duplicate key value violates unique constraint "os_types_name_key"': 'OS should be uniq',
  'duplicate key value violates unique constraint "protected_data_types_name_key"': 'Data type should be uniq',
  'duplicate key value violates unique constraint "protected_data_locations_name_key"': 'Location should be uniq',
  'null value in column "application_type_id" violates not-null constraint': 'Choose application please',
  'null value in column "os_type_id" violates not-null constraint': 'Choose OS please',
  'duplicate key value violates unique constraint "api_oses_idx"': 'OS and version should be uniq',
  'duplicate key value violates unique constraint "api_applications_idx"': 'Application and version should be uniq',
};

export default errorTranslates;
