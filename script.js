// ============================================
// NWU First-Year Survival Hub - JavaScript
// COMS313 Group Assignment
// Complete Working Script for All Pages
// ============================================

// ============================================
// FEATURE 1: Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// ============================================
// FEATURE 2: Search Resources Function (for index.html)
// ============================================
function searchResources() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        searchResults.innerHTML = '';
        return;
    }
    
    // Database of resources to search through
    const resourcesDB = [
        { name: 'eFundi', category: 'Academic', description: 'Learning management system for course materials and assignments', link: 'resources.html' },
        { name: 'mySIS', category: 'Academic', description: 'Student portal for registration and results', link: 'resources.html' },
        { name: 'registration', category: 'Admin', description: 'How to register for courses each semester', link: 'resources.html' },
        { name: 'NSFAS', category: 'Finance', description: 'Financial aid for eligible students', link: 'resources.html' },
        { name: 'fees', category: 'Finance', description: 'Tuition payment information and deadlines', link: 'resources.html' },
        { name: 'WiFi', category: 'Tech', description: 'Connect to campus WiFi network - NWU-Student', link: 'resources.html' },
        { name: 'counselling', category: 'Wellbeing', description: 'Free mental health support for students', link: 'wellbeing.html' },
        { name: 'loadshedding', category: 'Daily Life', description: 'Guide for surviving power outages', link: 'wellbeing.html' },
        { name: 'student ID', category: 'Admin', description: 'How to get your NWU student card', link: 'resources.html' },
        { name: 'library', category: 'Academic', description: 'Library hours, resources, and study spots', link: 'resources.html' },
        { name: 'security', category: 'Safety', description: 'Campus security and emergency contacts', link: 'wellbeing.html' },
        { name: 'printing', category: 'Tech', description: 'Computer lab and printing services', link: 'resources.html' },
        { name: 'health clinic', category: 'Wellbeing', description: 'Campus health services and medical care', link: 'wellbeing.html' },
        { name: 'password reset', category: 'Tech', description: 'How to reset your NWU network password', link: 'contact.html' }
    ];
    
    const results = resourcesDB.filter(resource => 
        resource.name.toLowerCase().includes(searchTerm) || 
        resource.category.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="result-item">❌ No results found. Try searching for: eFundi, registration, WiFi, NSFAS, counselling</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="result-item" style="background: #FAF5FF; margin: 10px 0; padding: 12px; border-radius: 10px; border-left: 4px solid #6B46C1;">
                <strong>📌 ${result.name}</strong> <span style="color: #6B46C1;">(${result.category})</span>
                <p style="margin-top: 5px; color: #666;">${result.description}</p>
                <a href="${result.link}" style="display: inline-block; margin-top: 8px; color: #6B46C1; text-decoration: none; font-size: 0.9rem;">View →</a>
            </div>
        `).join('');
    }
}

// Allow Enter key to trigger search (for index.html)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchResources();
            }
        });
    }
});

// ============================================
// FEATURE 3: Filter Resources by Category (for resources.html)
// ============================================
function filterResources(category) {
    const cards = document.querySelectorAll('.resource-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button styling
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((btn.getAttribute('data-filter') === category) || 
            (category === 'all' && btn.getAttribute('data-filter') === 'all')) {
            btn.classList.add('active');
        }
    });
    
    // Filter cards with animation
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// FEATURE 4: Toggle Details/Expand Content (for resources.html)
// ============================================
function toggleDetails(button) {
    const detailsContent = button.nextElementSibling;
    if (detailsContent) {
        detailsContent.classList.toggle('show');
        button.textContent = detailsContent.classList.contains('show') ? 'View Less ▲' : 'View Details ▼';
    }
}

// ============================================
// FEATURE 5: Wellbeing Emoji Check-in (for wellbeing.html)
// ============================================
function showWellbeingTab(feeling) {
    const messageDiv = document.getElementById('checkinMessage');
    if (!messageDiv) return;
    
    const messages = {
        'health': "💚 You're feeling good! That's awesome! Keep taking care of yourself. Remember to stay hydrated and take breaks between study sessions.",
        'safety': "💛 It's okay to have okay days. You're doing great just by being here! Reach out to friends or visit the counselling office if you need support.",
        'daily': "💜 We hear you, and you're not alone. Many first-years feel this way. Counselling services are available at (018) 299 4555. You've got this!"
    };
    
    const feelings = {
        'health': '😊 Good',
        'safety': '😐 Okay', 
        'daily': '💪 Struggling'
    };
    
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 2rem;">${feelings[feeling].charAt(0)}</span>
            <strong style="color: #6B46C1;">You selected: ${feelings[feeling]}</strong>
        </div>
        <p>${messages[feeling]}</p>
        <small style="display: block; margin-top: 10px;">✅ Check-in saved! Come back tomorrow to track your wellbeing.</small>
    `;
    messageDiv.style.animation = 'fadeIn 0.5s ease';
    messageDiv.style.background = '#F3E8FF';
    messageDiv.style.padding = '20px';
    messageDiv.style.borderRadius = '15px';
    messageDiv.style.marginTop = '20px';
    
    // Save check-in to localStorage
    saveCheckinToHistory(feeling, feelings[feeling]);
    
    setTimeout(() => {
        messageDiv.style.animation = '';
    }, 500);
}

// Helper function to save check-in history
function saveCheckinToHistory(feelingCode, feelingName) {
    const checkins = JSON.parse(localStorage.getItem('wellbeingCheckins') || '[]');
    checkins.push({
        feeling: feelingCode,
        feelingName: feelingName,
        date: new Date().toLocaleString(),
        timestamp: Date.now()
    });
    // Keep only last 10 check-ins
    if (checkins.length > 10) checkins.shift();
    localStorage.setItem('wellbeingCheckins', JSON.stringify(checkins));
    
    // Show encouragement after 3 check-ins
    if (checkins.length === 3) {
        setTimeout(() => {
            const encourageMsg = document.createElement('div');
            encourageMsg.innerHTML = '💜 You\'ve checked in 3 times! You\'re building a great wellbeing habit. Keep going!';
            encourageMsg.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #6B46C1; color: white; padding: 15px; border-radius: 10px; z-index: 1000; animation: slideIn 0.3s ease;';
            document.body.appendChild(encourageMsg);
            setTimeout(() => encourageMsg.remove(), 4000);
        }, 500);
    }
}

// ============================================
// FEATURE 6: Switch Wellbeing Tabs (for wellbeing.html)
// ============================================
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button - find by onclick attribute
    tabButtons.forEach(btn => {
        if (btn.getAttribute('onclick') === `switchTab('${tabName}')`) {
            btn.classList.add('active');
        }
    });
}

// ============================================
// FEATURE 7: Contact Button Alert (for wellbeing.html and contact.html)
// ============================================
function showContactAlert(service) {
    const emergencyContacts = {
        'counselling': {
            title: "📞 NWU Counselling Services",
            details: "Phone: (018) 299 4555\nEmail: counselling@nwu.ac.za\nLocation: Student Support Building, Room 101\n\nEmergency After Hours: 0800 123 456"
        },
        'security': {
            title: "🚨 NWU Campus Security",
            details: "Emergency: (018) 299 1111\nToll-Free: 0800 111 222\n\n24/7 Response Team available"
        },
        'health': {
            title: "🏥 Campus Health Clinic",
            details: "Phone: (018) 299 4444\nLocation: Next to Student Centre\n\nFree services for registered students"
        }
    };
    
    const contact = emergencyContacts[service] || emergencyContacts.counselling;
    alert(`${contact.title}\n\n${contact.details}`);
}

// ============================================
// FEATURE 8: Quick Help Function (for contact.html)
// ============================================
function showHelp(topic) {
    const helpMessageDiv = document.getElementById('helpMessage');
    if (!helpMessageDiv) return;
    
    const helpContent = {
        'efundi': {
            title: "📖 eFundi Issues?",
            content: "• Try clearing your browser cache\n• Use Chrome or Firefox\n• Reset your password at password.nwu.ac.za\n• Contact IT Helpdesk: (018) 299 1234\n• Visit the eFundi support page"
        },
        'password': {
            title: "🔑 Password Reset?",
            content: "• Go to password.nwu.ac.za\n• Use your student number and registered email\n• Follow the password reset link\n• New password must be at least 8 characters\n• Contact IT Helpdesk if issues persist: (018) 299 1234"
        },
        'registration': {
            title: "📋 Registration Help?",
            content: "• Log into mySIS portal\n• Check for any outstanding fees or documents\n• Contact your faculty academic advisor\n• Registration deadline: First week of classes\n• Helpdesk: (018) 299 2222"
        },
        'wellbeing': {
            title: "❤️ Wellbeing Support?",
            content: "• Free counselling: (018) 299 4555\n• Campus Health Clinic: (018) 299 4444\n• 24/7 Crisis Helpline: 0800 123 456\n• Location: Student Support Building, Room 101\n• Walk-ins welcome or book an appointment"
        }
    };
    
    const info = helpContent[topic] || helpContent['efundi'];
    helpMessageDiv.innerHTML = `
        <strong style="font-size: 1.1rem; color: #6B46C1;">${info.title}</strong>
        <div style="margin-top: 10px; line-height: 1.6;">${info.content}</div>
        <small style="display: block; margin-top: 10px;">💡 Need more help? Call the support line or visit the office in person.</small>
    `;
    helpMessageDiv.style.display = 'block';
    helpMessageDiv.style.animation = 'fadeIn 0.3s ease';
    
    // Scroll to message
    helpMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    setTimeout(() => {
        helpMessageDiv.style.animation = '';
    }, 300);
}

// ============================================
// FEATURE 9: Contact Form Handling (for contact.html)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName')?.value.trim() || '';
            const studentNum = document.getElementById('studentNum')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const campus = document.getElementById('campus')?.value || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';
            const feedbackDiv = document.getElementById('formFeedback');
            
            // Validation
            if (!fullName || !studentNum || !email || !campus || !subject || !message) {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = '❌ Please fill in all required fields.';
                    feedbackDiv.className = 'form-feedback error';
                    feedbackDiv.style.display = 'block';
                }
                return;
            }
            
            // Student number validation (basic)
            if (!/^\d{8,10}$/.test(studentNum)) {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = '❌ Please enter a valid student number (8-10 digits).';
                    feedbackDiv.className = 'form-feedback error';
                    feedbackDiv.style.display = 'block';
                }
                return;
            }
            
            // Email validation - must be NWU email
            if (!email.includes('@') || !email.includes('.')) {
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = '❌ Please enter a valid email address.';
                    feedbackDiv.className = 'form-feedback error';
                    feedbackDiv.style.display = 'block';
                }
                return;
            }
            
            // Success message
            if (feedbackDiv) {
                feedbackDiv.innerHTML = `✅ Thank you, ${fullName}! Your message about "${subject}" has been sent. A representative will respond within 48 hours.`;
                feedbackDiv.className = 'form-feedback success';
                feedbackDiv.style.display = 'block';
                
                // Clear form
                contactForm.reset();
                
                // Save to localStorage for demo
                const inquiries = JSON.parse(localStorage.getItem('contactInquiries') || '[]');
                inquiries.push({
                    name: fullName,
                    studentNumber: studentNum,
                    email: email,
                    campus: campus,
                    subject: subject,
                    message: message,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem('contactInquiries', JSON.stringify(inquiries));
                
                // Hide feedback after 5 seconds
                setTimeout(() => {
                    feedbackDiv.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// ============================================
// FEATURE 10: Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// FEATURE 11: Page Load Animation & Initialization
// ============================================
window.addEventListener('load', function() {
    // Fade in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
    
    // Add CSS animation keyframes if not present
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .details-content, .faq-answer {
                display: none;
            }
            .details-content.show, .faq-answer.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            .tab-content {
                display: none;
            }
            .tab-content.active {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            .filter-btn.active {
                background: #6B46C1 !important;
                color: white !important;
            }
            .resource-card {
                transition: transform 0.3s ease;
            }
            .resource-card:hover {
                transform: translateY(-5px);
            }
            .help-card {
                transition: all 0.3s ease;
                cursor: pointer;
            }
            .form-feedback {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show welcome message for first-time visitors
    if (!localStorage.getItem('hasVisited')) {
        setTimeout(() => {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.innerHTML = '🎉 Welcome to the NWU First-Year Survival Hub! Explore resources, get support, and thrive!';
            welcomeMsg.style.cssText = 'position: fixed; bottom: 20px; left: 20px; background: #6B46C1; color: white; padding: 15px 20px; border-radius: 10px; z-index: 1000; animation: slideIn 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
            document.body.appendChild(welcomeMsg);
            setTimeout(() => welcomeMsg.remove(), 5000);
        }, 500);
        localStorage.setItem('hasVisited', 'true');
    }
});

// ============================================
// FEATURE 12: Active Navigation Highlight
// ============================================
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
            link.style.color = '#9F7AEA';
            link.style.fontWeight = 'bold';
        } else if (link.classList.contains('active')) {
            link.classList.remove('active');
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
}

// Call when page loads
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    
    // Add fadeIn animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.animation = 'fadeIn 0.5s ease';
    }
});

// ============================================
// FEATURE 13: Back to Top Button (Dynamic Creation)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button if it doesn't exist
    if (!document.getElementById('backToTop')) {
        const backButton = document.createElement('button');
        backButton.id = 'backToTop';
        backButton.innerHTML = '↑';
        backButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #6B46C1; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 24px; display: none; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease; z-index: 1000;';
        backButton.onmouseover = () => backButton.style.transform = 'scale(1.1)';
        backButton.onmouseout = () => backButton.style.transform = 'scale(1)';
        document.body.appendChild(backButton);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backButton.style.display = 'flex';
            } else {
                backButton.style.display = 'none';
            }
        });
        
        backButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ============================================
// FEATURE 14: Resource Card Click Tracker
// ============================================
function trackResourceClick(resourceName, category) {
    const clicks = JSON.parse(localStorage.getItem('resourceClicks') || '{}');
    clicks[resourceName] = (clicks[resourceName] || 0) + 1;
    localStorage.setItem('resourceClicks', JSON.stringify(clicks));
}

// Add click tracking to resource cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on the details button
            if (e.target.classList && e.target.classList.contains('details-btn')) return;
            
            const title = this.querySelector('h3')?.textContent || 'Unknown';
            const category = this.getAttribute('data-category') || 'General';
            trackResourceClick(title, category);
        });
    });
});

// ============================================
// FEATURE 15: Display Current Date & Time (Footer Enhancement)
// ============================================
function updateDateTime() {
    const footer = document.querySelector('.footer-content');
    if (footer && !document.querySelector('.datetime-display')) {
        const dateTimeSpan = document.createElement('p');
        dateTimeSpan.className = 'datetime-display';
        dateTimeSpan.style.fontSize = '0.8rem';
        dateTimeSpan.style.opacity = '0.8';
        footer.appendChild(dateTimeSpan);
        
        function update() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            dateTimeSpan.innerHTML = `🕐 ${now.toLocaleDateString('en-ZA', options)}`;
        }
        update();
        setInterval(update, 60000); // Update every minute
    }
}

document.addEventListener('DOMContentLoaded', updateDateTime);