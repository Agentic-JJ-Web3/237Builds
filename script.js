// Load startups from JSON
let startups = [];

async function loadStartups() {
    const loadingElement = document.getElementById('loading');
    const startupsGrid = document.getElementById('startupsGrid');

    try {
        // Show the loading state
        loadingElement.classList.remove('hidden');
        startupsGrid.classList.add('hidden');

        // Fetch the startup data
        const response = await fetch('./data/companies.json');
        startups = await response.json();
        filteredStartups = [...startups];

        // Render the startups
        renderStartups(filteredStartups);

        // Print cities in the console
        printCities();
    } catch (error) {
        logError('loadStartups', error);
    } finally {
        // Hide the loading state
        loadingElement.classList.add('hidden');
        startupsGrid.classList.remove('hidden');
    }
}

// Print cities in the console
function printCities() {
    try {
        const uniqueCities = [...new Set(startups.map(startup => startup.location).filter(city => city))];
        uniqueCities.sort(); // Sort cities alphabetically
        console.log('Unique Cities (Sorted):', uniqueCities);
    } catch (error) {
        logError('printCities', error);
    }
}

// Centralized error logging function
function logError(functionName, error, additionalData = null) {
    console.error(`Error in ${functionName}:`, error);
    if (additionalData) {
        console.error('Additional Data:', additionalData);
    }
}

// Initialize the application
loadStartups();
       

        let filteredStartups = [...startups];

        // DOM elements
        const searchInput = document.getElementById('searchInput');
        const startupsGrid = document.getElementById('startupsGrid');
        const noResults = document.getElementById('noResults');
        const resultsCounter = document.getElementById('resultsCounter');
        const categoryFilters = document.querySelectorAll('.category-filter');

        // Initialize the page
        function init() {
            renderStartups(filteredStartups);
            setupEventListeners();
        }

        // Populate city dropdown
        function populateCityDropdown() {
            try {
                const cityFilter = document.getElementById('cityFilter');
                const uniqueCities = [...new Set(startups.map(startup => startup.location).filter(city => city))];
                console.log(uniqueCities);
                uniqueCities.sort();
                // Clear existing options
                cityFilter.innerHTML = '<option value="all">All Cities</option>';

                uniqueCities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    cityFilter.appendChild(option);
                });
            } catch (error) {
                logError('populateCityDropdown', error);
            }
        }

        // Setup event listeners
        function setupEventListeners() {
            // Search input
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('focus', function() {
                this.classList.add('search-focus');
            });
            searchInput.addEventListener('blur', function() {
                this.classList.remove('search-focus');
            });

            // Category filters
            categoryFilters.forEach(filter => {
                filter.addEventListener('click', handleCategoryFilter);
            });

            // City filter
            document.getElementById('cityFilter').addEventListener('change', filterCompanies);

            // Clear filters button
            document.getElementById('clearFilters').addEventListener('click', clearFilters);
        }

        // Handle search functionality
        function handleSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                filteredStartups = [...startups];
            } else {
                filteredStartups = startups.filter(startup => 
                    startup.name.toLowerCase().includes(searchTerm) ||
                    startup.description.toLowerCase().includes(searchTerm) ||
                    startup.category.toLowerCase().includes(searchTerm) ||
                    startup.location.toLowerCase().includes(searchTerm)
                );
            }
            
            renderStartups(filteredStartups);
        }

        // Filter companies
        function filterCompanies() {
            const categoryFilter = document.querySelector('.category-filter.active').dataset.category;
            const cityFilter = document.getElementById('cityFilter').value;

            filteredStartups = startups.filter(startup => {
                const matchesCategory = categoryFilter === 'all' || startup.category.includes(categoryFilter);
                const matchesCity = cityFilter === 'all' || startup.location === cityFilter;
                return matchesCategory && matchesCity;
            });

            renderStartups(filteredStartups);
        }

        // Handle category filtering
        function handleCategoryFilter(e) {
            const category = e.target.dataset.category;
            
            // Update active filter button
            categoryFilters.forEach(filter => {
                filter.classList.remove('active', 'bg-green-600', 'text-white');
                filter.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            e.target.classList.add('active', 'bg-green-600', 'text-white');
            e.target.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter startups
            if (category === 'all') {
                filteredStartups = [...startups];
            } else {
                filteredStartups = startups.filter(startup => startup.category === category);
            }
            
            // Apply search if there's a search term
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm !== '') {
                filteredStartups = filteredStartups.filter(startup => 
                    startup.name.toLowerCase().includes(searchTerm) ||
                    startup.description.toLowerCase().includes(searchTerm) ||
                    startup.category.toLowerCase().includes(searchTerm) ||
                    startup.location.toLowerCase().includes(searchTerm)
                );
            }
            
            renderStartups(filteredStartups);
        }

        // Clear all filters
        function clearFilters() {
            document.getElementById('cityFilter').value = 'all';
            document.querySelector('.category-filter.active').classList.remove('active');
            document.querySelector('[data-category="all"]').classList.add('active');
            filteredStartups = [...startups];
            renderStartups(filteredStartups);
        }

        // Render startup cards
        function renderStartups(startupsToRender) {
            // Update results counter
            resultsCounter.innerHTML = `Showing <span class="font-semibold text-green-600">${startupsToRender.length}</span> Cameroonian startup${startupsToRender.length !== 1 ? 's' : ''}`;
            
            if (startupsToRender.length === 0) {
                startupsGrid.classList.add('hidden');
                noResults.classList.remove('hidden');
                return;
            }
            
            startupsGrid.classList.remove('hidden');
            noResults.classList.add('hidden');
            
            startupsGrid.innerHTML = startupsToRender.map(startup => `
                <div class="startup-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="logo-container">
                                <img src="${startup.logo}" alt="${startup.name} logo" class="w-full h-full object-cover rounded-2xl" 
                                     onerror="this.src=''; this.alt='Logo failed to load'; this.style.display='none';">
                            </div>
                            <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-1 rounded-full">
                                ${startup.category.charAt(0).toUpperCase() + startup.category.slice(1)}
                            </span>
                        </div>
                        
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${startup.name}</h3>
                        
                        <div class="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                            <span class="mr-4">📍 ${startup.location}</span>
                            <span>📅 ${startup.startDate}</span>
                        </div>
                        
                        <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">${startup.description}</p>
                        
                        <div class="flex items-center justify-between">
                            <a href="${startup.website}" target="_blank" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Visit Website →
                            </a>
                            <button onclick="shareStartup('${startup.name}', '${startup.website}')" class="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                📤 Share
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Clear search function
        function clearSearch() {
            searchInput.value = '';
            filteredStartups = [...startups];
            
            // Reset category filter to "All"
            categoryFilters.forEach(filter => {
                filter.classList.remove('active', 'bg-green-600', 'text-white');
                filter.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            document.querySelector('[data-category="all"]').classList.add('active', 'bg-green-600', 'text-white');
            document.querySelector('[data-category="all"]').classList.remove('bg-gray-200', 'text-gray-700');
            
            renderStartups(filteredStartups);
        }

        // Share startup function
        function shareStartup(name, website) {
            if (navigator.share) {
                navigator.share({
                    title: `Check out ${name} on 237Builds`,
                    text: `Discover this amazing Cameroonian startup: ${name}`,
                    url: website
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const shareText = `Check out ${name} - a Cameroonian startup! ${website} #237Builds`;
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('Startup info copied to clipboard! Share it with your friends.');
                });
            }
        }



        // Initialize the application
        init();
        
  (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'97a8e714e09ebee4',t:'MTc1NzEwODYxMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();