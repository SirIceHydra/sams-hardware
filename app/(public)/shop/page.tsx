/**
 * Sam's Hardware Shop Page
 * 
 * Main shop page with product grid, filters, and search.
 */

'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { useProducts } from '@/shop/core/hooks/useProducts';
import { useCategories } from '@/shop/core/hooks/useCategories';
import { useBrands } from '@/shop/core/hooks/useBrands';
import { useShop } from '@/shop/core/ShopProvider';
import { ProductGrid } from '@/shop/ui/ProductGrid';
import { LoadingSpinner } from '@/shop/ui/LoadingSpinner';
import { debounce } from '@/shop/utils/helpers';
import { WOOCOMMERCE_CONFIG } from '@/shop/utils/constants';
import toast from 'react-hot-toast';
import type { Product, ProductQuery } from '@/shop/core/ports';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Hooks
  const { products: allProducts, loading, error, total, totalPages, currentPage, fetchProducts } = useProducts();
  const { categories, fetchCategories } = useCategories();
  const { brands, fetchBrands } = useBrands();
  const { cart } = useShop();
  const { addItem } = cart;
  
  // Local state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  // Parse initial categories from URL
  const initialCategories = searchParams.get('category') 
    ? searchParams.get('category')!.split(',').map(Number).filter(n => !isNaN(n))
    : [];
  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialCategories);
  
  // Parse initial brands from URL
  const initialBrands = searchParams.get('brand') 
    ? searchParams.get('brand')!.split(',')
    : [];
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);

  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'date');
  
  // Client-side brand filtering as fallback (in case backend doesn't filter correctly)
  const products = React.useMemo(() => {
    if (selectedBrands.length === 0) return allProducts;
    
    // Filter products by brand name (case-insensitive)
    const filtered = allProducts.filter(product => {
      const productBrand = product.brand?.toLowerCase().trim();
      
      // Check if product brand matches any of the selected brands
      const matches = selectedBrands.some(brand => {
        const selectedBrandLower = brand.toLowerCase().trim();
        return productBrand === selectedBrandLower;
      });
      
      return matches;
    });
    
    if (selectedBrands.length > 0 && filtered.length === 0 && allProducts.length > 0) {
      console.warn('⚠️ [Shop] No products matched brand filter. Available brands in products:', 
        [...new Set(allProducts.map(p => p.brand).filter(Boolean))]);
    }
    
    return filtered;
  }, [allProducts, selectedBrands]);
  
  // Build query from state - fetch all products when category/search/brand is active (like Oracle Gaming)
  const buildQuery = useCallback((): ProductQuery => {
    // If category, brand, or search is active, fetch all products (like Oracle Gaming does)
    // Otherwise, use pagination
    const hasActiveFilter = selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm;
    const perPage = hasActiveFilter ? 100 : WOOCOMMERCE_CONFIG.PRODUCTS_PER_PAGE;
    const page = hasActiveFilter ? 1 : parseInt(searchParams.get('page') || '1');
    
    const query: ProductQuery = {
      page,
      perPage,
      orderBy: 'date',
      order: 'desc',
    };
    
    if (searchTerm) query.search = searchTerm;
    if (selectedCategories.length > 0) query.categoryId = selectedCategories;
    if (selectedBrands.length > 0) query.brand = selectedBrands;
    
    switch (sortBy) {
      case 'price_low':
        query.orderBy = 'price';
        query.order = 'asc';
        break;
      case 'price_high':
        query.orderBy = 'price';
        query.order = 'desc';
        break;
      case 'name':
        query.orderBy = 'name';
        query.order = 'asc';
        break;
      case 'popularity':
        query.orderBy = 'popularity';
        query.order = 'desc';
        break;
      default:
        query.orderBy = 'date';
        query.order = 'desc';
    }
    
    return query;
  }, [searchParams, searchTerm, selectedCategories, selectedBrands, sortBy]);
  
  // Fetch products on mount and when filters change
  useEffect(() => {
    const query = buildQuery();
    console.log('🛒 [Shop] Fetching products with query:', query);
    if (query.brand) {
      console.log('🔍 [Shop] Brand filter active:', query.brand);
    }
    fetchProducts(query);
  }, [fetchProducts, buildQuery]);
  
  // Fetch categories and brands on mount
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [fetchCategories, fetchBrands]);
  
  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  // Category filter handler
  const handleCategoryChange = (categoryId: number | null) => {
    let newCategories: number[];
    
    if (categoryId === null) {
      // Clear all
      newCategories = [];
    } else {
      // Toggle
      if (selectedCategories.includes(categoryId)) {
        newCategories = selectedCategories.filter(id => id !== categoryId);
      } else {
        newCategories = [...selectedCategories, categoryId];
      }
    }
    
    setSelectedCategories(newCategories);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategories.length > 0) {
      params.set('category', newCategories.join(','));
    } else {
      params.delete('category');
    }
    
    params.delete('page');
    router.push(`?${params.toString()}`);
  };
  
  // Brand filter handler
  const handleBrandChange = (brand: string | null) => {
    let newBrands: string[];
    
    if (brand === null) {
      // Clear all
      newBrands = [];
    } else {
      // Toggle
      if (selectedBrands.includes(brand)) {
        newBrands = selectedBrands.filter(b => b !== brand);
      } else {
        newBrands = [...selectedBrands, brand];
      }
    }
    
    setSelectedBrands(newBrands);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newBrands.length > 0) {
      params.set('brand', newBrands.join(','));
    } else {
      params.delete('brand');
    }
    
    params.delete('page');
    router.push(`?${params.toString()}`);
  };
  
  // Sort handler
  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };
  
  // Pagination handler
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    if (product.stockStatus === 'outofstock') {
      toast.error('This product is out of stock');
      return;
    }
    
    const success = addItem(product, 1);
    if (success) {
      toast.success('Added to cart');
    } else {
      toast.error('Could not add to cart');
    }
  };
  
  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy('date');
    router.push('/shop');
  };
  
  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || selectedBrands.length > 0 || sortBy !== 'date';
  
  return (
    <main className="min-h-screen bg-te-white">
      {/* Hero Section */}
      <section className="bg-te-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-te-white tracking-tight mb-4">
            SHOP
          </h1>
          <p className="text-te-white/70 text-lg max-w-xl">
            Browse our collection of quality hardware, tools, and equipment.
          </p>
        </div>
      </section>
      
      {/* Filters & Products */}
      <section className="container mx-auto px-4 py-8 pb-24">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--te-grey-400)] pointer-events-none z-10" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="te-input w-full"
              style={{ paddingLeft: '3rem', paddingRight: searchTerm ? '3rem' : '1rem' }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  debouncedSearch('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-te-grey hover:text-te-dark"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {/* Sort & Filter Buttons */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="te-input appearance-none pr-10 cursor-pointer"
              >
                <option value="date">Newest</option>
                <option value="popularity">Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-te-grey pointer-events-none" size={18} />
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="te-button flex items-center gap-2 md:hidden"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
            
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-te-grey hover:text-te-dark transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        
        {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm) && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            {selectedCategories.map(catId => {
              const cat = categories.find(c => c.id === catId);
              return (
                <button
                  key={catId}
                  onClick={() => handleCategoryChange(catId)}
                  className="te-badge te-badge-yellow"
                  title="Remove category filter"
                >
                  <span>Category: {cat?.name || catId}</span>
                  <X size={14} />
                </button>
              );
            })}
            
            {selectedBrands.map(brand => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className="te-badge te-badge-yellow"
                title="Remove brand filter"
              >
                <span>Brand: {brands.find(b => b.name === brand)?.name || brand}</span>
                <X size={14} />
              </button>
            ))}
            
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  debouncedSearch('');
                }}
                className="te-badge"
                title="Remove search filter"
              >
                <span>Search: {searchTerm}</span>
                <X size={14} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="te-panel p-6 sticky top-24 self-start space-y-6" style={{ maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto' }}>
              {/* Categories */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-te-dark mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategories.length === 0 
                          ? 'bg-te-yellow text-te-dark font-medium' 
                          : 'text-te-grey hover:text-te-dark hover:bg-te-grey/10'
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategoryChange(category.id)}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-te-yellow/20 text-te-dark font-medium' 
                              : 'text-te-grey hover:text-te-dark hover:bg-te-grey/10'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <div className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? 'border-te-dark bg-te-dark text-te-white' : 'border-te-grey/50'}`}>
                                {isSelected && <Check size={12} />}
                            </div>
                            {category.name}
                          </span>
                          {category.count !== undefined && (
                            <span className="ml-2 text-xs opacity-60">({category.count})</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {/* Brands */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-te-dark mb-4">
                  Brands
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleBrandChange(null)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedBrands.length === 0
                          ? 'bg-te-yellow text-te-dark font-medium' 
                          : 'text-te-grey hover:text-te-dark hover:bg-te-grey/10'
                      }`}
                    >
                      All Brands
                    </button>
                  </li>
                  {brands.map((brand) => {
                    // Use brand name for filtering (products store brand as name string)
                    const brandValue = brand.name;
                    const isSelected = selectedBrands.includes(brandValue);
                    return (
                      <li key={brand.id || brand.name}>
                        <button
                          onClick={() => handleBrandChange(brandValue)}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-te-yellow/20 text-te-dark font-medium' 
                              : 'text-te-grey hover:text-te-dark hover:bg-te-grey/10'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <div className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? 'border-te-dark bg-te-dark text-te-white' : 'border-te-grey/50'}`}>
                                {isSelected && <Check size={12} />}
                            </div>
                            {brand.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
          
          {/* Products */}
          <div className="flex-1 min-h-[60vh]">
            {/* Results Count */}
            <p className="text-sm text-[var(--te-grey-400)] mb-6">
              {loading ? 'Loading...' : (
                selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm
                  ? `Showing ${products.length} products`
                  : `Showing ${products.length} of ${total} products${totalPages > 1 ? ` (Page ${currentPage} of ${totalPages})` : ''}`
              )}
            </p>
            
            {/* Product Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              columns={3}
            />
            
            {/* Pagination - Only show when no category/brand/search filter is active */}
            {!loading && totalPages > 1 && selectedCategories.length === 0 && selectedBrands.length === 0 && !searchTerm && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  {/* Previous button */}
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="h-10 px-4 flex items-center justify-center text-sm font-medium transition-colors border-2 bg-[var(--te-white)] text-[var(--te-dark)] border-[var(--te-grey-200)] hover:border-[var(--te-yellow)] hover:bg-[var(--te-cream)]"
                    >
                      Previous
                    </button>
                  )}
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!showPage) {
                      // Show ellipsis
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="h-10 w-10 flex items-center justify-center text-[var(--te-grey-400)]">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`h-10 w-10 flex items-center justify-center text-sm font-medium transition-colors border-2 ${
                          currentPage === page
                            ? 'bg-[var(--te-dark)] text-[var(--te-white)] border-[var(--te-dark)]'
                            : 'bg-[var(--te-white)] text-[var(--te-dark)] border-[var(--te-grey-200)] hover:border-[var(--te-yellow)] hover:bg-[var(--te-cream)]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  {/* Next button */}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="h-10 px-4 flex items-center justify-center text-sm font-medium transition-colors border-2 bg-[var(--te-white)] text-[var(--te-dark)] border-[var(--te-grey-200)] hover:border-[var(--te-yellow)] hover:bg-[var(--te-cream)]"
                    >
                      Next
                    </button>
                  )}
                </div>
                <p className="text-xs text-[var(--te-grey-400)]">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading shop..." />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

