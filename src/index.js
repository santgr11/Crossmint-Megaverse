import { megaverseApi } from '@services';
import { getDifference, getPromises } from '@utils';

const useDifference = false;

const main = async () => {
  const goalMap = await megaverseApi.getGoalMap();

  if (useDifference) {
    const currentMap = await megaverseApi.getCurrentMap();
    const difference = getDifference({ current: currentMap, goal: goalMap });

    console.log('differences:', difference);

    if (difference.length > 0) {
      await Promise.all(getPromises.fromDifferences(difference));
    }
  } else {
    await Promise.all(getPromises.fromGoal(goalMap));
  }

  console.log('✅ done');
};

main();
