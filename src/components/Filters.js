import '../css/Filters.css';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
const sortOptions = ['rating', 'year'];

const Filters = ({ onGenreChange, onSortChange }) => {
  return (
    <div className="filters-container">
      <select className='filters-select' onChange={e => onGenreChange(e.target.value)}>
        <option value="" >All Genres</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select className='filters-select' onChange={e => onSortChange(e.target.value)}>
        <option value="">Sort By</option>
        {sortOptions.map(s => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;