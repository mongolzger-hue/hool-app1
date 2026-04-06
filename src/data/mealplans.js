export const mealPlans = [
  {
    id: 1,
    name: "Тэнцвэртэй Дэглэм",
    description: "7 хоногийн тэнцвэртэй хоолны дэглэм. Өдөрт ~1800 калори.",
    targetCalories: 1800,
    days: [
      {
        day: "Даваа",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Цуйван", calories: 380, recipeId: 3 },
          dinner: { name: "Банштай шөл", calories: 280, recipeId: 4 },
          snack: { name: "Ааруул", calories: 150, recipeId: 8 }
        }
      },
      {
        day: "Мягмар",
        meals: {
          breakfast: { name: "Сүүтэй цай + Боов", calories: 250, recipeId: 12 },
          lunch: { name: "Будаатай хуурга", calories: 400, recipeId: 7 },
          dinner: { name: "Гурилтай шөл", calories: 300, recipeId: 6 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Лхагва",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Хайрцагтай хоол", calories: 350, recipeId: 14 },
          dinner: { name: "Банштай шөл", calories: 280, recipeId: 4 },
          snack: { name: "Ааруул", calories: 150, recipeId: 8 }
        }
      },
      {
        day: "Пүрэв",
        meals: {
          breakfast: { name: "Сүүтэй цай + Боов", calories: 250, recipeId: 12 },
          lunch: { name: "Цуйван", calories: 380, recipeId: 3 },
          dinner: { name: "Бантан", calories: 220, recipeId: 9 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Баасан",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Будаатай хуурга", calories: 400, recipeId: 7 },
          dinner: { name: "Гурилтай шөл", calories: 300, recipeId: 6 },
          snack: { name: "Ааруул", calories: 150, recipeId: 8 }
        }
      },
      {
        day: "Бямба",
        meals: {
          breakfast: { name: "Сүүтэй цай + Боов", calories: 250, recipeId: 12 },
          lunch: { name: "Бууз", calories: 350, recipeId: 1 },
          dinner: { name: "Нийслэл салат", calories: 250, recipeId: 11 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Ням",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Хорхог", calories: 520, recipeId: 5 },
          dinner: { name: "Бантан", calories: 220, recipeId: 9 },
          snack: { name: "Боов", calories: 320, recipeId: 13 }
        }
      }
    ]
  },
  {
    id: 2,
    name: "Жин хасах Дэглэм",
    description: "7 хоногийн бага калоритай дэглэм. Өдөрт ~1400 калори.",
    targetCalories: 1400,
    days: [
      {
        day: "Даваа",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Гурилтай шөл", calories: 300, recipeId: 6 },
          dinner: { name: "Бантан", calories: 220, recipeId: 9 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Мягмар",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Банштай шөл", calories: 280, recipeId: 4 },
          dinner: { name: "Нийслэл салат", calories: 250, recipeId: 11 },
          snack: { name: "Ааруул", calories: 150, recipeId: 8 }
        }
      },
      {
        day: "Лхагва",
        meals: {
          breakfast: { name: "Сүүтэй цай", calories: 120, recipeId: 12 },
          lunch: { name: "Бантан", calories: 220, recipeId: 9 },
          dinner: { name: "Гурилтай шөл", calories: 300, recipeId: 6 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Пүрэв",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Цуйван (бага)", calories: 300, recipeId: 3 },
          dinner: { name: "Банштай шөл", calories: 280, recipeId: 4 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Баасан",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Хайрцагтай хоол", calories: 350, recipeId: 14 },
          dinner: { name: "Бантан", calories: 220, recipeId: 9 },
          snack: { name: "Ааруул", calories: 150, recipeId: 8 }
        }
      },
      {
        day: "Бямба",
        meals: {
          breakfast: { name: "Сүүтэй цай", calories: 120, recipeId: 12 },
          lunch: { name: "Будаатай хуурга", calories: 400, recipeId: 7 },
          dinner: { name: "Нийслэл салат", calories: 250, recipeId: 11 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      },
      {
        day: "Ням",
        meals: {
          breakfast: { name: "Тарагтай будаа", calories: 200, recipeId: 15 },
          lunch: { name: "Гурилтай шөл", calories: 300, recipeId: 6 },
          dinner: { name: "Бантан", calories: 220, recipeId: 9 },
          snack: { name: "Жимс", calories: 80, recipeId: null }
        }
      }
    ]
  }
];
