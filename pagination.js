// pagination.js
(function() {
  const PAGE_SIZE = 99;

  // Make pagination state available globally
  window.paginationState = {
    visibleCount: PAGE_SIZE,
    PAGE_SIZE: PAGE_SIZE
  };

  // Enhanced render function
  window.enhancedRender = function(originalRender) {
    return function() {

      var filtered = applyFilters();

      // Show only the current number of visible jobs
      var displayList = filtered.slice(
        0,
        window.paginationState.visibleCount
      );

      var rowsEl = document.getElementById('rows');
      rowsEl.innerHTML = '';

      document.getElementById('emptyState').style.display =
        filtered.length === 0 ? 'block' : 'none';

      if (filtered.length === 0) {
        document.getElementById('countNote').textContent =
          'No positions match those filters';

        document.getElementById('pagination').style.display = 'none';
        return;
      }

      var frag = document.createDocumentFragment();
      var obs = getObserver();

      displayList.forEach(function(j) {
        var row = buildRow(j);
        frag.appendChild(row);
        obs.observe(row);
      });

      rowsEl.appendChild(frag);

      // Update count
      var countNote = document.getElementById('countNote');
      var paginationEl = document.getElementById('pagination');

      var showingCount = Math.min(
        window.paginationState.visibleCount,
        filtered.length
      );

      countNote.textContent =
        'Showing ' + showingCount + ' of ' + filtered.length + ' positions';

      // Show View More button if more jobs are available
      if (showingCount < filtered.length) {
        paginationEl.style.display = 'flex';
      } else {
        paginationEl.style.display = 'none';
      }
    };
  };

  // View More handler
  function initPagination() {

    var viewAllBtn = document.getElementById('viewAllBtn');

    if (viewAllBtn) {

      // Change button text
      viewAllBtn.textContent = 'View More';

      viewAllBtn.addEventListener('click', function() {

        // Add another 99 jobs
        window.paginationState.visibleCount +=
          window.paginationState.PAGE_SIZE;

        // Re-render jobs
        render();

        // Scroll slightly to where new jobs appear
        setTimeout(function() {
          window.scrollTo({
            top: document.getElementById('pagination').offsetTop - 200,
            behavior: 'smooth'
          });
        }, 100);

      });
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initPagination
    );
  } else {
    initPagination();
  }

})();
