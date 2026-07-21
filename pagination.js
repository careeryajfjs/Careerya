// pagination.js
(function() {
  const PAGE_SIZE = 99;

  window.paginationState = {
    visibleCount: PAGE_SIZE,
    PAGE_SIZE: PAGE_SIZE
  };

  // This function will be called by the main HTML render()
  window.renderWithPagination = function() {

    var filtered = applyFilters();

    // Show only the number of jobs currently allowed
    var displayList = filtered.slice(
      0,
      window.paginationState.visibleCount
    );

    var rowsEl = document.getElementById('rows');
    var emptyState = document.getElementById('emptyState');
    var countNote = document.getElementById('countNote');
    var paginationEl = document.getElementById('pagination');

    rowsEl.innerHTML = '';

    // No results
    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      countNote.textContent = 'No positions match those filters';
      paginationEl.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';

    // Create job rows
    var frag = document.createDocumentFragment();
    var obs = getObserver();

    displayList.forEach(function(j) {
      var row = buildRow(j);
      frag.appendChild(row);
      obs.observe(row);
    });

    rowsEl.appendChild(frag);

    // Update count
    var showingCount = Math.min(
      window.paginationState.visibleCount,
      filtered.length
    );

    countNote.textContent =
      'Showing ' + showingCount +
      ' of ' + filtered.length + ' positions';

    // Show View More only when more jobs exist
    if (showingCount < filtered.length) {
      paginationEl.style.display = 'flex';
    } else {
      paginationEl.style.display = 'none';
    }
  };

  // Initialize View More button
  function initPagination() {

    var viewAllBtn = document.getElementById('viewAllBtn');

    if (!viewAllBtn) return;

    viewAllBtn.textContent = 'View More';

    viewAllBtn.addEventListener('click', function() {

      // Add another 99 jobs
      window.paginationState.visibleCount +=
        window.paginationState.PAGE_SIZE;

      // Render again
      render();

      // Scroll to pagination area
      setTimeout(function() {
        var paginationEl =
          document.getElementById('pagination');

        if (paginationEl) {
          window.scrollTo({
            top: paginationEl.offsetTop - 200,
            behavior: 'smooth'
          });
        }
      }, 100);

    });
  }

  // Auto initialize
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initPagination
    );
  } else {
    initPagination();
  }

})();
