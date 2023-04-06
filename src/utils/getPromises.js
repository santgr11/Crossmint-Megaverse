import { megaverseApi } from '@services';

export default {
  fromGoal(goal) {
    const promises = goal.map((row, x) => {
      return row.map((goalObj, y) => {
        if (goalObj === 'POLYANET') {
          return new Promise((resolve, reject) => {
            try {
              resolve(megaverseApi.setPOLYanet({ row: x, column: y }));
            } catch (err) {
              reject(err);
            }
          });
        }

        return null;
      });
    });

    return promises;
  },

  fromDifferences(differences) {
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
  }
};
