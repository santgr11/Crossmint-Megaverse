import { megaverseApi } from '@services';
import { getCallbacks, getDifference, resolveCallbackBatches } from '@utils';
import config from '@config';

// If true, we will fetch the current state and only try to set the differences
// reducing the total amount of API calls.
// If false, we will try to set all the objects in the goal map.
const useDifference = true;

const main = async () => {
  if (!config.candidateId) {
    throw new Error('No candidate ID provided');
  }

  if (!config.megaverseApiURL) {
    throw new Error('No Megaverse API URL provided');
  }

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
  await resolveCallbackBatches(setCallbacks, config.apiCallsBatchSize);

  console.log('✅ done');
};

main();
