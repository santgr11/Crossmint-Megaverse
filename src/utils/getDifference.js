const goalToCurrentMap = {
  SPACE: null,
  POLYANET: { type: 0 }
};

export default ({ current, goal }) => {
  const differences = [];

  goal.forEach((row, x) => {
    row.forEach((goalObj, y) => {
      const currentObj = current[Number(x)][Number(y)];
      const goalObjString = goalToCurrentMap[String(goalObj)];

      if (JSON.stringify(currentObj) !== JSON.stringify(goalObjString)) {
        differences.push({
          row: x,
          column: y,
          current: currentObj,
          goal: goalObj
        });
      }
    });
  });

  return differences;
};
