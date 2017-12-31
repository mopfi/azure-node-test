const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const config = require('./config');
const dbConnection = new Connection(config);
const express = require('express')
const app = express()

dbConnection.on('connect', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('db ready..');
  }
});

app.get('/', (req, res) => {
    queryDatabase(res);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log('app listening on port 00! at http://localhost:%d', port))

function queryDatabase(res) {
    console.log('Reading rows from the Table...');
    let htmlData = '<html><body><h2>Catalog top 10 products</h2><ol>';

    // Read all rows from table
    request = new Request(
        "SELECT TOP 10 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            res.set('Content-Type', 'text/html');
            res.send(htmlData + '</ol></body></html>')
        }
    );

    request.on('row', function (columns) {
        htmlData += '<li>';
        columns.forEach(function (column) {
            htmlData += column.value + ' ';
            //console.log("%s\t%s", column.metadata.colName, column.value);
        });
        htmlData += '</li>';
    });
    dbConnection.execSql(request);
}
