/**
 * VANLIFE CONNECT - APP LOGIC
 * Main application JavaScript
 */

// ============================================
// APP STATE
// ============================================
const AppState = {
    currentTab: 'feed',
    currentChannel: 'all',
    mapInitialized: false,
    map: null,
    heatLayer: null,
    explorationMarker: null,
    currentPinLocation: null,
    currentUser: {
        name: "Julian Petermaier",
        handle: "@JPE_Studio",
        avatar: "😎"
    }
};

// ============================================
// ONBOARDING
// ============================================
function closeOnboarding() {
    document.getElementById('onboarding').classList.add('hidden');
}

// ============================================
// NAVIGATION
// ============================================
function switchTab(tab, btn) {
    // Hide all pages
    document.querySelectorAll('.page, .channels-page, .messages-page, .notifications-page, .profile-page, .map-page')
        .forEach(p => p.classList.remove('active'));
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    // Show selected page
    const pageMap = {
        'feed': 'feedPage',
        'channels': 'channelsPage',
        'messages': 'messagesPage',
        'notifications': 'notificationsPage',
        'profile': 'profilePage',
        'map': 'mapPage'
    };
    
    if (pageMap[tab]) {
        document.getElementById(pageMap[tab]).classList.add('active');
    }
    
    // Set active nav item
    if (btn) btn.classList.add('active');
    
    // Special handling for map
    if (tab === 'map') {
        setTimeout(initMap, 100);
    }
    
    AppState.currentTab = tab;
}

// ============================================
// CHANNEL FILTER
// ============================================
function filterChannel(channel, btn) {
    document.querySelectorAll('.channel-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        if (channel === 'all' || post.dataset.channel === channel) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    AppState.currentChannel = channel;
}

// ============================================
// MESSAGES TABS
// ============================================
function switchMessagesTab(tab, btn) {
    document.querySelectorAll('.messages-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    document.getElementById('dmsList').style.display = tab === 'dms' ? 'block' : 'none';
    document.getElementById('groupsList').style.display = tab === 'groups' ? 'block' : 'none';
}

// ============================================
// TRANSLATE POST
// ============================================
function translatePost(postId, event) {
    if (event) event.stopPropagation();
    
    const translated = document.getElementById('post' + postId + '-translated');
    if (!translated) return;
    
    translated.classList.toggle('visible');
    showToast(translated.classList.contains('visible') ? 'Übersetzung angezeigt' : 'Übersetzung ausgeblendet');
}

// ============================================
// LIKE FUNCTIONALITY
// ============================================
function toggleLike(btn, event) {
    if (event) event.stopPropagation();
    
    const isLiked = btn.classList.contains('liked');
    const span = btn.querySelector('span');
    let count = parseInt(span?.textContent || '0');
    
    if (isLiked) {
        btn.classList.remove('liked');
        btn.innerHTML = getLikeSVG(false) + `<span>${count - 1}</span>`;
    } else {
        btn.classList.add('liked');
        btn.innerHTML = getLikeSVG(true) + `<span>${count + 1}</span>`;
    }
}

function getLikeSVG(filled) {
    if (filled) {
        return `<svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;
    }
    return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;
}

// ============================================
// COMMENTS PAGE
// ============================================
function openCommentsPage(postId, event) {
    if (event) event.stopPropagation();
    
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    
    const preview = document.getElementById('originalPostPreview');
    preview.innerHTML = `
        <div class="post-header" style="padding: 0 0 8px 0;">
            <div class="post-author">
                <div class="avatar">${post.avatar}</div>
                <div class="author-info">
                    <h4>${post.author}</h4>
                    <span class="channel-tag">${post.channelTag}</span>
                </div>
            </div>
        </div>
        <div class="post-content" style="padding: 0;">${post.content}</div>
    `;
    
    // Filter messages for this post
    const messages = document.querySelectorAll('#chatMessages .message');
    messages.forEach(msg => {
        msg.style.display = parseInt(msg.dataset.post) === postId ? 'flex' : 'none';
    });
    
    document.getElementById('commentsPage').classList.add('active');
}

function closeCommentsPage() {
    document.getElementById('commentsPage').classList.remove('active');
}

// ============================================
// CREATE POST MODAL
// ============================================
function openCreatePost() {
    document.getElementById('createPostOverlay').classList.add('active');
    document.getElementById('createPostModal').classList.add('active');
}

function closeCreatePost(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('createPostOverlay').classList.remove('active');
    document.getElementById('createPostModal').classList.remove('active');
}

function selectChannel(btn) {
    document.querySelectorAll('.channel-option').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
}

function updateCharCount(textarea) {
    const counter = document.querySelector('.char-count');
    if (counter) counter.textContent = textarea.value.length + '/500';
}

function submitPost() {
    const textarea = document.querySelector('.create-post-textarea');
    if (textarea && textarea.value.trim()) {
        showToast('Post erstellt!');
        textarea.value = '';
        updateCharCount(textarea);
        closeCreatePost();
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2000);
}

// ============================================
// MAP FUNCTIONALITY
// ============================================
function initMap() {
    if (AppState.mapInitialized || !document.getElementById('mapContainer')) return;
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded yet');
        return;
    }
    
    // Initialize map centered on Europe
    AppState.map = L.map('mapContainer').setView([48.5, 15], 5);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(AppState.map);
    
    // Add heatmap layer
    const heatData = mapHotspotsData.map(loc => [loc.lat, loc.lng, loc.intensity]);
    AppState.heatLayer = L.heatLayer(heatData, {
        radius: 35,
        blur: 25,
        maxZoom: 10,
        max: 1.0,
        gradient: {
            0.4: '#FFD700',
            0.6: '#FFA500',
            0.8: '#FF8F00',
            1.0: '#FF4500'
        }
    }).addTo(AppState.map);
    
    // Add click handler
    AppState.map.on('click', onMapClick);
    
    AppState.mapInitialized = true;
}

function onMapClick(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    // Remove existing marker
    if (AppState.explorationMarker) {
        AppState.map.removeLayer(AppState.explorationMarker);
    }
    
    // Add new marker
    AppState.explorationMarker = L.marker([lat, lng]).addTo(AppState.map);
    AppState.currentPinLocation = { lat, lng };
    
    // Find nearby posts
    showNearbyPosts(lat, lng);
}

function showNearbyPosts(lat, lng) {
    const radius = 100; // km
    const nearby = mapHotspotsData.filter(loc => {
        const distance = calculateDistance(lat, lng, loc.lat, loc.lng);
        return distance <= radius;
    }).slice(0, 3);
    
    const mapInfo = document.getElementById('mapInfo');
    const postList = document.getElementById('mapPostList');
    const exploreBtn = document.getElementById('exploreFeedBtn');
    
    if (nearby.length === 0) {
        postList.innerHTML = '<p style="color: #666; text-align: center;">Keine Posts in dieser Region</p>';
        if (exploreBtn) exploreBtn.style.display = 'none';
    } else {
        postList.innerHTML = nearby.map(loc => `
            <div class="map-post-item">
                <div class="map-post-author">📍 ${loc.city} (${loc.posts} Posts)</div>
                ${loc.samplePosts.map(post => `
                    <div class="map-post-text"><strong>${post.author}:</strong> ${post.text}</div>
                    <div class="map-post-time">${post.time}</div>
                `).join('')}
            </div>
        `).join('');
        if (exploreBtn) exploreBtn.style.display = 'block';
    }
    
    mapInfo.classList.add('active');
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function closeMapInfo() {
    document.getElementById('mapInfo').classList.remove('active');
}

function exploreFeedFromPin() {
    showToast('🔍 Feed wird geladen...');
    closeMapInfo();
    switchTab('feed', document.querySelector('.nav-item:first-child'));
}

// ============================================
// SETTINGS PAGE
// ============================================
function openSettings() {
    document.getElementById('settingsPage').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsPage').classList.remove('active');
}

function toggleSwitch(element) {
    element.classList.toggle('active');
}

// ============================================
// SAVED SPOTS
// ============================================
function openSavedSpots() {
    document.getElementById('savedSpotsPage').classList.add('active');
}

function closeSavedSpots() {
    document.getElementById('savedSpotsPage').classList.remove('active');
}

function filterSavedSpots(category, btn) {
    document.querySelectorAll('.saved-spots-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const spots = document.querySelectorAll('.saved-spot-card');
    spots.forEach(spot => {
        if (category === 'all' || spot.dataset.category?.includes(category)) {
            spot.style.display = 'block';
        } else {
            spot.style.display = 'none';
        }
    });
}

function deleteSavedSpot(id) {
    showToast('Spot entfernt');
    const card = document.querySelector(`.saved-spot-card[data-spot-id="${id}"]`);
    if (card) card.remove();
}

// ============================================
// MY POSTS
// ============================================
function openMyPosts() {
    document.getElementById('myPostsPage').classList.add('active');
}

function closeMyPosts() {
    document.getElementById('myPostsPage').classList.remove('active');
}

function filterMyPosts(channel, btn) {
    document.querySelectorAll('.my-posts-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const posts = document.querySelectorAll('.my-post-card');
    posts.forEach(post => {
        if (channel === 'all' || post.dataset.channel === channel) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function editMyPost(id) {
    showToast('Post bearbeiten...');
}

function deleteMyPost(id) {
    if (confirm('Post wirklich löschen?')) {
        showToast('Post gelöscht');
    }
}

// ============================================
// SPOT DETAIL
// ============================================
function openSpotDetail(id) {
    const spot = spotDetailData[id];
    if (!spot) return;
    
    document.getElementById('spotDetailEmoji').textContent = spot.emoji;
    document.getElementById('spotDetailName').textContent = spot.name;
    document.getElementById('spotDetailReviews').textContent = `${spot.rating} (${spot.reviews} Bewertungen)`;
    document.getElementById('spotDetailDescription').textContent = spot.description;
    
    // Update amenities
    const amenitiesContainer = document.getElementById('spotDetailAmenities');
    if (amenitiesContainer) {
        amenitiesContainer.innerHTML = spot.amenities.map(a => 
            `<span class="spot-detail-amenity">${a}</span>`
        ).join('');
    }
    
    document.getElementById('spotDetailPage').classList.add('active');
}

function closeSpotDetail() {
    document.getElementById('spotDetailPage').classList.remove('active');
}

function toggleSaveSpot() {
    const icon = document.getElementById('saveSpotIcon');
    if (icon.textContent === '🔖') {
        icon.textContent = '📌';
        showToast('Spot gespeichert');
    } else {
        icon.textContent = '🔖';
        showToast('Spot entfernt');
    }
}

function checkInToSpot() {
    showToast('📍 Eingecheckt!');
}

// ============================================
// CHAT DETAIL
// ============================================
function openChatDetail(name, avatar) {
    document.getElementById('chatDetailName').textContent = name;
    document.getElementById('chatDetailAvatar').textContent = avatar;
    
    // Load chat history
    const messagesContainer = document.getElementById('chatDetailMessages');
    const history = chatHistoryData[name] || [];
    
    messagesContainer.innerHTML = history.map(msg => `
        <div class="chat-detail-message ${msg.own ? 'own' : ''}">
            <div class="chat-detail-message-bubble">
                ${msg.text}
                <div class="chat-detail-message-time">${msg.time}</div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('chatDetailPage').classList.add('active');
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function closeChatDetail() {
    document.getElementById('chatDetailPage').classList.remove('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    
    const messagesContainer = document.getElementById('chatDetailMessages');
    const time = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    
    const newMessage = document.createElement('div');
    newMessage.className = 'chat-detail-message own';
    newMessage.innerHTML = `
        <div class="chat-detail-message-bubble">
            ${input.value}
            <div class="chat-detail-message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
}

// ============================================
// SEARCH
// ============================================
function openSearch() {
    document.getElementById('searchPage').classList.add('active');
    document.getElementById('searchInput')?.focus();
}

function closeSearch() {
    document.getElementById('searchPage').classList.remove('active');
}

function performSearch(query) {
    // Implement search logic here
    console.log('Searching for:', query);
}

function setSearchFilter(filter, btn) {
    document.querySelectorAll('.search-filter-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function setSearchTag(tag) {
    const input = document.getElementById('searchInput');
    if (input) input.value = tag;
}

// ============================================
// DISCOVER PAGE
// ============================================
function openDiscover() {
    document.getElementById('discoverPage').classList.add('active');
}

function closeDiscover() {
    document.getElementById('discoverPage').classList.remove('active');
}

function switchDiscoverTab(tab, btn) {
    document.querySelectorAll('.discover-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Hide all sections
    document.getElementById('discoverTrending').style.display = 'none';
    document.getElementById('discoverNearby').style.display = 'none';
    document.getElementById('discoverChannels').style.display = 'none';

    // Show selected section
    if (tab === 'trending') {
        document.getElementById('discoverTrending').style.display = 'block';
    } else if (tab === 'nearby') {
        document.getElementById('discoverNearby').style.display = 'block';
    } else if (tab === 'channels') {
        document.getElementById('discoverChannels').style.display = 'block';
    }
}

// ============================================
// EDIT PROFILE PAGE
// ============================================
function openEditProfile() {
    document.getElementById('editProfilePage').classList.add('active');
}

function closeEditProfile() {
    document.getElementById('editProfilePage').classList.remove('active');
}

function changeAvatar() {
    showToast('Avatar-Optionen werden geladen...');
}

function saveProfile() {
    showToast('✅ Profil gespeichert!');
    closeEditProfile();
}

// ============================================
// LANGUAGE PAGE
// ============================================
function openLanguage() {
    document.getElementById('languagePage').classList.add('active');
}

function closeLanguage() {
    document.getElementById('languagePage').classList.remove('active');
}

function selectLanguage(element) {
    // Remove selected from all items
    document.querySelectorAll('.language-item').forEach(item => {
        item.classList.remove('selected');
        item.querySelector('.language-check').style.display = 'none';
    });

    // Add selected to clicked item
    element.classList.add('selected');
    element.querySelector('.language-check').style.display = 'block';

    // Update current language display
    const flag = element.querySelector('.language-flag').textContent;
    const name = element.querySelector('.language-name').textContent;
    const currentInfo = document.querySelector('.language-current-value');
    if (currentInfo) {
        currentInfo.textContent = `${flag} ${name}`;
    }

    showToast(`Sprache geändert zu ${name}`);
}

// ============================================
// HELP PAGE
// ============================================
function openHelp() {
    document.getElementById('helpPage').classList.add('active');
}

function closeHelp() {
    document.getElementById('helpPage').classList.remove('active');
}

function showHelpSection(section) {
    // Hide all sections
    document.getElementById('helpFaq').style.display = 'none';
    document.getElementById('helpSafety').style.display = 'none';
    document.getElementById('helpContact').style.display = 'none';

    // Show selected section
    if (section === 'faq') {
        document.getElementById('helpFaq').style.display = 'block';
    } else if (section === 'safety') {
        document.getElementById('helpSafety').style.display = 'block';
    } else if (section === 'contact') {
        document.getElementById('helpContact').style.display = 'block';
    } else if (section === 'tutorial') {
        showToast('Tutorial wird gestartet...');
        closeHelp();
    }
}

function toggleHelpAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle('active');
}

function submitFeedback() {
    showToast('✅ Feedback gesendet!');
}

function openUrl(url) {
    window.open(url, '_blank');
}

// ============================================
// NOTIFICATION SETTINGS PAGE
// ============================================
function openNotificationSettings() {
    document.getElementById('notificationSettingsPage').classList.add('active');
}

function closeNotificationSettings() {
    document.getElementById('notificationSettingsPage').classList.remove('active');
}

// ============================================
// BLOCKED USERS PAGE
// ============================================
function openBlockedUsers() {
    document.getElementById('blockedUsersPage').classList.add('active');
}

function closeBlockedUsers() {
    document.getElementById('blockedUsersPage').classList.remove('active');
}

function unblockUser(btn, username) {
    if (confirm(`Möchtest du ${username} wirklich entblocken?`)) {
        const card = btn.closest('.blocked-user-card');
        card.style.opacity = '0.5';
        btn.textContent = '✓ Entblockt';
        btn.disabled = true;
        setTimeout(() => {
            card.remove();
            showToast(`${username} entblockt`);
        }, 1000);
    }
}

// ============================================
// FOLLOWERS
// ============================================
function openFollowers() {
    document.getElementById('followersPage').classList.add('active');
}

function closeFollowers() {
    document.getElementById('followersPage').classList.remove('active');
}

function switchFollowersTab(tab, btn) {
    document.querySelectorAll('.followers-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    // Filter followers list
    const items = document.querySelectorAll('.follower-item');
    items.forEach(item => {
        if (tab === 'followers') {
            item.style.display = 'flex';
        } else {
            // Show only followed users
            const btn = item.querySelector('.follow-btn');
            item.style.display = btn?.classList.contains('following') ? 'flex' : 'none';
        }
    });
}

function toggleFollow(btn) {
    if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.textContent = 'Folgen';
    } else {
        btn.classList.add('following');
        btn.textContent = 'Folge ich';
    }
}

function searchFollowers(query) {
    const items = document.querySelectorAll('.follower-item');
    const lowerQuery = query.toLowerCase();
    
    items.forEach(item => {
        const name = item.querySelector('.follower-name')?.textContent.toLowerCase() || '';
        const handle = item.querySelector('.follower-handle')?.textContent.toLowerCase() || '';
        item.style.display = (name.includes(lowerQuery) || handle.includes(lowerQuery)) ? 'flex' : 'none';
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if onboarding was already shown
    if (localStorage.getItem('onboardingShown')) {
        closeOnboarding();
    }
    
    // Mark onboarding as shown after first visit
    document.querySelector('.onboarding-btn')?.addEventListener('click', function() {
        localStorage.setItem('onboardingShown', 'true');
    });
    
    // Initialize feed posts from data
    renderFeedPosts();
    
    // Initialize channels from data
    renderChannels();
    
    // Initialize messages from data
    renderMessages();
    
    // Initialize notifications from data
    renderNotifications();
    
    // Initialize saved spots from data
    renderSavedSpots();
    
    // Initialize my posts from data
    renderMyPosts();
});

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderFeedPosts() {
    const feed = document.getElementById('feed');
    if (!feed) return;
    
    // Keep the existing posts (they're in the HTML)
    // This function would be used for dynamic loading
}

function renderChannels() {
    const container = document.querySelector('.channels-list');
    if (!container) return;
    
    // Channels are static in HTML for now
}

function renderMessages() {
    const dmsList = document.getElementById('dmsList');
    if (!dmsList) return;
    
    // Messages are static in HTML for now
}

function renderNotifications() {
    const container = document.querySelector('.notifications-list');
    if (!container) return;
    
    // Notifications are static in HTML for now
}

function renderSavedSpots() {
    const container = document.getElementById('savedSpotsList');
    if (!container) return;
    
    // Spots are static in HTML for now
}

function renderMyPosts() {
    const container = document.getElementById('myPostsList');
    if (!container) return;
    
    // Posts are static in HTML for now
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Touch handling for swipe gestures
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(element) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(element) {
    touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd(element) {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        element.classList.toggle('swiped', diff > 0);
    }
}
