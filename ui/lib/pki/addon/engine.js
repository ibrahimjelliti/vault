import Engine from '@ember/engine';

import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

const { modulePrefix } = config;

export default class PkiEngine extends Engine {
  modulePrefix = modulePrefix;
  Resolver = Resolver;
  dependencies = {
    services: [
      'auth',
      'download',
      'flash-messages',
      'namespace',
      'path-help',
      'router',
      'secret-mount-path',
      'store',
      'version',
      'wizard',
    ],
    externalRoutes: ['secrets'],
  };
}

loadInitializers(PkiEngine, modulePrefix);
