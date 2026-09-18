// Update launch details here. Checkout stays closed until commerce is connected.
export const shop = {
  price: 39,
  batchSize: 30,
  availability: 'coming-soon' as 'coming-soon' | 'sold-out',
  instagram: 'https://www.instagram.com/phinandfoam/',
  pickup: { date: 'Date to be announced', area: 'North Austin · exact location coming soon', time: 'Pickup window coming soon' },
  video: '' as string,
  videoCaptions: '' as string,
  contactEmail: 'phinandfoam@gmail.com' as string,
};
export const recipes = [
  { id: 'classic', number: '01', name: 'The classic iced coffee', vietnamese: 'Cà phê sữa đá', note: 'Bold coffee. Sweet milk. A whole lot of ice.', tone: 'classic', ingredients: ['House Blend coffee', 'Sweetened condensed milk', 'Hot water + ice'], steps: ['Spoon condensed milk into your glass.', 'Brew your coffee with a phin directly over the milk.', 'Stir, pour over ice, and make it your moment.'] },
  { id: 'salted', number: '02', name: 'A little salty, a little sweet', vietnamese: 'Cà phê muối', note: 'Your bold brew, under a cloud of salted cream.', tone: 'salted', ingredients: ['Phin-brewed House Blend', 'Cream + a pinch of salt', 'Condensed milk + ice'], steps: ['Brew your coffee and sweeten to taste.', 'Whisk the cream with a little salt until softly thickened.', 'Pour coffee over ice and float the salted cream on top.'] },
  { id: 'coconut', number: '03', name: 'Your coconut escape', vietnamese: 'Cà phê cốt dừa', note: 'Creamy, coconutty, and made for slow afternoons.', tone: 'coconut', ingredients: ['Phin-brewed House Blend', 'Coconut milk', 'Condensed milk + ice'], steps: ['Brew a bold cup of coffee and let it cool.', 'Blend coconut milk, condensed milk, and ice.', 'Spoon into a glass and pour the coffee over the top.'] },
];
