import { expect, test } from 'vitest';
import { mockGamesData } from './mockGamesData';
import { filterGames } from '../App';

interface SelectedFilter {
  category: string;
  key: string;
}

test('returns no games when filters are empty', () => {
  const selectedFilters: SelectedFilter[] = [];
  const filteredGames = filterGames(mockGamesData, selectedFilters);
  expect(filteredGames).toEqual([]);
});

test('returns games when a single filter is selected', () => {
  const selectedFilters: SelectedFilter[] = [
    { category: 'visual', key: 'colorblind_mode' },
  ];
  const filteredGames = filterGames(mockGamesData, selectedFilters);
  expect(filteredGames).toEqual([mockGamesData[0], mockGamesData[2]]);
});

test('returns games when multiple filters are selected', () => {
  const selectedFilters: SelectedFilter[] = [
    { category: 'visual', key: 'colorblind_mode' },
    { category: 'controls', key: 'remappable_controls' },
  ];
  const filteredGames = filterGames(mockGamesData, selectedFilters);
  expect(filteredGames).toEqual([mockGamesData[0], mockGamesData[2]]);
});
