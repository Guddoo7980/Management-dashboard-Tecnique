// Employee Directory Application - Vanilla JavaScript Implementation
class EmployeeDirectory {
    constructor() {
        // Initialize data with mockEmployees array
        this.employees = [...mockEmployees]; 
        this.filteredEmployees = [...this.employees]; 
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.currentSort = { field: 'firstName', direction: 'asc' };
        this.currentFilters = { search: '', department: '', role: '' };
        this.editingEmployee = null; // track employee being edited

        // Initialize the application
        this.init();
    }

    init() {
        this.bindEvents();        // Attach event listeners
        this.updateDisplay();     // Render employees grid
        this.updateStatistics();  // Update stats at top
    }

    bindEvents() {
        // Add Employee button
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.showEmployeeForm();
        });

        // Search input
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value;
            this.applyFiltersAndSort();
        });

        // Filter toggle
        document.getElementById('filter-toggle').addEventListener('click', () => {
            this.toggleFilterPanel();
        });

        // Clear filters
        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Filter selects
        document.getElementById('department-filter').addEventListener('change', (e) => {
            this.currentFilters.department = e.target.value;
            this.applyFiltersAndSort();
        });

        document.getElementById('role-filter').addEventListener('change', (e) => {
            this.currentFilters.role = e.target.value;
            this.applyFiltersAndSort();
        });

        // Sort buttons
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const field = e.currentTarget.dataset.field;
                this.updateSort(field);
            });
        });

        // Pagination
        document.getElementById('items-per-page').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.updateDisplay();
        });

        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateDisplay();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateDisplay();
            }
        });

        // Modal events
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideEmployeeForm();
        });

        document.getElementById('cancel-form').addEventListener('click', () => {
            this.hideEmployeeForm();
        });

        document.querySelector('.modal__backdrop').addEventListener('click', () => {
            this.hideEmployeeForm();
        });

        // Form submission
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Employee card actions (edit/delete)
        document.getElementById('employee-grid').addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]');
            if (!action) return;

            const employeeId = parseInt(action.dataset.id);
            const actionType = action.dataset.action;

            if (actionType === 'edit') {
                this.editEmployee(employeeId);
            } else if (actionType === 'delete') {
                this.deleteEmployee(employeeId);
            }
        });

        // Input validation events
        const formInputs = document.querySelectorAll('#employee-form input, #employee-form select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) this.validateField(input);
            });
        });

        // Keyboard navigation (ESC to close modal)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideEmployeeForm();
        });
    }

    applyFiltersAndSort() {
        this.filteredEmployees = DataUtils.filterBy(this.employees, this.currentFilters);
        this.filteredEmployees = DataUtils.sortBy(
            this.filteredEmployees, 
            this.currentSort.field, 
            this.currentSort.direction
        );
        this.currentPage = 1;
        this.updateDisplay();
        this.updateFilterUI();
    }

    updateSort(field) {
        if (this.currentSort.field === field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }
        this.applyFiltersAndSort();
        this.updateSortUI();
    }

    updateSortUI() {
        document.querySelectorAll('.sort-btn').forEach(btn => {
            const field = btn.dataset.field;
            btn.classList.toggle('active', field === this.currentSort.field);
            btn.classList.toggle('desc', field === this.currentSort.field && this.currentSort.direction === 'desc');
        });
    }

    updateFilterUI() {
        const hasActiveFilters = this.currentFilters.department || this.currentFilters.role;
        const filterCount = (this.currentFilters.department ? 1 : 0) + (this.currentFilters.role ? 1 : 0);
        const filterToggle = document.getElementById('filter-toggle');
        const filterCountEl = document.getElementById('filter-count');
        const clearFiltersBtn = document.getElementById('clear-filters');

        if (hasActiveFilters) {
            filterToggle.classList.add('active');
            filterCountEl.textContent = filterCount;
            filterCountEl.classList.remove('hidden');
            clearFiltersBtn.classList.remove('hidden');
        } else {
            filterToggle.classList.remove('active');
            filterCountEl.classList.add('hidden');
            clearFiltersBtn.classList.add('hidden');
        }
    }

    toggleFilterPanel() {
        const panel = document.getElementById('filter-panel');
        const toggle = document.getElementById('filter-toggle');
        panel.classList.toggle('hidden');
        toggle.classList.toggle('active');
    }

    clearFilters() {
        this.currentFilters = { search: '', department: '', role: '' };
        document.getElementById('search-input').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('role-filter').value = '';
        this.applyFiltersAndSort();
        document.getElementById('filter-panel').classList.add('hidden');
    }

    updateDisplay() {
        this.renderEmployeeGrid();
        this.updatePagination();
        this.updateStatistics();
    }

    renderEmployeeGrid() {
        const grid = document.getElementById('employee-grid');
        const emptyState = document.getElementById('empty-state');
        const paginatedEmployees = DataUtils.paginate(this.filteredEmployees, this.currentPage, this.itemsPerPage);

        if (paginatedEmployees.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        grid.innerHTML = paginatedEmployees.map(employee => this.renderEmployeeCard(employee)).join('');
    }

    renderEmployeeCard(employee) {
        const departmentClass = employee.department.toLowerCase().replace(/\s+/g, '-');
        const avatarUrl = employee.avatar || DataUtils.generateAvatarUrl(employee.firstName, employee.lastName);
        const formattedDate = DataUtils.formatDate(employee.joinDate);

        return `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="employee-card__content">
                    <div class="employee-card__header">
                        <div class="employee-card__info">
                            <img src="${avatarUrl}" alt="${employee.firstName} ${employee.lastName}" class="employee-card__avatar" onerror="this.src='${DataUtils.generateAvatarUrl(employee.firstName, employee.lastName)}'">
                            <div class="employee-card__details">
                                <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                                <p class="employee-card__role">${employee.role}</p>
                                <span class="employee-card__department department-badge department-badge--${departmentClass}">${employee.department}</span>
                            </div>
                        </div>
                        <div class="employee-card__actions">
                            <button class="action-btn action-btn--edit" data-action="edit" data-id="${employee.id}" title="Edit Employee">Edit</button>
                            <button class="action-btn action-btn--delete" data-action="delete" data-id="${employee.id}" title="Delete Employee">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updatePagination() {
        const totalItems = this.filteredEmployees.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

        document.getElementById('pagination-info').textContent = 
            `Showing ${startItem}-${endItem} of ${totalItems} employees`;
        document.getElementById('prev-page').disabled = this.currentPage === 1;
        document.getElementById('next-page').disabled = this.currentPage === totalPages || totalPages === 0;

        this.renderPageNumbers(totalPages);
        document.getElementById('pagination').style.display = totalItems > 0 ? 'block' : 'none';
    }

    renderPageNumbers(totalPages) {
        const pageNumbers = document.getElementById('page-numbers');
        const maxVisiblePages = 5;
        let pages = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            if (startPage > 1) { pages.push(1); if (startPage > 2) pages.push('...'); }
            for (let i = startPage; i <= endPage; i++) pages.push(i);
            if (endPage < totalPages) { if (endPage < totalPages - 1) pages.push('...'); pages.push(totalPages); }
        }

        pageNumbers.innerHTML = pages.map(page => page === '...' ? 
            '<span class="pagination__ellipsis">...</span>' : 
            `<button class="pagination__page ${page === this.currentPage ? 'active' : ''}" onclick="employeeDirectory.goToPage(${page})">${page}</button>`
        ).join('');
    }

    goToPage(page) {
        this.currentPage = page;
        this.updateDisplay();
    }

    updateStatistics() {
        document.getElementById('total-employees').textContent = this.employees.length;
        document.getElementById('total-departments').textContent = DataUtils.getUniqueValues(this.employees, 'department').length;
        document.getElementById('showing-count').textContent = this.filteredEmployees.length;
    }

    showEmployeeForm(employee = null) {
        this.editingEmployee = employee;
        const modal = document.getElementById('employee-modal');
        const form = document.getElementById('employee-form');
        const title = document.getElementById('modal-title');
        const submitText = document.getElementById('submit-text');

        form.reset();
        this.clearFormErrors();

        if (employee) {
            title.textContent = 'Edit Employee';
            submitText.textContent = 'Update Employee';
            this.populateForm(employee);
        } else {
            title.textContent = 'Add New Employee';
            submitText.textContent = 'Add Employee';
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => document.getElementById('firstName').focus(), 100);
    }

    hideEmployeeForm() {
        document.getElementById('employee-modal').classList.add('hidden');
        document.body.style.overflow = '';
        this.editingEmployee = null;
        this.clearFormErrors();
    }

    populateForm(employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone || '';
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
    }

    handleFormSubmit() {
        const formData = this.getFormData();
        if (!this.validateForm(formData)) return;

        if (this.editingEmployee) {
            this.updateEmployee(this.editingEmployee.id, formData);
            this.showNotification('Employee updated successfully!', 'success');
        } else {
            this.addEmployee(formData);
            this.showNotification('Employee added successfully!', 'success');
        }

        this.hideEmployeeForm();
        this.applyFiltersAndSort();
    }

    getFormData() {
        return {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };
    }

    // --- ADD/UPDATE/DELETE OPERATIONS ---
    addEmployee(employeeData) {
        // Generate unique ID for new employee
        const newEmployee = {
            ...employeeData,
            id: this.generateUniqueId(),
            joinDate: new Date().toISOString().split('T')[0],
            avatar: DataUtils.generateAvatarUrl(employeeData.firstName, employeeData.lastName)
        };
        this.employees.push(newEmployee); // add to main list
    }

    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) this.employees[index] = { ...this.employees[index], ...employeeData };
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) this.showEmployeeForm(employee);
    }

    deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) return;
        if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            // Filter out employee from array
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.applyFiltersAndSort();
            this.showNotification('Employee deleted successfully!', 'success');
        }
    }

    generateUniqueId() {
        // Ensure unique ID by checking current IDs
        let maxId = this.employees.reduce((max, emp) => emp.id > max ? emp.id : max, 0);
        return maxId + 1;
    }

    // --- FORM VALIDATION ---
    validateForm(formData) {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'department', 'role'];
        requiredFields.forEach(field => {
            if (!formData[field]) { this.showFieldError(field, 'This field is required'); isValid = false; }
            else this.clearFieldError(field);
        });

        if (formData.firstName && formData.firstName.length < 2) { this.showFieldError('firstName', 'Must be at least 2 characters'); isValid = false; }
        if (formData.lastName && formData.lastName.length < 2) { this.showFieldError('lastName', 'Must be at least 2 characters'); isValid = false; }
        if (formData.email && !DataUtils.isValidEmail(formData.email)) { this.showFieldError('email', 'Invalid email'); isValid = false; }

        const existingEmployee = this.employees.find(emp => emp.email === formData.email && (!this.editingEmployee || emp.id !== this.editingEmployee.id));
        if (existingEmployee) { this.showFieldError('email', 'Email already exists'); isValid = false; }

        if (formData.phone && !DataUtils.isValidPhone(formData.phone)) { this.showFieldError('phone', 'Invalid phone'); isValid = false; }

        return isValid;
    }

    validateField(input) { /* same as your previous logic */ }

    showFieldError(fieldName, message) { /* same as your previous logic */ }
    clearFieldError(fieldName) { /* same as your previous logic */ }
    clearFormErrors() { /* same as your previous logic */ }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `<div class="notification__content">${message}</div>`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.employeeDirectory = new EmployeeDirectory();
});
