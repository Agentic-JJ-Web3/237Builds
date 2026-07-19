// Render a single startup's detail page based on the ?id= query param
async function loadStartupDetail() {
    const loadingElement = document.getElementById('loading');
    const notFoundElement = document.getElementById('notFound');
    const detailElement = document.getElementById('startupDetail');

    try {
        const response = await fetch('./data/companies.json');
        const startups = await response.json();

        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('id');
        // Number(null) and Number('') are both 0, which would wrongly match
        // id 0 when the param is missing or empty, so force those to NaN
        // (which never matches an id via strict equality).
        const id = idParam === null || idParam.trim() === '' ? NaN : Number(idParam);
        const startup = startups.find(s => s.id === id);

        if (!startup) {
            notFoundElement.classList.remove('hidden');
            return;
        }

        renderStartupDetail(startup);
        detailElement.classList.remove('hidden');
    } catch (error) {
        console.error('Failed to load startup detail:', error);
        notFoundElement.classList.remove('hidden');
    } finally {
        loadingElement.classList.add('hidden');
    }
}

function renderStartupDetail(startup) {
    document.title = `${startup.name} - 237Builds`;

    const logo = document.getElementById('detailLogo');
    logo.src = startup.logo;
    logo.alt = `${startup.name} logo`;
    logo.onerror = () => {
        logo.style.display = 'none';
    };

    document.getElementById('detailCategory').textContent =
        startup.category.charAt(0).toUpperCase() + startup.category.slice(1);
    document.getElementById('detailName').textContent = startup.name;
    document.getElementById('detailLocation').textContent = `📍 ${startup.location}`;
    document.getElementById('detailStartDate').textContent = `📅 Founded ${startup.startDate}`;
    document.getElementById('detailDescription').textContent = startup.description;

    const websiteLink = document.getElementById('detailWebsite');
    websiteLink.href = startup.website;

    document.getElementById('detailShare').addEventListener('click', () => {
        shareStartup(startup.name, startup.website);
    });

    if (Array.isArray(startup.tags) && startup.tags.length > 0) {
        const tagsContainer = document.getElementById('detailTags');
        startup.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded-full';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        document.getElementById('detailTagsWrap').classList.remove('hidden');
    }

    if (Array.isArray(startup.team) && startup.team.length > 0) {
        const teamList = document.getElementById('detailTeam');
        startup.team.forEach(member => {
            const li = document.createElement('li');
            li.textContent = member;
            teamList.appendChild(li);
        });
        document.getElementById('detailTeamWrap').classList.remove('hidden');
    }

    if (startup.fundingStage) {
        document.getElementById('detailFunding').textContent = startup.fundingStage;
        document.getElementById('detailFundingWrap').classList.remove('hidden');
    }
}

// Same share behavior as the card grid on the main page
function shareStartup(name, website) {
    if (navigator.share) {
        navigator.share({
            title: `Check out ${name} on 237Builds`,
            text: `Discover this amazing Cameroonian startup: ${name}`,
            url: website
        });
    } else {
        const shareText = `Check out ${name} - a Cameroonian startup! ${website} #237Builds`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Startup info copied to clipboard! Share it with your friends.');
        });
    }
}

loadStartupDetail();
