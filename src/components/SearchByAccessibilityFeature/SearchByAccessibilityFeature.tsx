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
  accessibilityFormFilters: AccessibilityFilter[];
  searchAccessibilityFilters: (
    e: React.FormEvent,
    accessibilityFilters: AccessibilityFilter[]
  ) => void;
}

const SearchByAccessibilityFeature: React.FC<SearchByFeatureProps> = ({
  accessibilityFormFilters,
  searchAccessibilityFilters,
}) => {
  return (
    <>
      <h2>Search by feature</h2>
      <form
        onSubmit={(e) =>
          searchAccessibilityFilters(e, accessibilityFormFilters)
        }
      >
        {Object.entries(accessibilityFormFilters).map(
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
        <button className="primary-button" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchByAccessibilityFeature;
