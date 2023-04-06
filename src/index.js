import { megaverseApi } from '@services';
import { getDifference, getPromises } from '@utils';

const main = async () => {
  const currentMap = await megaverseApi.getCurrentMap();
  const goalMap = await megaverseApi.getGoalMap();

  const difference = getDifference({ current: currentMap, goal: goalMap });

  console.log('differences:', difference);

  if (difference.length > 0) {
    await Promise.all(getPromises(difference));
  }

  console.log('✅ done');
};

main();
