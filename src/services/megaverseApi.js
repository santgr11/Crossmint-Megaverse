import axios from 'axios';

import config from '@config';

const axiosInstance = axios.create({
  baseURL: config.megaverseApiURL
});

axiosInstance.interceptors.response.use(undefined, err => {
  const { config, response } = err;

  // Too many requests, we must wait and try again
  if (response?.status === 429) {
    config.retryCount = config.retryCount || 0;

    config.retryCount++;

    if (config.retryCount > 5) {
      return Promise.reject(err);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(axiosInstance(config));
      }, 2000);
    });
  }

  return Promise.reject(err);
});

export default {
  async getCurrentMap() {
    try {
      const response = await axiosInstance.get(`/map/${config.candidateId}`);

      return response.data.map.content;
    } catch (err) {
      console.error(`Error getting current map: ${err.message}`);
      throw err;
    }
  },

  async getGoalMap() {
    try {
      const response = await axiosInstance.get(
        `/map/${config.candidateId}/goal`
      );

      return response.data.goal;
    } catch (err) {
      console.error(`Error getting goal map: ${err.message}`);
      throw err;
    }
  },

  async setPOLYanet({ row, column }) {
    try {
      const response = await axiosInstance.post('/polyanets', {
        row,
        column,
        candidateId: config.candidateId
      });

      return response.data;
    } catch (err) {
      console.error(
        `Error setting POLYanet at [${row}, ${column}]: ${err.message}`
      );
      throw err;
    }
  },

  async deletePOLYanet({ row, column }) {
    try {
      const response = await axiosInstance.delete('/polyanets', {
        data: {
          row,
          column,
          candidateId: config.candidateId
        }
      });

      return response.data;
    } catch (err) {
      console.error(
        `Error deleting POLYanet at [${row}, ${column}]: ${err.message}`
      );
      throw err;
    }
  }
};
