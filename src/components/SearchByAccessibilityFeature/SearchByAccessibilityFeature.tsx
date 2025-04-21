import { mockGamesData } from '../../test/mockGamesData';

interface AccessibilityFilter {
  category: string;
  features: {
    key: string;
    name: string;
    level: string[];
  }[];
}

interface SearchByFeatureProps {
  accessibilityFilters: AccessibilityFilter[];
}

const SearchByAccessibilityFeature: React.FC<SearchByFeatureProps> = ({
  accessibilityFilters,
}) => {
  const searchAccessibilityFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const selectedFilters: { category: string; key: string }[] = [];

    for (const [key, value] of formData.entries()) {
      const parentCategory = Object.values(accessibilityFilters).find(
        (category) => category.features.some((feature) => feature.key === key)
      );

      if (parentCategory) {
        selectedFilters.push({
          category: parentCategory.category,
          key: value,
        });
      }
    }
    findGamesByFilter(selectedFilters);
  };

  const findGamesByFilter = (selectedFilters) => {
    const filteredGames = mockGamesData.filter((game) =>
      selectedFilters.every((filter) =>
        game.accessibility.some(
          (category) =>
            category.category.toLowerCase() === filter.category.toLowerCase() &&
            category.features.some(
              (feature) =>
                feature.key.toLowerCase() === filter.key.toLowerCase()
            )
        )
      )
    );
    return filteredGames;
  };

  return (
    <>
      <h2>Search by feature</h2>
      <form onSubmit={searchAccessibilityFilters}>
        {Object.entries(accessibilityFilters).map(
          ([categoryKey, categoryData]) => (
            <div key={categoryKey} className="form-group">
              <fieldset>
                <legend>{categoryData.label}</legend>
                {categoryData.features.map((feature) => (
                  <div key={feature.key}>
                    <label htmlFor={feature.key}>{feature.name}</label>
                    <input
                      type="checkbox"
                      name={feature.key}
                      id={feature.key}
                      value={feature.key}
                    />
                  </div>
                ))}
              </fieldset>
            </div>
          )
        )}
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default SearchByAccessibilityFeature;
