interface Review {
  id: number;
  correct: boolean;
  review_date: string;
  flashcard: string;
  user: number;
}

interface UserLearningData {
  correct_answers: number;
  total_answers: number;
  round_count: number;
  review_dates: string[];
  retention_rates: number[];
}

interface CourseData {
  reviews: Review[];
  course_learning_rate: number;
  course_progress_rate: number;
  user_learning_data: UserLearningData;
}

export interface UserData {
  [key: string]: CourseData[];
}
export interface Course {
  id: string;
  name: string;
}
