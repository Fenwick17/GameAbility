import { supabase } from '../../lib/supabaseClient';

const AddAccessibilityFeaturesForm = ({ game }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: insertError } = await supabase
      .from('accessibility_games')
      .insert({
        rawg_id: game.id,
        name: game.name,
        accessibility_data: {
          category: e.target.category.value,
          features: {
            key: e.target.feature.value,
            name: e.target.feature.value,
            levelInfo: {
              level: e.target.level.value,
              notes: '',
            },
          },
        },
        submittedBy: 'TODO AFTER AUTH',
      });
    console.log(insertError);
    return;
  };
  return (
    <>
      <h3>No accessibility features found</h3>
      <p>Add features</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
            <option value="visual">Visual</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="feature">Feature</label>
          <select id="feature" name="feature">
            <option value="colourblind_mode">Colourblind mode</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="level">Level</label>
          <select id="level" name="level">
            <option value="level">Basic</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddAccessibilityFeaturesForm;
