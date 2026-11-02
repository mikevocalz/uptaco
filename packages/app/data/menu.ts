/** Public editorial menu highlights, verified against Uptaco Harlem's marketplace
 * listings in November 2026. NO assumed Square price, stock or modifiers.
 * Purchasing uses the retailer's currently verified checkout provider.
 */
export type Category = 'tacos'|'burritos'|'drinks'|'lunch';
export type MenuHighlight = Readonly<{name:string; slug:string; category:Category; description:string; kicker:string}>;
export const MENU_HIGHLIGHTS: readonly MenuHighlight[]=[
  {name:'Classic Breakfast Taco',slug:'classic-breakfast-taco',category:'tacos',kicker:'HAND-PRESSED',
    description:'Eggs, Yukon potatoes, aged cheddar and jack cheese, and scallions in a soft flour tortilla.'},
  {name:'BEC Breakfast Taco',slug:'bec-breakfast-taco',category:'tacos',kicker:'THE NYC MORNING',
    description:'Bacon, egg, cheddar and jack cheese, and scallions on a hand-pressed tortilla.'},
  {name:'Impossible Chorizo Breakfast Taco',slug:'impossible-chorizo-taco',category:'tacos',kicker:'PLANT-BASED',
    description:'Impossible chorizo, refried beans, peppers, caramelized onions and pickled daikon.'},
  {name:'The Jacob Breakfast Burrito',slug:'jacob-breakfast-burrito',category:'burritos',kicker:'A BIG BREAKFAST',
    description:'Bacon, egg, roasted potatoes, cheese, avocado and fresh pico de gallo.'},
  {name:'OG Classic Breakfast Burrito',slug:'og-classic-breakfast-burrito',category:'burritos',kicker:'ALWAYS CLASSIC',
    description:'Egg, cheese, roasted potato, peppers, avocado and caramelized onion.'},
  {name:'The Raffi Breakfast Burrito',slug:'raffi-breakfast-burrito',category:'burritos',kicker:'SLOW-SMOKED',
    description:'Brisket, egg, cheese, roasted potato and house-pickled onion.'},
  {name:'Horchata Latte',slug:'horchata-latte',category:'drinks',kicker:'THE SPECIALTY',
    description:'House horchata with espresso or matcha and your preferred milk.'},
  {name:'Iced Strawberry Matcha',slug:'iced-strawberry-matcha',category:'drinks',kicker:'SOMETHING BRIGHT',
    description:'Matcha layered with strawberry-infused milk.'},
  {name:'Brisket Quesadilla',slug:'brisket-quesadilla',category:'lunch',kicker:'LUNCH COUNTER',
    description:'Slow-smoked brisket and melted cheddar-jack in a crispy pressed tortilla.'}
] as const;
