// Application State
let currentUser = null;

// ==========================================
// AUTHENTICATION LOGIC
// ==========================================
function login(role) {
    // Set user role based on login choice
    currentUser = {
        role: role,
        name: role === 'admin' ? 'System Administrator' : 'Recruitment Exec'
    };
    
    // UI Transitions: Hide Login, Show Dashboard
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('sidebar').classList.remove('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('main-content').classList.add('flex');
    
    // Update User Display in Sidebar
    document.getElementById('user-display').innerHTML = `Logged in as:<br><span class="font-bold text-white">${currentUser.name}</span>`;

    applyRolePermissions(role);
    switchView('dashboard');
}

function logout() {
    currentUser = null;
    
    // UI Transitions: Hide Dashboard, Show Login
    document.getElementById('sidebar').classList.add('hidden');
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('main-content').classList.remove('flex');
    document.getElementById('login-screen').classList.remove('hidden');
}

// ==========================================
// ROLE-BASED ACCESS CONTROL (RBAC)
// ==========================================
function applyRolePermissions(role) {
    const adminMenu = document.getElementById('admin-menu');
    const adminStats = document.getElementById('admin-stats');
    const recruiterStats = document.getElementById('recruiter-stats');

    if (role === 'admin') {
        adminMenu.classList.remove('hidden');
        adminStats.classList.remove('hidden');
        recruiterStats.classList.add('hidden');
        document.getElementById('dashboard-title').innerText = "Administrator Dashboard";
    } else {
        adminMenu.classList.add('hidden');
        adminStats.classList.add('hidden');
        recruiterStats.classList.remove('hidden');
        document.getElementById('dashboard-title').innerText = "Recruiter Dashboard";
    }
}

// ==========================================
// VIEW ROUTING
// ==========================================
function switchView(viewId) {
    // 1. Hide all view sections
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // 2. Show the requested view section
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.remove('hidden');
    }

    // 3. Reset all navigation button styles
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('bg-blue-600', 'text-white');
        el.classList.add('hover:bg-slate-700');
    });

    // 4. Highlight the active navigation button
    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
        activeNav.classList.remove('hover:bg-slate-700');
        activeNav.classList.add('bg-blue-600', 'text-white');
    }
}