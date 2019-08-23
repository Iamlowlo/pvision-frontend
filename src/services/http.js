import axios from 'axios';

const credentials = window.btoa('code-challenge:payvisioner');

export const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
