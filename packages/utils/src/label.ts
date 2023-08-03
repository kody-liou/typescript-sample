import type { QuestionCategory, SurportedLocale } from "./types.js";

export const QUESTION_CATEGORIES_LABELS: Record<
  SurportedLocale,
  Record<QuestionCategory, string>
> = {
  en_US: {
    personality_traits: "Personality Traits",
    interests_and_hobbies: "Interests and Hobbies",
    travel_and_adventure: "Travel and Adventure",
    food_and_dining: "Food and Dining",
    relationship_and_dating: "Relationship and Dating",
    technology_and_gadgets: "Technology and Gadgets",
    health_and_fitness: "Health and Fitness",
    social_issues_and_causes: "Social Issues and Causes",
  },
  zh_TW: {
    personality_traits: "個性特質",
    interests_and_hobbies: "興趣與愛好",
    travel_and_adventure: "旅遊與冒險",
    food_and_dining: "飲食與用餐",
    relationship_and_dating: "關係與約會",
    technology_and_gadgets: "科技與小工具",
    health_and_fitness: "健康與健身",
    social_issues_and_causes: "社會議題與原因",
  },
};
