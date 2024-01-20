import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerPostlike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Postlike, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly count?: number | null;
  readonly postID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPostlike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Postlike, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly count?: number | null;
  readonly postID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Postlike = LazyLoading extends LazyLoadingDisabled ? EagerPostlike : LazyPostlike

export declare const Postlike: (new (init: ModelInit<Postlike>) => Postlike) & {
  copyOf(source: Postlike, mutator: (draft: MutableModel<Postlike>) => MutableModel<Postlike> | void): Postlike;
}

type EagerReplay = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Replay, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly commnetID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReplay = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Replay, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly commnetID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Replay = LazyLoading extends LazyLoadingDisabled ? EagerReplay : LazyReplay

export declare const Replay: (new (init: ModelInit<Replay>) => Replay) & {
  copyOf(source: Replay, mutator: (draft: MutableModel<Replay>) => MutableModel<Replay> | void): Replay;
}

type EagerCommnet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Commnet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contet?: string | null;
  readonly userID: string;
  readonly postID: string;
  readonly Replays?: (Replay | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommnet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Commnet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contet?: string | null;
  readonly userID: string;
  readonly postID: string;
  readonly Replays: AsyncCollection<Replay>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Commnet = LazyLoading extends LazyLoadingDisabled ? EagerCommnet : LazyCommnet

export declare const Commnet: (new (init: ModelInit<Commnet>) => Commnet) & {
  copyOf(source: Commnet, mutator: (draft: MutableModel<Commnet>) => MutableModel<Commnet> | void): Commnet;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly Commnets?: (Commnet | null)[] | null;
  readonly imageUri?: string | null;
  readonly name?: string | null;
  readonly Postlikes?: (Postlike | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly Commnets: AsyncCollection<Commnet>;
  readonly imageUri?: string | null;
  readonly name?: string | null;
  readonly Postlikes: AsyncCollection<Postlike>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Answer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly questionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAnswer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Answer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly questionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Answer = LazyLoading extends LazyLoadingDisabled ? EagerAnswer : LazyAnswer

export declare const Answer: (new (init: ModelInit<Answer>) => Answer) & {
  copyOf(source: Answer, mutator: (draft: MutableModel<Answer>) => MutableModel<Answer> | void): Answer;
}

type EagerQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly quizID: string;
  readonly Answers?: (Answer | null)[] | null;
  readonly AcceptedAnswer?: Answer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly questionAcceptedAnswerId?: string | null;
}

type LazyQuestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly quizID: string;
  readonly Answers: AsyncCollection<Answer>;
  readonly AcceptedAnswer: AsyncItem<Answer | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly questionAcceptedAnswerId?: string | null;
}

export declare type Question = LazyLoading extends LazyLoadingDisabled ? EagerQuestion : LazyQuestion

export declare const Question: (new (init: ModelInit<Question>) => Question) & {
  copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}

type EagerQuiz = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quiz, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly shortdescription?: string | null;
  readonly grade?: number | null;
  readonly isChanging?: boolean | null;
  readonly password?: number | null;
  readonly Questions?: (Question | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuiz = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Quiz, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly shortdescription?: string | null;
  readonly grade?: number | null;
  readonly isChanging?: boolean | null;
  readonly password?: number | null;
  readonly Questions: AsyncCollection<Question>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Quiz = LazyLoading extends LazyLoadingDisabled ? EagerQuiz : LazyQuiz

export declare const Quiz: (new (init: ModelInit<Quiz>) => Quiz) & {
  copyOf(source: Quiz, mutator: (draft: MutableModel<Quiz>) => MutableModel<Quiz> | void): Quiz;
}

type EagerTutorialEpisode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialEpisode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly descrition?: string | null;
  readonly videoUri?: string | null;
  readonly duration?: string | null;
  readonly downloadable?: boolean | null;
  readonly poster?: string | null;
  readonly tutorialseasonID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTutorialEpisode = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialEpisode, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly descrition?: string | null;
  readonly videoUri?: string | null;
  readonly duration?: string | null;
  readonly downloadable?: boolean | null;
  readonly poster?: string | null;
  readonly tutorialseasonID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TutorialEpisode = LazyLoading extends LazyLoadingDisabled ? EagerTutorialEpisode : LazyTutorialEpisode

export declare const TutorialEpisode: (new (init: ModelInit<TutorialEpisode>) => TutorialEpisode) & {
  copyOf(source: TutorialEpisode, mutator: (draft: MutableModel<TutorialEpisode>) => MutableModel<TutorialEpisode> | void): TutorialEpisode;
}

type EagerTutorialSeason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialSeason, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly numberOfVideo?: string | null;
  readonly year?: number | null;
  readonly teacher?: string | null;
  readonly tutorialcategoryID: string;
  readonly TutorialEpisodes?: (TutorialEpisode | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTutorialSeason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialSeason, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly numberOfVideo?: string | null;
  readonly year?: number | null;
  readonly teacher?: string | null;
  readonly tutorialcategoryID: string;
  readonly TutorialEpisodes: AsyncCollection<TutorialEpisode>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TutorialSeason = LazyLoading extends LazyLoadingDisabled ? EagerTutorialSeason : LazyTutorialSeason

export declare const TutorialSeason: (new (init: ModelInit<TutorialSeason>) => TutorialSeason) & {
  copyOf(source: TutorialSeason, mutator: (draft: MutableModel<TutorialSeason>) => MutableModel<TutorialSeason> | void): TutorialSeason;
}

type EagerTutorialCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly TutorialSeasons?: (TutorialSeason | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTutorialCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TutorialCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly TutorialSeasons: AsyncCollection<TutorialSeason>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TutorialCategory = LazyLoading extends LazyLoadingDisabled ? EagerTutorialCategory : LazyTutorialCategory

export declare const TutorialCategory: (new (init: ModelInit<TutorialCategory>) => TutorialCategory) & {
  copyOf(source: TutorialCategory, mutator: (draft: MutableModel<TutorialCategory>) => MutableModel<TutorialCategory> | void): TutorialCategory;
}

type EagerFaculty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Faculty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly imageUri?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFaculty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Faculty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly imageUri?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Faculty = LazyLoading extends LazyLoadingDisabled ? EagerFaculty : LazyFaculty

export declare const Faculty: (new (init: ModelInit<Faculty>) => Faculty) & {
  copyOf(source: Faculty, mutator: (draft: MutableModel<Faculty>) => MutableModel<Faculty> | void): Faculty;
}

type EagerUniversity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<University, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly inageUri?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUniversity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<University, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly inageUri?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type University = LazyLoading extends LazyLoadingDisabled ? EagerUniversity : LazyUniversity

export declare const University: (new (init: ModelInit<University>) => University) & {
  copyOf(source: University, mutator: (draft: MutableModel<University>) => MutableModel<University> | void): University;
}

type EagerFormula = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Formula, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly value?: string | null;
  readonly formulacategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFormula = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Formula, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly value?: string | null;
  readonly formulacategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Formula = LazyLoading extends LazyLoadingDisabled ? EagerFormula : LazyFormula

export declare const Formula: (new (init: ModelInit<Formula>) => Formula) & {
  copyOf(source: Formula, mutator: (draft: MutableModel<Formula>) => MutableModel<Formula> | void): Formula;
}

type EagerFormulaCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FormulaCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Formulas?: (Formula | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFormulaCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FormulaCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Formulas: AsyncCollection<Formula>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FormulaCategory = LazyLoading extends LazyLoadingDisabled ? EagerFormulaCategory : LazyFormulaCategory

export declare const FormulaCategory: (new (init: ModelInit<FormulaCategory>) => FormulaCategory) & {
  copyOf(source: FormulaCategory, mutator: (draft: MutableModel<FormulaCategory>) => MutableModel<FormulaCategory> | void): FormulaCategory;
}

type EagerBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly fileUri?: string | null;
  readonly poster?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly fileUri?: string | null;
  readonly poster?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Book = LazyLoading extends LazyLoadingDisabled ? EagerBook : LazyBook

export declare const Book: (new (init: ModelInit<Book>) => Book) & {
  copyOf(source: Book, mutator: (draft: MutableModel<Book>) => MutableModel<Book> | void): Book;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly imageUri?: string | null;
  readonly Commnets?: (Commnet | null)[] | null;
  readonly Replays?: (Replay | null)[] | null;
  readonly Postlike?: (Postlike | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly imageUri?: string | null;
  readonly Commnets: AsyncCollection<Commnet>;
  readonly Replays: AsyncCollection<Replay>;
  readonly Postlike: AsyncCollection<Postlike>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}