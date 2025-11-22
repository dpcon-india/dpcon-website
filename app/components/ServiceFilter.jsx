'use client';

import { useGetCategoriesQuery } from '../redux-toolkit/services/serviceApi';

export default function ServiceFilter({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange
}) {
  const { data: categories } = useGetCategoriesQuery();

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange('');
  };

  return (
    <div className="w-80 bg-white border-r border-gray-100 p-0 h-fit">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-2xl font-light tracking-wide text-black mb-2">FILTER</h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest">Refine your search</p>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-black mb-6 uppercase tracking-widest">Categories</h3>
        <div className="space-y-4">
          {categories?.map(category => (
            <label key={category._id} className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border border-black transition-all duration-200 ${selectedCategories.includes(category._id)
                  ? 'bg-black'
                  : 'bg-white group-hover:bg-gray-50'
                  }`}>
                  {selectedCategories.includes(category._id) && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-900 group-hover:text-black transition-colors duration-200">
                {category.categoryName}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-sm font-medium text-black mb-6 uppercase tracking-widest">Price</h3>
        <div className="space-y-4">
          {[
            { value: '', label: 'All Prices' },
            { value: 'free', label: 'Free Services' },
            { value: 'paid', label: 'Paid Services' }
          ].map(option => (
            <label key={option.value} className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="priceRange"
                  value={option.value}
                  checked={priceRange === option.value}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border border-black transition-all duration-200 ${priceRange === option.value
                  ? 'bg-black'
                  : 'bg-white group-hover:bg-gray-50'
                  }`}>
                  {priceRange === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-900 group-hover:text-black transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="p-8">
        <button
          onClick={clearFilters}
          className="w-full text-xs text-black border border-black py-3 px-6 uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}