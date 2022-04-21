const express = require('express')
const app = express()
const port = 3000

const ansitohtml = new (require('./ansitohtml'))();

const fs = require('fs');

app.use(express.json());

app.get('/convert/:id', function(req,res)
{
    if( !req.params.id ) {
        res.send(`<html>Error: missing ansi id</html>`)
    }
    
    let file = `test/resources/${req.params.id}`;
    fs.readFile( file , {}, (err, data) => {

        if( err ) {
            return res.send(`<html>Error: ${err.message}</html>`)
        }
        var text = ansitohtml.toHtml( data.toString() );
        res.send( `<html>
            ${text}
        </html>`
        );
    });

})

app.post('/json', function(req,res)
{
    console.log(req.body.markdown);
    var text = marqdown.render( req.body.markdown );
    res.send( {preview: text} );
})

app.listen(port, () => console.log(`Microservice listening on http://localhost:${port}/preview`))