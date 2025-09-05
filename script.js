    
        // Sample startup data - this would come from your pgAdmin/supabase database
        const startups = [
            {
                id: 1,
                name: "MediCam",
                category: "health",
                location: "Yaoundé",
                startDate: "2023",
                description: "Telemedicine platform connecting patients with doctors across Cameroon. Book appointments, get prescriptions, and access medical records.",
                website: "https://medicam.cm",
                logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 2,
                name: "EduLearn CM",
                category: "education",
                location: "Douala",
                startDate: "2022",
                description: "Online learning platform offering courses in French and English. Focuses on technical skills and university preparation.",
                website: "https://edulearn.cm",
                logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 3,
                name: "FarmTech Cameroon",
                category: "agriculture",
                location: "Bamenda",
                startDate: "2023",
                description: "Smart farming solutions helping farmers optimize crop yields using weather data and soil analysis.",
                website: "https://farmtech.cm",
                logo: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 4,
                name: "CamerRide",
                category: "transport",
                location: "Yaoundé",
                startDate: "2022",
                description: "Ride-sharing app designed for Cameroonian cities. Safe, affordable transportation with local payment methods.",
                website: "https://camerride.cm",
                logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 5,
                name: "PayCamer",
                category: "fintech",
                location: "Douala",
                startDate: "2021",
                description: "Mobile money solution integrating with local banks. Send money, pay bills, and manage finances easily.",
                website: "https://paycamer.cm",
                logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 6,
                name: "MarketPlace CM",
                category: "ecommerce",
                location: "Bamenda",
                startDate: "2023",
                description: "E-commerce platform for local businesses. Buy and sell products made in Cameroon with local delivery.",
                website: "https://marketplace.cm",
                logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 7,
                name: "HealthTracker CM",
                category: "health",
                location: "Douala",
                startDate: "2022",
                description: "Personal health monitoring app with medication reminders and health tips in local languages.",
                website: "https://healthtracker.cm",
                logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 8,
                name: "SkillUp Cameroon",
                category: "education",
                location: "Yaoundé",
                startDate: "2023",
                description: "Professional development platform offering coding bootcamps and digital marketing courses.",
                website: "https://skillup.cm",
                logo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 9,
                name: "AgriMarket CM",
                category: "agriculture",
                location: "Bafoussam",
                startDate: "2022",
                description: "Digital marketplace connecting farmers directly with buyers. Fair prices and reduced middleman costs.",
                website: "https://agrimarket.cm",
                logo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 10,
                name: "BusTracker CM",
                category: "transport",
                location: "Douala",
                startDate: "2023",
                description: "Real-time bus tracking for public transportation in major Cameroonian cities.",
                website: "https://bustracker.cm",
                logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 11,
                name: "CamerPay",
                category: "fintech",
                location: "Yaoundé",
                startDate: "2021",
                description: "Digital wallet supporting multiple currencies including CFA Franc. Secure and fast transactions.",
                website: "https://camerpay.cm",
                logo: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 12,
                name: "LocalShop CM",
                category: "ecommerce",
                location: "Bamenda",
                startDate: "2023",
                description: "Support local artisans and craftspeople by buying authentic Cameroonian products online.",
                website: "https://localshop.cm",
                logo: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center"
            }
        ];

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