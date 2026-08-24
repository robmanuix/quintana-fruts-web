import * as migration_20260824_160502_initial from './20260824_160502_initial';

export const migrations = [
  {
    up: migration_20260824_160502_initial.up,
    down: migration_20260824_160502_initial.down,
    name: '20260824_160502_initial'
  },
];
