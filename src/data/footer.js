// Footer destination links point to the destinations listing with the matching
// state pre-selected in the filter (query param) and scroll to the results grid (hash).
const destinationFooterStates = [
  'Assam',
  'Meghalaya',
  'Nagaland',
  'Manipur',
  'Arunachal Pradesh',
  'Mizoram',
  'Tripura',
  'Sikkim',
];

const destinationFilterLink = (state) =>
  `/destinations?state=${encodeURIComponent(state)}#destination-grid`;

export const footerLinks = [
  {
    title: 'Destinations',
    links: destinationFooterStates.map((state) => [state, destinationFilterLink(state)]),
  },
  {
    title: 'Experiences',
    links: [
      ['Wildlife Safaris', '/experiences/wildlife'],
      ['Highland Treks', '/experiences/adventure'],
      ['River & Waterfall Trails', '/experiences/river-waterfall-trails'],
      ['Festival Tours', '/experiences/culture'],
      ['Photography Trips', '/experiences/photography'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Packages', '/packages'],
      ['Fleet', '/fleet'],
      ['Contact', '/contact'],
    ],
  },
];
