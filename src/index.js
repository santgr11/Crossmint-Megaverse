import { megaverseApi } from '@services';
import { getCallbacks, getDifference, resolveCallbackBatches } from '@utils';

const useDifference = true;

const main = async () => {
  const goalMap = await megaverseApi.getGoalMap();

  let setCallbacks = [];

  if (useDifference) {
    for (let i = 0; i < 3; i++) {
      const currentMap = await megaverseApi.getCurrentMap();
      const difference = getDifference({ current: currentMap, goal: goalMap });

      if (difference.length > 0) {
        setCallbacks = getCallbacks.fromDifferences(difference);
      }
    }
  } else {
    setCallbacks = getCallbacks.fromGoal(goalMap);
  }

  console.info(`Setting ${setCallbacks.length} objects:`);
  // To avoid rate limiting, we need to split the promises into batches
  await resolveCallbackBatches(setCallbacks, 3);

  console.log('✅ done');
};

main();
