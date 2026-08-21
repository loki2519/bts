import { MASTER_QUIZ_DATABASE } from './btsQuestionBank';

export const GUESS_SONG_BANK = MASTER_QUIZ_DATABASE.filter(q => q.gameType === 'guess-song');
export const GUESS_MEMBER_BANK = MASTER_QUIZ_DATABASE.filter(q => q.gameType === 'guess-member');
export const EMOJI_BANK = MASTER_QUIZ_DATABASE.filter(q => q.gameType === 'emoji');
export const GUESS_ERA_BANK = MASTER_QUIZ_DATABASE.filter(q => q.gameType === 'guess-era');

export const FULL_400_QUESTION_BANK = MASTER_QUIZ_DATABASE;
