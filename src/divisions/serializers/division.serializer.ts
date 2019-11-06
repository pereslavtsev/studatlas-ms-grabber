import { Serializer } from 'jsonapi-serializer';

export const divisionSerializer = new Serializer('divisions', {
  attributes: [
    'name',
    'abbreviation',
    'head',
    'phone',
    'room',
  ],
  keyForAttribute: 'camelCase',
});