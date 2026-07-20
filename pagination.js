// pagination.js
(function() {
  const PAGE_SIZE = 99;

  // Make these available globally so your main script can use them
  window.paginationState = {
    showAll: false,
    PAGE_SIZE: PAGE_SIZE
  };

  // Enhanced render function (we'll call this from main script)
  window.enhancedRender = function(originalRender) {
    return function() {
      var filtered = applyFilters(); // uses your existing applyFilters()
      var displayList = window.paginationState.showAll ? filtered : filtered.slice(0, PAGE_SIZE);
      
      var rowsEl = document.getElementById('rows');
      rowsEl.innerHTML = '';
      document.getElementById('emptyState').style.display = filtered.length === 0 ? 'block' : 'none';

      var frag = document.createDocumentFragment();
      var obs = getObserver();
      displayList.forEach(function(j){
        var row = buildRow(j);
        frag.appendChild(row);
        obs.observe(row);
      });
      rowsEl.appendChild(frag);

      // Pagination UI
      var countNote = document.getElementById('countNote');
      var paginationEl = document.getElementById('pagination');
      
      if (filtered.length > PAGE_SIZE && !window.paginationState.showAll) {
        countNote.textContent = 'Showing ' + PAGE_SIZE + ' of ' + filtered.length + ' positions — shuffled';
        paginationEl.style.display = 'flex';
      } else {
        countNote.textContent = 'Showing all ' + filtered.length + 
          (filtered.length !== RAW.length ? (' (filtered from ' + RAW.length + ')') : '') + ' — shuffled';
        paginationEl.style.display = 'none';
      }
    };
  };

  // View All handler
  function initPagination() {
    const viewAllBtn = document.getElementById('viewAllBtn');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function(){
        window.paginationState.showAll = true;
        render(); // calls your main render (which we'll override)
      });
    }

    // Reset pagination when filters change
    const originalClear = document.getElementById('clearBtn').onclick;
    // We'll hook into existing listeners later
  }

  // Auto-init when loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
  } else {
    initPagination();
  }
})();
