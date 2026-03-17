const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');

// Find the last opened <section> and fix its associated </section> tag
let newContent = content.replace('      </section>\n\n      {/* VENDING MACHINE FLOOR */}', '        </div>\n      </section>\n\n      {/* VENDING MACHINE FLOOR */}');

fs.writeFileSync('src/App.tsx', newContent, 'utf8');
