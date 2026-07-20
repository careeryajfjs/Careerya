// company-logo.js
(function() {
  const originalBuildRow = buildRow;

  buildRow = function(j) {
    var row = originalBuildRow(j);

    var companyCell = row.querySelector('.cell-company');
    if (companyCell) {
      companyCell.style.display = 'flex';
      companyCell.style.alignItems = 'center';
      companyCell.style.gap = '10px';

      var logo = document.createElement('img');
      logo.style.width = '28px';
      logo.style.height = '28px';
      logo.style.borderRadius = '6px';
      logo.style.objectFit = 'contain';
      logo.style.flexShrink = '0';

      var companyName = (j.c || '').trim();
      logo.src = `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(companyName)}.com`;
      
      logo.onerror = function() {
        logo.src = `https://logo.clearbit.com/${encodeURIComponent(companyName)}.com?size=64`;
        logo.onerror = function() { logo.style.display = 'none'; };
      };

      companyCell.prepend(logo);
    }

    return row;
  };
})();
