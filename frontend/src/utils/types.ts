import { DIFFICULTY } from "./enums";

export type Question = Partial<{
  _id: string;
  title: string;
  difficulty_level: DIFFICULTY;
  question_prompt: string;
  examples: string[];
  popularity: number;
  upvotes: number;
  downvotes: number;
  topic: string;
}>;
