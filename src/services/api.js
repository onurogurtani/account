import axios from 'axios';
import * as http from 'http';
import * as https from 'https';
import qs from 'qs';

export const api = axios.create({
  baseURL: process.env.PUBLIC_HOST_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type, Accept, X-Requested-With, remember-me',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '3600',
  },
  httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  httpAgent: new http.Agent({ keepAlive: true }),
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});
