// company-logo.js
function addCompanyLogoToRow(row, companyName) {
  // This function can be called from buildRow if needed
}

function enhanceBuildRow(originalBuildRow) {
  return function(j) {
    var row = originalBuildRow(j);

    // Find the company cell and add logo
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

      var name = (j.c || '').trim();
      logo.src = `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(name)}.com`;
      
      logo.onerror = function() {
        logo.src = `https://logo.clearbit.com/${encodeURIComponent(name)}.com?size=64`;
        logo.onerror = function() { logo.style.display = 'none'; };
      };

      companyCell.prepend(logo);
    }

    return row;
  };
}

// Auto apply when loaded
if (typeof buildRow !== 'undefined') {
  const originalBuildRow = buildRow;
  buildRow = enhanceBuildRow(originalBuildRow);
}
