const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ingredients = [
  // Produce
  { name: "Onion" },
  { name: "Garlic" },
  { name: "Tomato" },
  { name: "Potato" },
  { name: "Carrot" },
  { name: "Bell pepper" },
  { name: "Lettuce" },
  { name: "Cucumber" },
  { name: "Lemon" },
  { name: "Lime" },

  // Herbs and Spices
  { name: "Salt" },
  { name: "Black pepper" },
  { name: "Cumin" },
  { name: "Paprika" },
  { name: "Oregano" },
  { name: "Basil" },
  { name: "Thyme" },
  { name: "Rosemary" },
  { name: "Cinnamon" },
  { name: "Nutmeg" },

  // Proteins
  { name: "Chicken breast" },
  { name: "Ground beef" },
  { name: "Salmon" },
  { name: "Eggs" },
  { name: "Tofu" },

  // Dairy and Alternatives
  { name: "Milk" },
  { name: "Butter" },
  { name: "Cheese" },
  { name: "Heavy cream" },
  { name: "Yogurt" },

  // Grains and Starches
  { name: "Rice" },
  { name: "Pasta" },
  { name: "Bread" },
  { name: "Flour" },
  { name: "Cornstarch" },

  // Oils and Vinegars
  { name: "Olive oil" },
  { name: "Vegetable oil" },
  { name: "Balsamic vinegar" },
  { name: "Apple cider vinegar" },

  // Condiments
  { name: "Soy sauce" },
  { name: "Mustard" },
  { name: "Mayonnaise" },
  { name: "Ketchup" },
  { name: "Hot sauce" },

  // Sweeteners
  { name: "Sugar" },
  { name: "Honey" },
  { name: "Maple syrup" },

  // Nuts and Seeds
  { name: "Almonds" },
  { name: "Walnuts" },
  { name: "Sesame seeds" },
  { name: "Chia seeds" },

  // Canned Goods
  { name: "Canned tomatoes" },
  { name: "Coconut milk" },
  { name: "Chickpeas" },
  { name: "Black beans" },
];

async function main() {
  console.log("Start seeding ...");
  for (const ingredient of ingredients) {
    const createdIngredient = await prisma.ingredient.create({
      data: ingredient,
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
