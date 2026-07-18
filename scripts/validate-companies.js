const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schemaPath = path.join(__dirname, '..', 'data', 'companies.schema.json');
const dataPath = path.join(__dirname, '..', 'data', 'companies.json');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(data);

let hasErrors = false;

if (!valid) {
  hasErrors = true;
  console.error('data/companies.json failed schema validation:\n');
  for (const err of validate.errors) {
    const where = err.instancePath || '(root)';
    console.error(`  ${where} ${err.message}${err.params ? ' ' + JSON.stringify(err.params) : ''}`);
  }
  console.error('');
}

// JSON Schema can't express "unique across this one field", so check id collisions separately.
const seenIds = new Map();
data.forEach((entry, index) => {
  if (entry && typeof entry.id !== 'undefined') {
    if (seenIds.has(entry.id)) {
      hasErrors = true;
      console.error(
        `  Duplicate id ${entry.id}: entries at index ${seenIds.get(entry.id)} and ${index} ("${entry.name}")`
      );
    } else {
      seenIds.set(entry.id, index);
    }
  }
});

if (hasErrors) {
  process.exit(1);
}

console.log(`data/companies.json is valid (${data.length} entries).`);
