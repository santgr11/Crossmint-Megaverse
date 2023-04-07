const config = {
  megaverseApiURL: process.env.CROSSMINT_MEGAVERSE_API_URL,
  candidateId: process.env.CANDIDATE_ID,
  apiCallsBatchSize: Number(process.env.API_CALLS_BATCH_SIZE) || 3
};

export default config;
