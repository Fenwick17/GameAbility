import { Game } from '../types/gamesData';

interface SelectedFilter {
  category: 'visual' | 'controls' | 'audio' | 'cognitive' | 'gameplay';
  key: string;
}

export const filterGames = (
  games: Game[],
  filters: SelectedFilter[]
): Game[] => {
  if (filters.length === 0) {
    return [];
  }

  return games.filter((game) =>
    filters.every((filter) =>
      game.accessibility.some(
        (category) =>
          category.category === filter.category &&
          category.features.some((feature) => feature.key === filter.key)
      )
    )
  );
};
