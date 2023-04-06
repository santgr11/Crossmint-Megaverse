import { megaverseApi } from '@services';

export default differences => {
  const promises = differences.map(({ row, column, goal }) => {
    if (goal === 'SPACE') {
      return new Promise((resolve, reject) => {
        try {
          resolve(megaverseApi.deletePOLYanet({ row, column }));
        } catch (err) {
          reject(err);
        }
      });
    }

    if (goal === 'POLYANET') {
      return new Promise((resolve, reject) => {
        try {
          resolve(megaverseApi.setPOLYanet({ row, column }));
        } catch (err) {
          reject(err);
        }
      });
    }

    return null;
  });

  return promises;
};
