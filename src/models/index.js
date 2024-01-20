// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Postlike, Replay, Commnet, Post, Answer, Question, Quiz, TutorialEpisode, TutorialSeason, TutorialCategory, Faculty, University, Formula, FormulaCategory, Book, User } = initSchema(schema);

export {
  Postlike,
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