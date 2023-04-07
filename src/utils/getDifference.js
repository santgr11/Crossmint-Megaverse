const currentToStringMap = currentObj => {
  if (currentObj === null) {
    return 'SPACE';
  }

  if (currentObj.type === 0) {
    return 'POLYANET';
  }

  if (currentObj.type === 1 && currentObj.color) {
    return `${currentObj.color.toUpperCase()}_SOLOON`;
  }

  if (currentObj.type === 2 && currentObj.direction) {
    return `${currentObj.direction.toUpperCase()}_COMETH`;
  }

  throw new Error('Unknown current object type');
};

export default ({ current, goal }) => {
  const differences = [];

  goal.forEach((row, x) => {
    row.forEach((goalObj, y) => {
      const currentObj = currentToStringMap(current[Number(x)][Number(y)]);

      if (currentObj !== goalObj) {
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
