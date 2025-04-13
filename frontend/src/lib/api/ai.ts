import axios from 'axios';

interface AIProfileResponse {
  bio_analysis: string;
  coins_summaries: string[];
  all_coin_summary: string;
  prompt_summary: string;
}

// TODO: Finish
const getAIProfileAnalysis = async () => {
  const fake: AIProfileResponse = {
    bio_analysis: "This bio is very good, lorem ispum dolor sit ament fam. Furthermore, fjkdlsajf lkdsjflkd jsalkf jdsalkfjdlksaflkdsa fjlkdsa flkd jsalkf djs",
    coins_summaries: ["summary1", "summary2", "summary3"],
    all_coin_summary: "All the coins are very good sir",
    prompt_summary: "This si very good"
  }
  return fake;
}

export type {
  AIProfileResponse
}

export default {
  getAIProfileAnalysis
}
