#!/bin/sh

cd /usr/src/app
npm run seed || echo 'already seed'
npm start
