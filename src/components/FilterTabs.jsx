import './FilterTabs.css';

const categories = [
  { id: 'all', label: 'ทั้งหมด' }
];

function FilterTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="filter-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          type="button"
          className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
