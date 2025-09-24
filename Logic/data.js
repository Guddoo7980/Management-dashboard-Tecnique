// Mock Employee Data - Simulating Freemarker data injection
const mockEmployees = [
    {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        department: 'Engineering',
        role: 'Senior Developer',
        joinDate: '2022-03-15',
        phone: '+1-555-0123',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@company.com',
        department: 'Design',
        role: 'UI/UX Designer',
        joinDate: '2021-11-08',
        phone: '+1-555-0124',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 3,
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@company.com',
        department: 'Marketing',
        role: 'Marketing Manager',
        joinDate: '2023-01-12',
        phone: '+1-555-0125',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 4,
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@company.com',
        department: 'Engineering',
        role: 'DevOps Engineer',
        joinDate: '2022-07-20',
        phone: '+1-555-0126',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 5,
        firstName: 'Jessica',
        lastName: 'Williams',
        email: 'jessica.williams@company.com',
        department: 'HR',
        role: 'HR Specialist',
        joinDate: '2021-09-05',
        phone: '+1-555-0127',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 6,
        firstName: 'James',
        lastName: 'Davis',
        email: 'james.davis@company.com',
        department: 'Sales',
        role: 'Sales Representative',
        joinDate: '2023-04-18',
        phone: '+1-555-0128',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 7,
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@company.com',
        department: 'Finance',
        role: 'Financial Analyst',
        joinDate: '2022-02-28',
        phone: '+1-555-0129',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 8,
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@company.com',
        department: 'Engineering',
        role: 'Frontend Developer',
        joinDate: '2023-06-10',
        phone: '+1-555-0130',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 9,
        firstName: 'Amanda',
        lastName: 'Taylor',
        email: 'amanda.taylor@company.com',
        department: 'Design',
        role: 'Graphic Designer',
        joinDate: '2021-12-03',
        phone: '+1-555-0131',
        avatar: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 10,
        firstName: 'Christopher',
        lastName: 'Brown',
        email: 'christopher.brown@company.com',
        department: 'Marketing',
        role: 'Content Strategist',
        joinDate: '2022-10-15',
        phone: '+1-555-0132',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 11,
        firstName: 'Nicole',
        lastName: 'Wilson',
        email: 'nicole.wilson@company.com',
        department: 'HR',
        role: 'HR Manager',
        joinDate: '2020-08-22',
        phone: '+1-555-0133',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 12,
        firstName: 'Ryan',
        lastName: 'Garcia',
        email: 'ryan.garcia@company.com',
        department: 'Sales',
        role: 'Sales Manager',
        joinDate: '2021-05-14',
        phone: '+1-555-0134',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 13,
        firstName: 'Stephanie',
        lastName: 'Martinez',
        email: 'stephanie.martinez@company.com',
        department: 'Finance',
        role: 'Finance Manager',
        joinDate: '2020-11-30',
        phone: '+1-555-0135',
        avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 14,
        firstName: 'Kevin',
        lastName: 'Lee',
        email: 'kevin.lee@company.com',
        department: 'Engineering',
        role: 'Backend Developer',
        joinDate: '2023-02-06',
        phone: '+1-555-0136',
        avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 15,
        firstName: 'Michelle',
        lastName: 'White',
        email: 'michelle.white@company.com',
        department: 'Design',
        role: 'Product Designer',
        joinDate: '2022-09-18',
        phone: '+1-555-0137',
        avatar: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
];

// Department and Role options for form dropdowns
const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Sales', 'Finance'];
const roles = [
    'Senior Developer', 'UI/UX Designer', 'Marketing Manager', 'DevOps Engineer',
    'HR Specialist', 'Sales Representative', 'Financial Analyst', 'Frontend Developer',
    'Graphic Designer', 'Content Strategist', 'HR Manager', 'Sales Manager',
    'Finance Manager', 'Backend Developer', 'Product Designer'
];

// Utility functions for data manipulation
const DataUtils = {
    // Format date for display
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Generate avatar URL if none provided
    generateAvatarUrl: function(firstName, lastName) {
        return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=3B82F6&color=fff&size=64`;
    },

    // Get unique values from array of objects
    getUniqueValues: function(array, key) {
        return [...new Set(array.map(item => item[key]))];
    },

    // Sort array by field
    sortBy: function(array, field, direction = 'asc') {
        return [...array].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return direction === 'asc' ? comparison : -comparison;
            }
            
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    },

    // Filter array by multiple criteria
    filterBy: function(array, filters) {
        return array.filter(item => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const searchFields = ['firstName', 'lastName', 'email', 'department', 'role'];
                const matchesSearch = searchFields.some(field => 
                    item[field].toLowerCase().includes(searchLower)
                );
                if (!matchesSearch) return false;
            }

            // Department filter
            if (filters.department && item.department !== filters.department) {
                return false;
            }

            // Role filter
            if (filters.role && item.role !== filters.role) {
                return false;
            }

            return true;
        });
    },

    // Paginate array
    paginate: function(array, page, itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return array.slice(startIndex, endIndex);
    },

    // Validate email format
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone format
    isValidPhone: function(phone) {
        if (!phone) return true; // Phone is optional
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        return phoneRegex.test(phone);
    },

    // Generate unique ID
    generateId: function() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockEmployees, departments, roles, DataUtils };
}