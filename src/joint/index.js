import Joint from 'joint-kit';
import express from 'express';
import bookshelf from '../services/bookshelf';
import modelConfig from './model-config';
import methodConfig from './method-config';
import routeConfig from './route-config';

// Initialize Joint...
const joint = new Joint({
  service: bookshelf,
  server: express,
  output: 'json-api',
});

// Generate models, methods, and a router...
joint.generate({ modelConfig, methodConfig, routeConfig });

export default joint;
