'use strict';

import Client from '../client.model';
import clientFixtures from './client.json';
import debug from 'debug';
const log = debug('krs:client:fixture');

export default () => {
  (async() => {
      await Client.find({}).remove();
      log('--> clients removed');
      await Client.create(clientFixtures);
      log('--> clients created');
    })();
};
