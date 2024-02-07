// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Replay, Commnet, Post, Answer, Question, Quiz, TutorialEpisode, TutorialSeason, TutorialCategory, Faculty, University, Formula, FormulaCategory, Book, User } = initSchema(schema);

export {
  Replay,
  Commnet,
  Post,
  Answer,
  Question,
  Quiz,
  TutorialEpisode,
  TutorialSeason,
  TutorialCategory,
  Faculty,
  University,
  Formula,
  FormulaCategory,
  Book,
  User
};