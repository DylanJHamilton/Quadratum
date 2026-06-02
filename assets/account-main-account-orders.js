class QtmAccountOrders {
  constructor(root) {
    this.root = root;
    this.searchInput = root.querySelector('[data-qtm-account-orders-search]');
    this.sortSelect = root.querySelector('[data-qtm-account-orders-sort]');
    this.filterButtons = Array.from(root.querySelectorAll('[data-qtm-account-orders-filter]'));
    this.countNode = root.querySelector('[data-qtm-account-orders-count]');
    this.noMatchesNode = root.querySelector('[data-qtm-account-orders-no-matches]');
    this.tableBody = root.querySelector('[data-qtm-account-orders-table-body]');
    this.cardList = root.querySelector('[data-qtm-account-orders-card-list]');

    this.tableItems = Array.from(this.tableBody ? this.tableBody.querySelectorAll('[data-qtm-account-orders-item]') : []);
    this.cardItems = Array.from(this.cardList ? this.cardList.querySelectorAll('[data-qtm-account-orders-item]') : []);

    this.activeFilter = 'all';
    this.searchTerm = '';
    this.sortValue = this.sortSelect ? this.sortSelect.value : 'newest';

    this.bindEvents();
    this.applyState();
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        this.searchTerm = this.searchInput.value.trim().toLowerCase();
        this.applyState();
      });
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () => {
        this.sortValue = this.sortSelect.value;
        this.applyState();
      });
    }

    this.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.activeFilter = button.dataset.qtmAccountOrdersFilter || 'all';

        this.filterButtons.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle('is-active', isActive);
          filterButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        this.applyState();
      });
    });
  }

  applyState() {
    this.sortItems(this.tableItems, this.tableBody);
    this.sortItems(this.cardItems, this.cardList);

    const visibleTableCount = this.updateVisibility(this.tableItems);
    const visibleCardCount = this.updateVisibility(this.cardItems);

    const totalCount = Math.max(visibleTableCount, visibleCardCount);
    const renderedCount = Math.max(this.tableItems.length, this.cardItems.length);

    if (this.countNode) {
      this.countNode.textContent = `${totalCount} of ${renderedCount} orders shown`;
    }

    if (this.noMatchesNode) {
      this.noMatchesNode.hidden = totalCount !== 0;
    }
  }

  sortItems(items, container) {
    if (!container || !items.length) return;

    const sortedItems = [...items].sort((a, b) => {
      const aDate = Number(a.dataset.orderDate || 0);
      const bDate = Number(b.dataset.orderDate || 0);
      const aTotal = Number(a.dataset.orderTotal || 0);
      const bTotal = Number(b.dataset.orderTotal || 0);

      switch (this.sortValue) {
        case 'oldest':
          return aDate - bDate;
        case 'highest':
          return bTotal - aTotal;
        case 'lowest':
          return aTotal - bTotal;
        case 'newest':
        default:
          return bDate - aDate;
      }
    });

    sortedItems.forEach((item) => container.appendChild(item));
  }

  updateVisibility(items) {
    let visibleCount = 0;

    items.forEach((item) => {
      const statusText = item.dataset.orderStatus || '';
      const searchText = item.dataset.orderSearch || '';

      const matchesStatus = this.activeFilter === 'all' || statusText.includes(this.activeFilter);
      const matchesSearch = this.searchTerm === '' || searchText.includes(this.searchTerm);
      const isVisible = matchesStatus && matchesSearch;

      item.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    return visibleCount;
  }
}

function initQtmAccountOrders() {
  document.querySelectorAll('[data-qtm-account-orders]').forEach((root) => {
    if (root.dataset.qtmAccountOrdersInitialized === 'true') return;

    root.dataset.qtmAccountOrdersInitialized = 'true';
    new QtmAccountOrders(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQtmAccountOrders);
} else {
  initQtmAccountOrders();
}

document.addEventListener('shopify:section:load', initQtmAccountOrders);