import { Trip } from '../classes/TripClass';

export const initializeTrips = () => {
  return [
    new Trip(
      ['user1'],
      ['user1', 'Bob'],
      'Trip to Paris',
      'A fun trip to Paris.',
      'Paris, France',
      {
        0: { category: 'Passport', description: 'Required' },
        1: { category: 'Budget', description: '2000 USD' },
        2: { category: 'Clothing', description: 'Light and comfortable' }
      },
      new Date('2024-08-15'),
      'Planned'
    ),
    new Trip(
      ['user2'],
      ['user1', 'David'],
      'Trip to Tokyo',
      'Exploring the wonders of Tokyo.',
      'Tokyo, Japan',
      {
        0: { category: 'Passport', description: 'Required' },
        1: { category: 'Budget', description: '3000 USD' },
        2: { category: 'Clothing', description: 'Casual' }
      },
      new Date('2024-09-01'),
      'Planned'
    ),
    new Trip(
      ['user3'],
      ['user3', 'Frank'],
      'Trip to New York',
      'A weekend getaway in New York City.',
      'New York, USA',
      {
        0: { category: 'Budget', description: '1500 USD' },
        1: { category: 'Clothing', description: 'Warm clothes' }
      },
      new Date('2024-07-31'),
      'Completed'
    )
  ];
};
