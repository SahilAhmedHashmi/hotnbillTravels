import { getDestinationBySlug } from './destinations.js';
import { getExperienceBySlug } from './experiences.js';

const makeJourney = ({ slug, title, destinationSlugs, experienceSlug, summary, image }) => ({
  slug, title, destinationSlugs, experienceSlug, summary, image,
  destinations: destinationSlugs.map(getDestinationBySlug).filter(Boolean),
  experience: getExperienceBySlug(experienceSlug),
});

// These are enquiry starting points assembled exclusively from existing catalogue
// records. They intentionally make no fixed duration, price, inclusion, or availability claim.
export const journeyIdeas = [
  makeJourney({ slug:'assam-wildlife-river', title:'Assam: Wildlife & River Island', destinationSlugs:['kaziranga','majuli','guwahati'], experienceSlug:'wildlife', summary:'Connect Assam’s wildlife landscape, Brahmaputra gateway, and Majuli in one custom-planned route.', image:'/Kaziranga National Park.jpg' }),
  makeJourney({ slug:'meghalaya-water-roads', title:'Meghalaya: Water, Forest & Hills', destinationSlugs:['shillong','cherrapunji','dawki','mawlynnong'], experienceSlug:'river-waterfall-trails', summary:'Shape a Meghalaya journey around waterfalls, living root bridges, clear-water routes, and comfortable hill-road transfers.', image:'/root_bridge.jpg' }),
  makeJourney({ slug:'arunachal-high-roads', title:'Arunachal: Valleys & High Roads', destinationSlugs:['tawang','dirang','ziro'], experienceSlug:'road-trips', summary:'Plan an Arunachal road journey around highland scenery, monasteries, valleys, and a vehicle suited to long mountain routes.', image:'/tawang valley.jpg' }),
  makeJourney({ slug:'sikkim-mountain-lakes', title:'Sikkim: Lakes & Mountain Landscapes', destinationSlugs:['gangtok','pelling','yumthang-valley'], experienceSlug:'nature-escapes', summary:'Combine Sikkim’s gateway city, mountain viewpoints, lakes, and valley landscapes in a journey paced to your dates.', image:'/destinations/yumthang-valley.jpg' }),
];
