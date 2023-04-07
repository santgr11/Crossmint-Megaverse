import { megaverseApi } from '@services';

function getSetGoalCallback({ goalObj, row, column }) {
  if (goalObj === 'POLYANET') {
    return async () => megaverseApi.setPOLYanet({ row, column });
  }

  if (goalObj.includes('COMETH')) {
    return async () =>
      megaverseApi.setComETH({
        row,
        column,
        direction: goalObj.split('_')[0].toLowerCase()
      });
  }

  if (goalObj.includes('SOLOON')) {
    return async () =>
      megaverseApi.setSOLoon({
        row,
        column,
        color: goalObj.split('_')[0].toLowerCase()
      });
  }

  return null;
}

function getDeleteCurrentCallback({ currentObj, row, column }) {
  if (currentObj === 'POLYANET') {
    return async () => megaverseApi.deletePOLYanet({ row, column });
  }

  if (currentObj.includes('COMETH')) {
    return async () => megaverseApi.deleteComETH({ row, column });
  }

  if (currentObj.includes('SOLOON')) {
    return async () => megaverseApi.deleteSOLoon({ row, column });
  }

  return null;
}

export default {
  fromGoal(goal) {
    const callbacks = [];

    goal.forEach((row, x) => {
      return row.forEach((goalObj, y) => {
        const newCallback = getSetGoalCallback({ goalObj, row: x, column: y });
        if (newCallback !== null) {
          callbacks.push(newCallback);
        }
      });
    });

    return callbacks;
  },

  fromDifferences(differences) {
    const callbacks = differences.map(({ row, column, current, goal }) => {
      if (goal === 'SPACE') {
        return getDeleteCurrentCallback({ currentObj: current, row, column });
      }

      return getSetGoalCallback({ goalObj: goal, row, column });
    });

    return callbacks;
  }
};
