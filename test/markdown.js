var markdown = require( "markdown" ).markdown;
console.log( markdown.toHTML( "```Hello``` *World*!\
dfadfad\
\n\
# dfadf\n\
\
=== dfadfaf ===\
```bash\
<dfadf>\
<dfadf>\
```\
  " ) );