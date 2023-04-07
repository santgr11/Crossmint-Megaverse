export default async (promises, batchSize) => {
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    await Promise.all(batch.map(async promise => await promise()));
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};
